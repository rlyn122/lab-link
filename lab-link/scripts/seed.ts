import { db } from "@/lib/db";
import { faculty, papers, paperAuthors, researchAreas, paperResearchAreas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Example sample data for seeding
const sampleFaculty = [
  {
    name: "Dr. Jane Smith",
    affiliation: "Computer Science Department",
    homepage: "https://cs.example.edu/~jsmith",
    emailDomain: "cs.example.edu",
    scholarId: "jsmith123",
    interests: "Artificial Intelligence, Machine Learning, NLP",
    citedby: 5000,
    citedby5y: 3000,
    hindex: 30,
    hindex5y: 25,
    i10index: 50,
    i10index5y: 40,
  },
  {
    name: "Dr. John Doe",
    affiliation: "Computer Science Department",
    homepage: "https://cs.example.edu/~jdoe",
    emailDomain: "cs.example.edu",
    scholarId: "jdoe456",
    interests: "Computer Vision, Deep Learning, Robotics",
    citedby: 7500,
    citedby5y: 4000,
    hindex: 35,
    hindex5y: 28,
    i10index: 60,
    i10index5y: 45,
  },
];

const sampleResearchAreas = [
  {
    name: "Artificial Intelligence",
    description: "Research focused on creating intelligent machines",
  },
  {
    name: "Machine Learning",
    description: "Research on algorithms that can learn from data",
  },
  {
    name: "Computer Vision",
    description: "Research on enabling computers to see and interpret visual data",
  },
];

const samplePapers = [
  {
    title: "Advances in Neural Network Architectures",
    year: 2023,
    url: "https://example.org/papers/neural-network-advances",
    abstract: "This paper presents new architectures for neural networks that improve performance on a variety of tasks.",
  },
  {
    title: "Explainable AI for Healthcare Applications",
    year: 2022,
    url: "https://example.org/papers/explainable-ai-healthcare",
    abstract: "We propose methods for making AI systems used in healthcare more explainable and transparent.",
  },
];

/**
 * Seed the database with sample data
 */
async function seed() {
  console.log("🌱 Starting database seeding...");

  try {
    console.log("Clearing existing data...");
    // Clear existing data (in reverse order of dependencies)
    await db.delete(paperResearchAreas);
    await db.delete(paperAuthors);
    await db.delete(papers);
    await db.delete(researchAreas);
    await db.delete(faculty);

    console.log("Inserting faculty data...");
    const insertedFaculty = await db.insert(faculty).values(sampleFaculty).returning();
    
    console.log("Inserting research areas...");
    const insertedResearchAreas = await db.insert(researchAreas).values(sampleResearchAreas).returning();
    
    console.log("Inserting papers...");
    const insertedPapers = await db.insert(papers).values(samplePapers).returning();
    
    // Create connections between papers and faculty (authors)
    console.log("Creating paper-author relationships...");
    await db.insert(paperAuthors).values([
      { paperId: insertedPapers[0].id, facultyId: insertedFaculty[0].id },
      { paperId: insertedPapers[1].id, facultyId: insertedFaculty[0].id },
      { paperId: insertedPapers[1].id, facultyId: insertedFaculty[1].id },
    ]);
    
    // Create connections between papers and research areas
    console.log("Creating paper-research area relationships...");
    await db.insert(paperResearchAreas).values([
      { paperId: insertedPapers[0].id, areaId: insertedResearchAreas[0].id },
      { paperId: insertedPapers[0].id, areaId: insertedResearchAreas[1].id },
      { paperId: insertedPapers[1].id, areaId: insertedResearchAreas[0].id },
      { paperId: insertedPapers[1].id, areaId: insertedResearchAreas[2].id },
    ]);
    
    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    process.exit(0);
  }
}

// Run the seed function
seed(); 