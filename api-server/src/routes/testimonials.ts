import { Router, type IRouter } from "express";
import { db, testimonialsTable } from "@workspace/db";
import { CreateTestimonialBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/testimonials", async (_req, res): Promise<void> => {
  const testimonials = await db.select().from(testimonialsTable).orderBy(testimonialsTable.createdAt);
  res.json(testimonials);
});

router.post("/testimonials", async (req, res): Promise<void> => {
  const parsed = CreateTestimonialBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [testimonial] = await db.insert(testimonialsTable).values(parsed.data).returning();
  res.status(201).json(testimonial);
});

export default router;
