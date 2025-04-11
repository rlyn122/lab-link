import { PageContainer } from "@/components/layout/page-container";
import { FacultyCard } from "@/components/research/faculty-card";
import { db } from "@/lib/db";
import { faculty, papers } from "@/lib/db/schema";
import type { Faculty, Paper } from "@/lib/db";

async function getFacultyWithPapers() {
  const facultyList = await db.query.faculty.findMany({
    with: {
      papers: {
        with: {
          paper: true
        }
      }
    }
  });

  return facultyList.map((f: Faculty & { papers: { paper: Paper }[] }) => ({
    ...f,
    papers: f.papers.map((p: { paper: Paper }) => p.paper)
  }));
}

export default async function ResearchPage() {
  const facultyList = await getFacultyWithPapers();

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Research Database</h1>
        <p className="mt-2 text-muted-foreground">
          Browse faculty research papers and academic publications
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search research papers..."
              className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
            />
          </div>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Search
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {facultyList.map((faculty: Faculty & { papers: Paper[] }) => (
          <FacultyCard key={faculty.id} faculty={faculty} />
        ))}
      </div>
    </PageContainer>
  );
} 