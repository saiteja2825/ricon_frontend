import { Router, type IRouter } from "express";
import healthRouter from "./health";
import statsRouter from "./stats";
import studentsRouter from "./students";
import coursesRouter from "./courses";
import internshipsRouter from "./internships";
import applicationsRouter from "./applications";
import testimonialsRouter from "./testimonials";
import placementsRouter from "./placements";
import roadmapsRouter from "./roadmaps";
import chatRouter from "./chat";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(statsRouter);
router.use(studentsRouter);
router.use(coursesRouter);
router.use(internshipsRouter);
router.use(applicationsRouter);
router.use(testimonialsRouter);
router.use(placementsRouter);
router.use(roadmapsRouter);
router.use(chatRouter);
router.use(adminRouter);

export default router;
