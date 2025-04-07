import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const connectionString = process.env.DATABASE_URL || '';

// Create a Postgres client with longer timeout
const client = postgres(connectionString, {
  prepare: false,
  connect_timeout: 60, // 60 second connection timeout for slower connections
  idle_timeout: 30,    // 30 second idle timeout
  max_lifetime: 60 * 30 // 30 minute connection lifetime
});

// Create a Drizzle client
export const db = drizzle(client);

// Export types for use in the application
export type Faculty = typeof schema.faculty.$inferSelect;
export type InsertFaculty = typeof schema.faculty.$inferInsert;

export type Paper = typeof schema.papers.$inferSelect;
export type InsertPaper = typeof schema.papers.$inferInsert;

export type ResearchArea = typeof schema.researchAreas.$inferSelect;
export type InsertResearchArea = typeof schema.researchAreas.$inferInsert; 