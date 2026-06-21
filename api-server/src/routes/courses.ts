import { Router, type IRouter } from "express";
import { eq, sql, count } from "drizzle-orm";
import { db, coursesTable } from "@workspace/db";
import {
  CreateCourseBody,
  GetCourseParams,
  UpdateCourseParams,
  UpdateCourseBody,
  ListCoursesQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/courses/summary", async (_req, res): Promise<void> => {
  const [total] = await db.select({ count: count() }).from(coursesTable);
  const [ongoing] = await db.select({ count: count() }).from(coursesTable).where(sql`status = 'ongoing'`);
  const [upcoming] = await db.select({ count: count() }).from(coursesTable).where(sql`status = 'upcoming'`);

  const byCategory = await db
    .select({
      category: coursesTable.category,
      count: count(),
      totalEnrollments: sql<number>`sum(enrollment_count)`,
    })
    .from(coursesTable)
    .groupBy(coursesTable.category);

  res.json({
    totalCourses: total?.count ?? 0,
    ongoingCount: ongoing?.count ?? 0,
    upcomingCount: upcoming?.count ?? 0,
    byCategory: byCategory.map(r => ({
      category: r.category,
      count: r.count,
      totalEnrollments: Number(r.totalEnrollments) || 0,
    })),
  });
});

router.get("/courses", async (req, res): Promise<void> => {
  const query = ListCoursesQueryParams.safeParse(req.query);
  const { status, category } = query.success ? query.data : {};

  let q = db.select().from(coursesTable).$dynamic();
  if (status && status !== "all") {
    q = q.where(eq(coursesTable.status, status));
  }
  if (category) {
    q = q.where(eq(coursesTable.category, category));
  }
  const courses = await q.orderBy(coursesTable.createdAt);
  res.json(courses);
});

router.post("/courses", async (req, res): Promise<void> => {
  const parsed = CreateCourseBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [course] = await db.insert(coursesTable).values(parsed.data).returning();
  res.status(201).json(course);
});

router.get("/courses/:id", async (req, res): Promise<void> => {
  const params = GetCourseParams.safeParse({ id: Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, params.data.id));
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }
  res.json(course);
});

router.patch("/courses/:id", async (req, res): Promise<void> => {
  const params = UpdateCourseParams.safeParse({ id: Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateCourseBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [course] = await db.update(coursesTable).set(parsed.data).where(eq(coursesTable.id, params.data.id)).returning();
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }
  res.json(course);
});

export default router;
