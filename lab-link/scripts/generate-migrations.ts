import * as path from "path";
import { execSync } from "child_process";
import * as fs from "fs";

/**
 * Script to generate database migrations based on schema
 */
console.log("🔄 Generating database migrations...");

try {
  // Run drizzle-kit to generate migrations
  execSync("npx drizzle-kit generate:pg", {
    stdio: "inherit",
    cwd: path.resolve(__dirname, "../"),
  });

  console.log("✅ Migrations generated successfully!");
  console.log("");
  console.log("To apply migrations, you can:");
  console.log("1. Use the Supabase SQL editor to run the migration SQL files");
  console.log(
    "2. Or modify this script to push migrations directly via the Supabase client"
  );
} catch (error) {
  console.error("❌ Failed to generate migrations:", error);
  process.exit(1);
} 