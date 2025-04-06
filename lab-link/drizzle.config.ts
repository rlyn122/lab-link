import { defineConfig } from "drizzle-kit";
import "dotenv/config";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is required");
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  // For Postgres via Supabase
  dbCredentials: {
    host: process.env.NEXT_PUBLIC_SUPABASE_URL!.replace("https://", "").replace(".co", ".co:5432"),
    user: "postgres",
    password: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    database: "postgres",
  }
}); 