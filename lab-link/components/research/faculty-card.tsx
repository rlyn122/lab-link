'use client';

import type { Faculty, Paper } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ChevronRight, Mail, GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FacultyCardProps {
  faculty: Faculty & {
    papers: Paper[];
  };
}

export function FacultyCard({ faculty }: FacultyCardProps) {
  // Get the most recent paper year
  const mostRecentYear = faculty.papers.reduce((latest, paper) => {
    if (!paper.year) return latest;
    return Math.max(latest, paper.year);
  }, 0);

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <div className="relative">
        <Link href={`/research/faculty/${faculty.id}`} className="block">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                {faculty.url_picture ? (
                  <Image
                    src={faculty.url_picture}
                    alt={faculty.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{faculty.name}</CardTitle>
                    {faculty.affiliation && (
                      <p className="text-sm text-muted-foreground mt-1">{faculty.affiliation}</p>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {faculty.interests?.split(",").map((interest: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {interest.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>{faculty.papers.length} publications</span>
                {faculty.hindex && (
                  <span>h-index: {faculty.hindex}</span>
                )}
                {faculty.i10index && (
                  <span>i10-index: {faculty.i10index}</span>
                )}
              </div>
              {mostRecentYear > 0 && (
                <span>Most recent: {mostRecentYear}</span>
              )}
            </div>
          </CardContent>
        </Link>
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {faculty.homepage && (
            <a
              href={faculty.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
          {faculty.emailDomain && (
            <a
              href={`mailto:${faculty.name.split(' ')[0].toLowerCase()}@${faculty.emailDomain}`}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
} 