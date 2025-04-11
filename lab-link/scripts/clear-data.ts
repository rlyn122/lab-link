import { db } from "@/lib/db";
import { 
  faculty, 
  papers, 
  paperAuthors, 
  researchAreas, 
  paperResearchAreas 
} from "@/lib/db/schema";

async function clearAllData() {
  console.log('Clearing all data from the database...');
  
  try {
    // Delete in the correct order to handle foreign key constraints
    await db.delete(paperResearchAreas);
    console.log('✅ Cleared paper research areas');
    
    await db.delete(paperAuthors);
    console.log('✅ Cleared paper authors');
    
    await db.delete(papers);
    console.log('✅ Cleared papers');
    
    await db.delete(researchAreas);
    console.log('✅ Cleared research areas');
    
    await db.delete(faculty);
    console.log('✅ Cleared faculty');
    
    console.log('✅ All data cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
  } finally {
    process.exit(0);
  }
}

clearAllData(); 