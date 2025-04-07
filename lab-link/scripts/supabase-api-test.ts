import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

/**
 * Test script for connecting to Supabase via the HTTP API instead of direct Postgres connection
 * 
 * This is useful when direct database connections are blocked by networks/firewalls
 */
async function main() {
  console.log('🔍 Testing Supabase HTTP API connection...');
  
  // Load environment variables from .env.local
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    console.log(`Loading environment variables from ${envPath}`);
    dotenv.config({ path: envPath });
  } else {
    console.warn(`Warning: .env.local file not found at ${envPath}`);
    console.log('Current directory:', process.cwd());
  }
  
  // Check if required environment variables are set
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL is not defined in .env.local');
    process.exit(1);
  }
  
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not defined in .env.local');
    process.exit(1);
  }
  
  try {
    // Create a Supabase client (using HTTP API)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    console.log('Testing connection to Supabase via HTTP API...');
    
    // Test simple query using the Supabase client
    const { data, error } = await supabase
      .from('faculty')
      .select('id, name')
      .limit(1);
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Supabase HTTP API connection successful!');
    
    // Check if we got data back
    if (data && data.length > 0) {
      console.log(`Found ${data.length} faculty record(s):`);
      console.log(data);
    } else {
      console.log('No faculty records found. Database may be empty.');
      
      // Try to get table list to check if tables exist
      const { data: tables, error: tablesError } = await supabase
        .rpc('get_tables');
      
      if (!tablesError && tables) {
        console.log('Available tables:');
        console.log(tables);
      }
    }
    
    // Show what to do next
    console.log('\nNote: If this connection works but direct Postgres connections fail:');
    console.log('1. Your network may be blocking direct database connections (port 5432/6543)');
    console.log('2. Consider using Supabase\'s REST API for your application');
    console.log('3. For import scripts, you may need to run them on a different network');
  } catch (error) {
    console.error('❌ Supabase API connection failed!');
    console.error('Error details:', error);
    
    console.log('\n--- TROUBLESHOOTING TIPS ---');
    console.log('1. Check your .env.local file has the correct values');
    console.log('2. Make sure your Supabase project is active and not paused');
    console.log('3. Try using the Supabase console directly in your browser');
    console.log('4. Verify that you\'re using the Service Role key, not the Anon key');
  } finally {
    process.exit(0);
  }
}

// Run the main function
main(); 