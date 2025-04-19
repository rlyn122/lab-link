import {generateText} from './client';
import {faculty,papers} from '@/lib/db/schema';

export async function generateSQL(userQuery: string) {

  const schema = `
  DATABASE SCHEMA: 
  
  Table: public.publications
  - index: integer (primary key)
  - Author: text
  - Title: text
  - Year: integer
  - URL: text
  - Abstract: text
  - Affiliation: text
  - Homepage: text
  - Email_Domain: text
  - Scholar_ID: text
  - Interests: text
  - Citedby: integer
  - Citedby5y: integer
  - hindex: integer
  - hindex5y: integer
  - i10index: integer
  - i10index5y: integer
  `;

  const prompt = `
  You are a highly accurate text-to-SQL generator agent. Your job is to convert natural language questions into PostgreSQL queries based on the schema of the databasae provided below:
  
  DATABASE SCHEMA:
  ${schema}
  
  USER REQUEST:
  ${userQuery}
  
  Instructions:
  - Return only the SQL query and nothing else
  - Do not include explanations or comments in the SQL query
  - Use public.publication at the fully qualified table name
  - Use ILIKE for case-insensitive matching
  - Enclose string literals in single quotes
  - Try to use SELECT * as little as possible, try to specify only the needed columns
  - Use LIMIT clauses when the query asks for a fixed number of results (like 'top 5')
  - Use ORDER BY to sort the results appropriatelyfor ranking metrics like Citedby, hindex, etc.

  Here are some examples of questions that we expect:
  Question: 'Who are the top 5 most cited authors in the database?'
  Query: SELECT Author, Citedby \n FROM public.publications \n ORDER BY Citedby DESC \n LIMIT 5;

  Question: 'List publications from 2023 about machine learning.'
  Query: SELECT Title, Author, Year \n FROM public.publications \n WHERE Year = 2023 AND Interests ILIKE '%machine learning%';

  Question: 'Can you summarize the research done by Professor John Doe in the year 2024?'
  Query: SELECT Title, Abstract, Year, Author \n FROM public.publications \n WHERE Author ILIKE '%John Doe%' AND Year = 2024;

  Question: 'I am interested in natural language processing and machine learning. Can you show me some publications that match both of these interests?'
  Query: SELECT Title, Author, Year, Abstract \n FROM public.publications \n WHERE Interests ILIKE '%natural language processing%' OR Interests ILIKE '%machine learning%' \n
    `;
  
  const response = await generateText(prompt);
  return response;
}