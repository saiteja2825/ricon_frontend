import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, roadmapsTable } from "@workspace/db";
import { GetRoadmapParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/roadmaps", async (_req, res): Promise<void> => {
  const roadmaps = await db.select().from(roadmapsTable).orderBy(roadmapsTable.id);
  res.json(roadmaps);
});

router.get("/roadmaps/:id", async (req, res): Promise<void> => {
  const params = GetRoadmapParams.safeParse({ id: Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [roadmap] = await db.select().from(roadmapsTable).where(eq(roadmapsTable.id, params.data.id));
  if (!roadmap) {
    res.status(404).json({ error: "Roadmap not found" });
    return;
  }
  res.json(roadmap);
});

export default router;
