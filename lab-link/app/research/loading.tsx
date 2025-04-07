"use client";

import { PageContainer } from "@/components/layout/page-container";

export default function ResearchLoading() {
  return (
    <PageContainer>
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-96"></div>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="w-full h-10 rounded-md bg-gray-200 animate-pulse"></div>
          </div>
          <div className="w-24 h-10 rounded-md bg-gray-200 animate-pulse"></div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards for research papers */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card shadow-sm p-6">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="mx-2 h-4 bg-gray-200 rounded animate-pulse w-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
} 