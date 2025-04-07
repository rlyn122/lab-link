import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { db } from "@/lib/db";
import { 
  faculty, 
  papers, 
  paperAuthors, 
  researchAreas, 
  paperResearchAreas 
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Type definitions
type FacultyData = {
  name: string;
  affiliation?: string;
  homepage?: string;
  emailDomain?: string;
  scholarId?: string;
  interests?: string;
  citedby?: number;
  citedby5y?: number;
  hindex?: number;
  hindex5y?: number;
  i10index?: number;
  i10index5y?: number;
};

type PaperData = {
  title: string;
  year?: number | null;
  url?: string;
  abstract?: string;
  authors: string[]; // Array of faculty names
  researchAreas?: string[]; // Array of research area names
};

/**
 * Import faculty data from a CSV file
 * @param filepath Path to the CSV file
 * @returns Array of imported faculty IDs
 */
export async function importFacultyFromCsv(filepath: string) {
  console.log(`Importing faculty data from ${filepath}...`);
  
  try {
    const fileContent = fs.readFileSync(filepath, 'utf8');
    const records = parse(fileContent, { 
      columns: true, 
      skip_empty_lines: true,
      trim: true
    });
    
    console.log(`Found ${records.length} faculty records`);
    
    const facultyData: FacultyData[] = records.map((record: any) => ({
      name: record.Name,
      affiliation: record.Affiliation,
      homepage: record.Homepage,
      emailDomain: record.Email_Domain,
      scholarId: record.Scholar_ID,
      interests: record.Interests,
      citedby: record.Citedby ? parseInt(record.Citedby) : null,
      citedby5y: record.Citedby5y ? parseInt(record.Citedby5y) : null,
      hindex: record.hindex ? parseInt(record.hindex) : null,
      hindex5y: record.hindex5y ? parseInt(record.hindex5y) : null,
      i10index: record.i10index ? parseInt(record.i10index) : null,
      i10index5y: record.i10index5y ? parseInt(record.i10index5y) : null,
    }));
    
    const inserted = await db.insert(faculty).values(facultyData).returning();
    console.log(`Successfully imported ${inserted.length} faculty members`);
    
    return inserted;
  } catch (error) {
    console.error('Error importing faculty data:', error);
    throw error;
  }
}

/**
 * Import papers data from a CSV file and create relationships with faculty and research areas
 * @param filepath Path to the CSV file
 * @param createMissingResearchAreas Whether to create research areas that don't exist yet
 * @returns Array of imported paper IDs
 */
export async function importPapersFromCsv(filepath: string, createMissingResearchAreas = true) {
  console.log(`Importing papers data from ${filepath}...`);
  
  try {
    const fileContent = fs.readFileSync(filepath, 'utf8');
    const records = parse(fileContent, { 
      columns: true, 
      skip_empty_lines: true,
      trim: true
    });
    
    console.log(`Found ${records.length} paper records`);
    
    // Get existing faculty and research areas for lookups
    const existingFaculty = await db.select().from(faculty);
    const facultyMap = new Map(existingFaculty.map(f => [f.name.toLowerCase(), f]));
    
    let existingAreas = await db.select().from(researchAreas);
    const areaMap = new Map(existingAreas.map(a => [a.name.toLowerCase(), a]));
    
    const papersToInsert: Omit<PaperData, 'authors' | 'researchAreas'>[] = [];
    const paperRelationships: Record<string, { authors: string[], areas: string[] }> = {};
    
    // Process each paper record
    for (const record of records) {
      // Parse paper data
      const paper = {
        title: record.Title,
        year: record.Year ? parseInt(record.Year) : null,
        url: record.URL,
        abstract: record.Abstract,
      };
      
      papersToInsert.push(paper);
      
      // Track relationships to create after paper insertion
      const authorNames = record.Author ? record.Author.split(';').map((a: string) => a.trim()) : [];
      const areaNames = record.Research_Areas ? record.Research_Areas.split(';').map((a: string) => a.trim()) : [];
      
      paperRelationships[record.Title] = {
        authors: authorNames,
        areas: areaNames
      };
      
      // Create missing research areas if the flag is set
      if (createMissingResearchAreas) {
        const newAreas = areaNames.filter((area: string) => !areaMap.has(area.toLowerCase()));
        
        if (newAreas.length > 0) {
          const areasToInsert = newAreas.map((name: string) => ({ name, description: `Research related to ${name}` }));
          const insertedAreas = await db.insert(researchAreas).values(areasToInsert).returning();
          
          // Update our area lookup map with the newly inserted areas
          for (const area of insertedAreas) {
            areaMap.set(area.name.toLowerCase(), area);
          }
          
          console.log(`Created ${insertedAreas.length} new research areas`);
        }
      }
    }
    
    // Insert all papers
    const insertedPapers = await db.insert(papers).values(papersToInsert).returning();
    console.log(`Successfully imported ${insertedPapers.length} papers`);
    
    // Create paper-author relationships
    const paperAuthorRelationships = [];
    const paperAreaRelationships = [];
    
    for (const paper of insertedPapers) {
      const relationships = paperRelationships[paper.title];
      
      // Skip if no relationships found for this paper (defensive programming)
      if (!relationships) {
        console.warn(`Warning: No relationship data found for paper: ${paper.title}`);
        continue;
      }
      
      // Create paper-author relationships
      if (relationships.authors && relationships.authors.length > 0) {
        for (const authorName of relationships.authors) {
          const author = facultyMap.get(authorName.toLowerCase());
          if (author) {
            paperAuthorRelationships.push({
              paperId: paper.id,
              facultyId: author.id
            });
          } else {
            console.warn(`Warning: Author not found: ${authorName}`);
          }
        }
      }
      
      // Create paper-research area relationships
      if (relationships.areas && relationships.areas.length > 0) {
        for (const areaName of relationships.areas) {
          const area = areaMap.get(areaName.toLowerCase());
          if (area) {
            paperAreaRelationships.push({
              paperId: paper.id,
              areaId: area.id
            });
          } else {
            console.warn(`Warning: Research area not found: ${areaName}`);
          }
        }
      }
    }
    
    // Insert relationships if we have any
    if (paperAuthorRelationships.length > 0) {
      await db.insert(paperAuthors).values(paperAuthorRelationships);
      console.log(`Created ${paperAuthorRelationships.length} paper-author relationships`);
    }
    
    if (paperAreaRelationships.length > 0) {
      await db.insert(paperResearchAreas).values(paperAreaRelationships);
      console.log(`Created ${paperAreaRelationships.length} paper-research area relationships`);
    }
    
    return insertedPapers;
  } catch (error) {
    console.error('Error importing papers data:', error);
    throw error;
  }
}

/**
 * Main import function that orchestrates importing multiple data files
 */
export async function importAllData(facultyFilePath?: string, papersFilePath?: string) {
  try {
    // Import faculty first (if path provided)
    if (facultyFilePath) {
      await importFacultyFromCsv(facultyFilePath);
    }
    
    // Then import papers (if path provided)
    if (papersFilePath) {
      await importPapersFromCsv(papersFilePath);
    }
    
    console.log('✅ All data import completed successfully!');
  } catch (error) {
    console.error('❌ Data import failed:', error);
  } finally {
    process.exit(0);
  }
} 