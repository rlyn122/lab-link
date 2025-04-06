import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Check for environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is required");
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is required");
}

// Connection string for Postgres
const connectionString = `${process.env.NEXT_PUBLIC_SUPABASE_URL.replace(
  ".co",
  ".co:5432"
)}/postgres?pgbouncer=true`;

// Create a Postgres client
const client = postgres(connectionString, {
  prepare: false,
  pass: process.env.SUPABASE_SERVICE_ROLE_KEY,
});

// Create a Drizzle client
export const db = drizzle(client, { schema });

// Export types for use in the application
export type Faculty = typeof schema.faculty.$inferSelect;
export type InsertFaculty = typeof schema.faculty.$inferInsert;

export type Paper = typeof schema.papers.$inferSelect;
export type InsertPaper = typeof schema.papers.$inferInsert;

export type ResearchArea = typeof schema.researchAreas.$inferSelect;
export type InsertResearchArea = typeof schema.researchAreas.$inferInsert; 