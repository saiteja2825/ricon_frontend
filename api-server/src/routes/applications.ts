import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, applicationsTable, studentsTable, internshipsTable } from "@workspace/db";
import {
  CreateApplicationBody,
  GetApplicationParams,
  UpdateApplicationParams,
  UpdateApplicationBody,
  ListApplicationsQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/applications", async (req, res): Promise<void> => {
  const query = ListApplicationsQueryParams.safeParse(req.query);
  const { studentId, internshipId, status } = query.success ? query.data : {};

  const conditions = [];
  if (studentId) conditions.push(eq(applicationsTable.studentId, studentId));
  if (internshipId) conditions.push(eq(applicationsTable.internshipId, internshipId));
  if (status) conditions.push(eq(applicationsTable.status, status));

  const apps = await db
    .select({
      id: applicationsTable.id,
      studentId: applicationsTable.studentId,
      internshipId: applicationsTable.internshipId,
      status: applicationsTable.status,
      notes: applicationsTable.notes,
      appliedAt: applicationsTable.appliedAt,
      studentName: studentsTable.fullName,
      internshipTitle: internshipsTable.title,
    })
    .from(applicationsTable)
    .leftJoin(studentsTable, eq(applicationsTable.studentId, studentsTable.id))
    .leftJoin(internshipsTable, eq(applicationsTable.internshipId, internshipsTable.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(applicationsTable.appliedAt);

  res.json(apps);
});

router.post("/applications", async (req, res): Promise<void> => {
  const parsed = CreateApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [app] = await db.insert(applicationsTable).values(parsed.data).returning();
  res.status(201).json({ ...app, studentName: null, internshipTitle: null });
});

router.get("/applications/:id", async (req, res): Promise<void> => {
  const params = GetApplicationParams.safeParse({ id: Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [app] = await db
    .select({
      id: applicationsTable.id,
      studentId: applicationsTable.studentId,
      internshipId: applicationsTable.internshipId,
      status: applicationsTable.status,
      notes: applicationsTable.notes,
      appliedAt: applicationsTable.appliedAt,
      studentName: studentsTable.fullName,
      internshipTitle: internshipsTable.title,
    })
    .from(applicationsTable)
    .leftJoin(studentsTable, eq(applicationsTable.studentId, studentsTable.id))
    .leftJoin(internshipsTable, eq(applicationsTable.internshipId, internshipsTable.id))
    .where(eq(applicationsTable.id, params.data.id));

  if (!app) {
    res.status(404).json({ error: "Application not found" });
    return;
  }
  res.json(app);
});

router.patch("/applications/:id", async (req, res): Promise<void> => {
  const params = UpdateApplicationParams.safeParse({ id: Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [app] = await db
    .update(applicationsTable)
    .set(parsed.data)
    .where(eq(applicationsTable.id, params.data.id))
    .returning();
  if (!app) {
    res.status(404).json({ error: "Application not found" });
    return;
  }
  res.json({ ...app, studentName: null, internshipTitle: null });
});

export default router;
