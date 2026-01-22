import { db } from "./db";
import { services, bookings, type InsertService, type Service, type InsertBooking, type Booking } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateServiceRate(id: number, rate: number | null): Promise<Service>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
}

export class DatabaseStorage implements IStorage {
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.slug, slug));
    return service;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }

  async updateServiceRate(id: number, rate: number | null): Promise<Service> {
    const [service] = await db
      .update(services)
      .set({ rate })
      .where(eq(services.id, id))
      .returning();
    return service;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }
}

export const storage = new DatabaseStorage();
