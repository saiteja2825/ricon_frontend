import { pgTable, text, serial, integer, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const placementsTable = pgTable("placements", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  college: text("college").notNull(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  packageLpa: real("package_lpa").notNull(),
  year: integer("year").notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPlacementSchema = createInsertSchema(placementsTable).omit({ id: true, createdAt: true });
export type InsertPlacement = z.infer<typeof insertPlacementSchema>;
export type Placement = typeof placementsTable.$inferSelect;
