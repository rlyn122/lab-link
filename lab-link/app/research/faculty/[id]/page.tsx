import { PageContainer } from "@/components/layout/page-container";
import { db } from "@/lib/db";
import { faculty, papers } from "@/lib/db/schema";
import { notFound } from "next/navigation";
import { ExternalLink, Mail, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface FacultyPageProps {
  params: {
    id: string;
  };
}

export default async function FacultyPage({ params }: FacultyPageProps) {
  if (!params?.id) {
    notFound();
  }

  const facultyId = parseInt(params.id);
  if (isNaN(facultyId)) {
    notFound();
  }
  
  const facultyData = await db.query.faculty.findFirst({
    where: (faculty, { eq }) => eq(faculty.id, facultyId),
    with: {
      papers: {
        with: {
          paper: true
        }
      }
    }
  });

  if (!facultyData) {
    notFound();
  }

  // Sort papers by year in descending order
  const sortedPapers = [...facultyData.papers.map(p => p.paper)].sort((a, b) => {
    if (!a.year && !b.year) return 0;
    if (!a.year) return 1;
    if (!b.year) return -1;
    return b.year - a.year;
  });

  return (
    <PageContainer>
      <div className="mb-8">
        <div className="flex items-start gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted">
            {facultyData.url_picture ? (
              <Image
                src={facultyData.url_picture}
                alt={facultyData.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <GraduationCap className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{facultyData.name}</h1>
                {facultyData.affiliation && (
                  <p className="mt-2 text-muted-foreground">{facultyData.affiliation}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                {facultyData.homepage && (
                  <a
                    href={facultyData.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="h-6 w-6" />
                  </a>
                )}
                {facultyData.emailDomain && (
                  <a
                    href={`mailto:${facultyData.name.split(' ')[0].toLowerCase()}@${facultyData.emailDomain}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {facultyData.interests?.split(",").map((interest, index) => (
                <Badge key={index} variant="secondary">
                  {interest.trim()}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {facultyData.citedby && (
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Total Citations</p>
                  <p className="text-2xl font-semibold">{facultyData.citedby}</p>
                </div>
              )}
              {facultyData.hindex && (
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">h-index</p>
                  <p className="text-2xl font-semibold">{facultyData.hindex}</p>
                </div>
              )}
              {facultyData.i10index && (
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">i10-index</p>
                  <p className="text-2xl font-semibold">{facultyData.i10index}</p>
                </div>
              )}
              {facultyData.scholarId && (
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Google Scholar</p>
                  <a
                    href={`https://scholar.google.com/citations?user=${facultyData.scholarId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    View Profile
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Publications</h2>
        {sortedPapers.map((paper) => (
          <div key={paper.id} className="rounded-lg border p-6">
            <h3 className="text-xl font-semibold">{paper.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {paper.year}
            </p>
            {paper.abstract && (
              <p className="mt-4 text-muted-foreground">{paper.abstract}</p>
            )}
            {paper.url && (
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-primary hover:text-primary/80"
              >
                Read paper <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            )}
          </div>
        ))}
      </div>
    </PageContainer>
  );
} 