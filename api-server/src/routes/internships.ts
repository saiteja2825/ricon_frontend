import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, internshipsTable } from "@workspace/db";
import {
  CreateInternshipBody,
  GetInternshipParams,
  ListInternshipsQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/internships", async (req, res): Promise<void> => {
  const query = ListInternshipsQueryParams.safeParse(req.query);
  const { category } = query.success ? query.data : {};

  let q = db.select().from(internshipsTable).$dynamic();
  if (category) {
    q = q.where(eq(internshipsTable.category, category));
  }
  const internships = await q.orderBy(internshipsTable.createdAt);
  res.json(internships);
});

router.post("/internships", async (req, res): Promise<void> => {
  const parsed = CreateInternshipBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [internship] = await db.insert(internshipsTable).values(parsed.data).returning();
  res.status(201).json(internship);
});

router.get("/internships/:id", async (req, res): Promise<void> => {
  const params = GetInternshipParams.safeParse({ id: Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [internship] = await db.select().from(internshipsTable).where(eq(internshipsTable.id, params.data.id));
  if (!internship) {
    res.status(404).json({ error: "Internship not found" });
    return;
  }
  res.json(internship);
});

export default router;
