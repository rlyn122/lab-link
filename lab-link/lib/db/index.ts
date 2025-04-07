import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log(`Loading environment variables from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.warn(`Warning: .env.local file not found at ${envPath}`);
  console.log('Current directory:', process.cwd());
}

// Check for environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is required in .env.local");
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is required in .env.local");
}

// Format Supabase URL correctly for direct Postgres connection
// Expected format: https://[project-ref].supabase.co
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const connectionString = `postgres://postgres:${process.env.SUPABASE_SERVICE_ROLE_KEY}@${supabaseUrl.replace('https://', '').replace('.supabase.co', '.supabase.co:5432')}/postgres`;

console.log(`Connecting to database at ${supabaseUrl.replace(/^(https?:\/\/[^.]+)\..*$/, '$1.***')}`);

// Create a Postgres client with longer timeout
const client = postgres(connectionString, {
  prepare: false,
  connect_timeout: 30, // 30 second connection timeout
  idle_timeout: 30,    // 30 second idle timeout
  max_lifetime: 60 * 30 // 30 minute connection lifetime
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