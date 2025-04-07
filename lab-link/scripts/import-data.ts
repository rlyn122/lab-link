import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local file at the project root
const currentDir = process.cwd();
const projectRoot = path.resolve(currentDir);
const envPath = path.join(projectRoot, '.env.local');

dotenv.config({ path: envPath });

// Now import the database modules after environment variables are loaded
import { importAllData } from './import-csv';
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

/**
 * Check database connection
 */
async function checkDbConnection(): Promise<boolean> {
  try {
    console.log('Testing database connection...');
    
    // Try a simple query to test the connection
    const result = await db.execute(sql`SELECT 1 as connected`);
    console.log('✅ Database connection successful!');
    
    // Display additional information about the database
    try {
      const versionResult = await db.execute(sql`SELECT version()`);
      console.log('Database version:', versionResult[0]?.version || 'Unknown');
    } catch (err) {
      // Ignore error if we can't get version
    }
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('Error details:', error);
    return false;
  }
}

/**
 * Command line utility to import data from CSV files
 * 
 * Usage:
 * - Import only faculty data: npm run import-data faculty=path/to/faculty.csv
 * - Import only paper data: npm run import-data papers=path/to/papers.csv
 * - Import both: npm run import-data faculty=path/to/faculty.csv papers=path/to/papers.csv
 * - Check database connection: npm run import-data check-db
 */
async function main() {
  console.log('🔄 Starting data import utility...');
  
  // Parse command line arguments
  const args = process.argv.slice(2);
  let facultyFilePath: string | undefined;
  let papersFilePath: string | undefined;
  
  console.log('Received arguments:', args);
  
  // Check if user wants to check database connection only
  if (args.includes('check-db') || args.includes('--check-db')) {
    console.log('Running database connection check only...');
    await checkDbConnection();
    process.exit(0);
  }
  
  // Parse arguments in multiple formats
  for (const arg of args) {
    // Remove any quotes from the argument
    const cleanArg = arg.replace(/^["']|["']$/g, '');
    
    // Handle various formats: --key=value, key=value, --key value
    if (cleanArg.includes('=')) {
      // Handle --key=value or key=value format
      const [key, value] = cleanArg.replace(/^--/, '').split('=');
      
      if (key === 'faculty' || key === 'f') {
        facultyFilePath = value;
      } else if (key === 'papers' || key === 'p') {
        papersFilePath = value;
      }
    } else if (cleanArg === 'faculty' || cleanArg === 'f' || cleanArg === '--faculty' || cleanArg === '-f') {
      // Handle --key value format - next arg is the value
      const nextIndex = args.indexOf(arg) + 1;
      if (nextIndex < args.length) {
        facultyFilePath = args[nextIndex].replace(/^["']|["']$/g, '');
      }
    } else if (cleanArg === 'papers' || cleanArg === 'p' || cleanArg === '--papers' || cleanArg === '-p') {
      // Handle --key value format - next arg is the value
      const nextIndex = args.indexOf(arg) + 1;
      if (nextIndex < args.length) {
        papersFilePath = args[nextIndex].replace(/^["']|["']$/g, '');
      }
    }
  }
  
  // Make relative paths absolute
  if (facultyFilePath && !path.isAbsolute(facultyFilePath)) {
    facultyFilePath = path.resolve(process.cwd(), facultyFilePath);
  }
  
  if (papersFilePath && !path.isAbsolute(papersFilePath)) {
    papersFilePath = path.resolve(process.cwd(), papersFilePath);
  }
  
  console.log('Faculty file path:', facultyFilePath);
  console.log('Papers file path:', papersFilePath);
  
  // Validate input
  if (!facultyFilePath && !papersFilePath) {
    console.error('❌ Error: No input files specified');
    console.log('');
    console.log('Usage:');
    console.log('  npm run import-data faculty=path/to/faculty.csv');
    console.log('  npm run import-data papers=path/to/papers.csv');
    console.log('  npm run import-data faculty=path/to/faculty.csv papers=path/to/papers.csv');
    console.log('  npm run import-data check-db');
    console.log('');
    console.log('Alternative formats:');
    console.log('  npm run import-data -- faculty path/to/faculty.csv');
    console.log('  npm run import-data -- --faculty=path/to/faculty.csv');
    process.exit(1);
  }
  
  // Check if files exist
  if (facultyFilePath && !fs.existsSync(facultyFilePath)) {
    console.error(`❌ Error: Faculty file not found: ${facultyFilePath}`);
    process.exit(1);
  }
  
  if (papersFilePath && !fs.existsSync(papersFilePath)) {
    console.error(`❌ Error: Papers file not found: ${papersFilePath}`);
    process.exit(1);
  }
  
  // Check database connection before importing
  const isConnected = await checkDbConnection();
  if (!isConnected) {
    console.error('❌ Data import aborted due to database connection issues');
    process.exit(1);
  }
  
  // Run import using direct database connection
  await importAllData(facultyFilePath, papersFilePath);
}

// Run the main function
main(); 