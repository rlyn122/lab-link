// lib/rag/context-manager.ts
import { retrieveRelevantResearch } from './retriever';

export async function buildPromptContext(query: string, conversationHistory: any[]) {
  // Retrieve relevant data
  const relevantResearch = await retrieveRelevantResearch(query);
  
  // Format the research data into a string
  const formattedContext = formatResearchData(relevantResearch);
  
  // Combine with conversation history
  return {
    conversationHistory,
    researchContext: formattedContext
  };
}

// Function to format any research data into a readable string
function formatResearchData(data: any): string {
  if (!data) return "No relevant information found.";
  
  // Handle array of results
  if (Array.isArray(data)) {
    return data.map((item, index) => {
      return `RESULT ${index + 1}:\n${formatSingleItem(item)}`;
    }).join("\n\n");
  }
  
  // Handle single result
  return formatSingleItem(data);
}

// Function to format a single item of any type
function formatSingleItem(item: any): string {
  if (typeof item !== 'object' || item === null) {
    return String(item);
  }
  
  // Detect item type based on properties to customize formatting
  if (item.title && item.abstract) {
    // Looks like a research paper
    return formatPaper(item);
  } else if (item.name && item.interests) {
    // Looks like a faculty member
    return formatFaculty(item);
  } else if (item.name && item.description) {
    // Looks like a research area
    return formatResearchArea(item);
  }
  
  // Generic object formatting
  return Object.entries(item)
    .filter(([key, value]) => {
      // Filter out null values and internal props
      return value != null && !key.startsWith('_') && !key.endsWith('_at');
    })
    .map(([key, value]) => {
      // Format key name for readability
      const formattedKey = key
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/\b\w/g, l => l.toUpperCase());
      
      return `${formattedKey}: ${value}`;
    })
    .join('\n');
}

// Specific formatters for different data types
function formatFaculty(faculty: any): string {
  return `FACULTY MEMBER:
Name: ${faculty.name}
Affiliation: ${faculty.affiliation || 'Not specified'}
Research Interests: ${faculty.interests || 'Not specified'}
Citations: ${faculty.citedby || 'Not available'} (${faculty.citedby5y || 'Not available'} in last 5 years)
H-index: ${faculty.hindex || 'Not available'} (${faculty.hindex5y || 'Not available'} in last 5 years)
Contact: ${faculty.email_domain ? `Email domain: ${faculty.email_domain}` : 'Not available'}
${faculty.homepage ? `Homepage: ${faculty.homepage}` : ''}`;
}

function formatPaper(paper: any): string {
  return `RESEARCH PAPER:
Title: ${paper.title}
${paper.year ? `Year: ${paper.year}` : ''}
${paper.abstract ? `Abstract: ${paper.abstract}` : 'Abstract: Not available'}
${paper.url ? `URL: ${paper.url}` : ''}`;
}

function formatResearchArea(area: any): string {
  return `RESEARCH AREA:
Name: ${area.name}
Description: ${area.description || 'No description available'}`;
}