import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

/**
 * Utility script to test database connection
 * 
 * Run this script with:
 * npm run db-test
 */
async function main() {
  console.log('🔍 Testing database connection...');
  
  // Log current directory and environment info
  console.log('Current directory:', process.cwd());
  const envPath = path.resolve(process.cwd(), '.env.local');
  
  console.log('.env.local path:', envPath);
  console.log('File exists:', fs.existsSync(envPath));
  
  if (fs.existsSync(envPath)) {
    console.log('Loading environment variables from:', envPath);
    const env = dotenv.config({ path: envPath });
    if (env.error) {
      console.error('Error loading .env file:', env.error);
    } else {
      console.log('Environment file loaded successfully');
    }
  }
  
  // Check environment variables
  console.log('\nEnvironment variables:');
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // Mask sensitive information
    const maskedUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/^(https?:\/\/[^.]+)\..*$/, '$1.***');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', maskedUrl);
  } else {
    console.log('NEXT_PUBLIC_SUPABASE_URL: Not set!');
  }
  
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('SUPABASE_SERVICE_ROLE_KEY: [Defined, but masked for security]');
  } else {
    console.log('SUPABASE_SERVICE_ROLE_KEY: Not set!');
  }
  
  try {
    console.log('\nAttempting database connection...');
    
    // Try a simple query
    const result = await db.execute(sql`SELECT 1 as connected`);
    console.log('✅ Database connection successful!');
    console.log('Query result:', result);
    
    // Get database version
    const versionResult = await db.execute(sql`SELECT version()`);
    console.log('Database version:', versionResult[0]?.version);
    
    // Get number of tables
    const tablesResult = await db.execute(sql`
      SELECT count(*) as table_count 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Number of tables in database:', tablesResult[0]?.table_count);
    
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('Error details:', error);
    
    console.log('\n--- TROUBLESHOOTING TIPS ---');
    console.log('1. Check your .env.local file exists and has the correct values');
    console.log('2. Make sure your Supabase project is active and not paused');
    console.log('3. Check if your IP address is allowed in Supabase database settings');
    console.log('4. Verify that port 5432 is not blocked by your firewall or network');
    console.log('5. The connection string format may need adjustment:');
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      console.log('   Current URL format:', supabaseUrl.replace(/^(https?:\/\/[^.]+)\..*$/, '$1.***'));
      console.log('   Expected format: https://[project-ref].supabase.co');
      
      const connectionString = `postgres://postgres:${process.env.SUPABASE_SERVICE_ROLE_KEY || 'PASSWORD'}@${supabaseUrl.replace('https://', '').replace('.supabase.co', '.supabase.co:5432')}/postgres`;
      console.log('   Connection string format:', connectionString.replace(/postgres:.*@/, 'postgres:[PASSWORD]@').replace(/^(postgres:.*@[^.]+)\..*$/, '$1.***'));
    }
  } finally {
    // Always exit
    process.exit(0);
  }
}

// Run the main function
main(); 