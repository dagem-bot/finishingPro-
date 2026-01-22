import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  rate: integer("rate"), // Price in Birr
  unit: text("unit"), // e.g., 'm2'
  imageUrl: text("image_url").notNull(),
});

export const insertServiceSchema = createInsertSchema(services).omit({ id: true });

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  location: text("location").notNull(),
  serviceType: text("service_type").notNull(),
  phone: text("phone").notNull(),
  comments: text("comments"),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true });

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
