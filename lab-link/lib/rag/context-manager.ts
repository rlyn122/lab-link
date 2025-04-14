// lib/rag/context-manager.ts
import { retrieveRelevantResearch } from './retriever';

export async function buildPromptContext(query: string, conversationHistory: any[]) {
  // Retrieve relevant data
  const retrieved_data = await retrieveRelevantResearch(query);
  
  // Format the research data into a string
  const formattedContext = formatResearchData(retrieved_data);
  
  // Combine with conversation history
  return {
    conversationHistory,
    researchContext: formattedContext
  };
}

// Function to format any research data into a readable string
function formatResearchData(data: any): string {
  if (!data) return "No relevant information found.";
  
  const { faculty, papers } = data;
  
  let formattedText = "";
  
  // Format faculty section
  if (faculty && faculty.length > 0) {
    formattedText += "FACULTY MEMBERS:\n\n";
    formattedText += faculty.map((faculty: any, index: number) => {
      return `FACULTY ${index + 1}:\n${formatFaculty(faculty)}`;
    }).join("\n\n");
  }
  
  // Add separator if both sections exist
  if (faculty?.length > 0 && papers?.length > 0) {
    formattedText += "\n\n";
  }
  
  // Format papers section
  if (papers && papers.length > 0) {
    formattedText += "RESEARCH PAPERS:\n\n";
    formattedText += papers.map((paper: any, index: number) => {
      return `PAPER ${index + 1}:\n${formatPaper(paper)}`;
    }).join("\n\n");
  }
  
  return formattedText || "No relevant information found.";
}

// Specific formatters for different data types
function formatFaculty(faculty: any): string {
  return `Name: ${faculty.name}
Affiliation: ${faculty.affiliation || 'Not specified'}
Research Interests: ${faculty.interests || 'Not specified'}
Citations: ${faculty.citedby || 'Not available'} (${faculty.citedby5y || 'Not available'} in last 5 years)
H-index: ${faculty.hindex || 'Not available'} (${faculty.hindex5y || 'Not available'} in last 5 years)
Contact: ${faculty.email_domain ? `Email domain: ${faculty.email_domain}` : 'Not available'}
${faculty.homepage ? `Homepage: ${faculty.homepage}` : ''}`;
}

function formatPaper(paper: any): string {
  return `Title: ${paper.title}
${paper.year ? `Year: ${paper.year}` : ''}
${paper.abstract ? `Abstract: ${paper.abstract}` : 'Abstract: Not available'}
${paper.url ? `URL: ${paper.url}` : ''}`;
}