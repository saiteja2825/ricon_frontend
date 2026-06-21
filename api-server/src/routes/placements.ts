import { Router, type IRouter } from "express";
import { db, placementsTable } from "@workspace/db";
import { CreatePlacementBody } from "@workspace/api-zod";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/placements/summary", async (_req, res): Promise<void> => {
  const [stats] = await db
    .select({
      highestPackageLpa: sql<number>`max(package_lpa)`,
      averagePackageLpa: sql<number>`avg(package_lpa)`,
      studentsPlaced: sql<number>`count(*)`,
    })
    .from(placementsTable);

  const companies = await db
    .select({ company: placementsTable.company })
    .from(placementsTable)
    .groupBy(placementsTable.company)
    .limit(10);

  res.json({
    highestPackageLpa: Number(stats?.highestPackageLpa) || 0,
    averagePackageLpa: Number(Number(stats?.averagePackageLpa).toFixed(2)) || 0,
    studentsPlaced: Number(stats?.studentsPlaced) || 0,
    topCompanies: companies.map(c => c.company),
  });
});

router.get("/placements", async (_req, res): Promise<void> => {
  const placements = await db.select().from(placementsTable).orderBy(placementsTable.createdAt);
  res.json(placements);
});

router.post("/placements", async (req, res): Promise<void> => {
  const parsed = CreatePlacementBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [placement] = await db.insert(placementsTable).values(parsed.data).returning();
  res.status(201).json(placement);
});

export default router;
