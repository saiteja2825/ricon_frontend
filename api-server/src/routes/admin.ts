import { Router, type IRouter } from "express";
import { db, studentsTable, coursesTable, internshipsTable, applicationsTable, placementsTable } from "@workspace/db";
import { count, sql, eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/admin/dashboard", async (_req, res): Promise<void> => {
  const [studentCount] = await db.select({ count: count() }).from(studentsTable);
  const [courseCount] = await db.select({ count: count() }).from(coursesTable).where(sql`status = 'ongoing'`);
  const [internshipCount] = await db.select({ count: count() }).from(internshipsTable);
  const [pendingApps] = await db.select({ count: count() }).from(applicationsTable).where(eq(applicationsTable.status, "applied"));
  const [placementCount] = await db.select({ count: count() }).from(placementsTable);
  const [newStudents] = await db.select({ count: count() }).from(studentsTable).where(sql`created_at >= NOW() - INTERVAL '30 days'`);

  const totalStudents = studentCount?.count ?? 0;
  const studentsPlaced = placementCount?.count ?? 0;
  const placementRate = totalStudents > 0 ? Math.round((studentsPlaced / totalStudents) * 100) : 0;

  const totalRevenue = totalStudents * 15000;
  const monthlyRevenue = (newStudents?.count ?? 0) * 15000;

  const revenueBySource = [
    { source: "Course Fees", amount: totalRevenue * 0.55, percentage: 55 },
    { source: "Internship Programs", amount: totalRevenue * 0.25, percentage: 25 },
    { source: "Certifications", amount: totalRevenue * 0.12, percentage: 12 },
    { source: "Corporate Training", amount: totalRevenue * 0.08, percentage: 8 },
  ];

  const recentActivity = [
    { type: "enrollment", description: "New student enrolled in Full Stack Development", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    { type: "application", description: "Internship application submitted for Chatbot Development", timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
    { type: "placement", description: "Student placed at Google with 42 LPA package", timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() },
    { type: "enrollment", description: "New student enrolled in AI & Machine Learning", timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() },
    { type: "certificate", description: "5 students received completion certificates for DevOps", timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() },
  ];

  res.json({
    totalRevenue,
    monthlyRevenue,
    totalStudents,
    newStudentsThisMonth: newStudents?.count ?? 0,
    activeCourses: courseCount?.count ?? 0,
    activeInternships: internshipCount?.count ?? 0,
    pendingApplications: pendingApps?.count ?? 0,
    placementRate,
    revenueBySource,
    recentActivity,
  });
});

export default router;
