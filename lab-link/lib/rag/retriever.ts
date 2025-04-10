// Example implementation structure for retriever.ts
import {supabase, createAdminClient, handleSupabaseError} from '@/lib/supabase/client';
import {generateText} from '@/lib/gemini/client';
import {generateSQL} from '@/lib/gemini/sql-generator';

export async function retrieveRelevantResearch(query: string) {

  
  // Perform search across research papers, faculty, etc.
//   try{
//     const client  = supabase;

//     const sqlQuery = await generateSQL(query);
//     console.log("Generated SQL Query:", sqlQuery);

//     const { data , error } = await client.rpc('execute_dynamic_query',{
//         query_text: sqlQuery
//     });

//     if (error){
//         handleSupabaseError(error);
//     }

//     return data
//   }
//   catch(error){
    // console.error('Error retrieving relevant research:', error);
    return fallbackSearch(query);
//   }
}

  //fall back to preset query
  async function fallbackSearch(query: string) {
    const adminClient = createAdminClient();
    
    const { data, error } = await adminClient
    .from('faculty')
    .select(`
      *,
      paper_authors!faculty_id (
        paper:paper_id (
          id,
          title,
          year,
          url,
          abstract
        )
      )
    `)

    if (error) {
      handleSupabaseError(error);
    }

    console.log(data)
    
    return data;
  }