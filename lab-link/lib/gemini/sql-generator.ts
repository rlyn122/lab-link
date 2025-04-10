import {generateText} from './client';
import {faculty,papers} from '@/lib/db/schema';

export async function generateSQL(userQuery: string) {

  const schema = `


  DATABASE SCHEMA: 
  
  Table: public.faculty
  - id: serial (primary key)
  - name: varchar(255) NOT NULL
  - affiliation: varchar(255)
  - homepage: text
  - email_domain: varchar(100)
  - scholar_id: varchar(50) UNIQUE
  - interests: text
  - citedby: integer
  - citedby5y: integer
  - hindex: integer
  - hindex5y: integer
  - i10index: integer
  - i10index5y: integer
  - created_at: timestamp
  - updated_at: timestamp
  
  Table: public.papers
  - id: serial (primary key)
  - title: varchar(500) NOT NULL
  - year: integer
  - url: text
  - abstract: text
  - created_at: timestamp
  - updated_at: timestamp
  
  Table: public.paper_authors (junction table)
  - paper_id: integer NOT NULL (foreign key to papers.id)
  - faculty_id: integer NOT NULL (foreign key to faculty.id)
  - Primary key: (paper_id, faculty_id)
  
  Table: public.research_areas
  - id: serial (primary key)
  - name: varchar(100) NOT NULL UNIQUE
  - description: text
  
  Table: public.paper_research_areas (junction table)
  - paper_id: integer NOT NULL (foreign key to papers.id)
  - area_id: integer NOT NULL (foreign key to research_areas.id)
  - Primary key: (paper_id, area_id)
  
  RELATIONSHIPS:
  - A faculty member can author multiple papers (through paper_authors)
  - A paper can have multiple faculty authors (through paper_authors)
  - A paper can belong to multiple research areas (through paper_research_areas)
  - A research area can contain multiple papers (through paper_research_areas)
  
  COMMON JOIN PATTERNS:
  - To get papers with their authors: join papers with paper_authors and faculty
  - To get papers by research area: join papers with paper_research_areas and research_areas
  - To get faculty with their research papers: join faculty with paper_authors and papers
  `;

  const prompt = `
  You are an SQL query generator. Given a description of what information a user wants, 
  generate a valid PostgreSQL query that will retrieve this information. 
  
  DATABASE SCHEMA:
  ${schema}
  
  USER REQUEST:
  ${userQuery}
  
  Generate only the SQL query without any explanations or markdown formatting. The query should be valid PostgreSQL syntax.
    `;
  

  const response = await generateText(prompt);
  return response;
  
}