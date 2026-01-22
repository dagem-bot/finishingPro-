import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

async function seedDatabase() {
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    await storage.createService({
      name: "Gypsum Work",
      slug: "gypsum",
      description: "Professional gypsum board installation, cornices, and ceiling designs.",
      rate: 1200,
      unit: "m2",
      imageUrl: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=80"
    });
    await storage.createService({
      name: "Painting",
      slug: "painting",
      description: "Interior and exterior painting with high-quality finishes.",
      rate: 400,
      unit: "m2",
      imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80"
    });
    await storage.createService({
      name: "Decoration",
      slug: "decoration",
      description: "Custom interior decoration, wall features, and artistic finishes.",
      rate: null, // Price on request
      unit: null,
      imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80"
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed the database with initial rates
  await seedDatabase();

  app.get(api.services.list.path, async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get(api.services.get.path, async (req, res) => {
    const service = await storage.getServiceBySlug(req.params.slug);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  });

  app.patch("/api/services/:id/rate", async (req, res) => {
    const id = parseInt(req.params.id);
    const { rate } = req.body;
    if (isNaN(id) || (rate !== null && typeof rate !== "number")) {
      return res.status(400).json({ message: "Invalid ID or rate" });
    }
    try {
      const updated = await storage.updateServiceRate(id, rate);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update rate" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const booking = await storage.createBooking(req.body);
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  return httpServer;
}
