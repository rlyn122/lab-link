"use client";

import { PageContainer } from "@/components/layout/page-container";

export default function HomeLoading() {
  return (
    <PageContainer className="flex flex-col h-full" maxWidth="narrow">
      <div className="mb-8 text-center">
        <div className="h-8 bg-gray-200 rounded animate-pulse mx-auto w-64 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-96"></div>
      </div>
      
      <div className="flex-1 flex flex-col min-h-[60vh] rounded-lg border bg-card p-4 md:p-6">
        {/* Chat messages loading skeleton */}
        <div className="flex-1 space-y-4 mb-4">
          <div className="bg-muted p-4 rounded-lg">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4 mb-2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            </div>
          </div>
          
          <div className="flex justify-center items-center py-8">
            <div className="inline-block relative w-10 h-10">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 border-l-transparent border-b-transparent border-r-transparent rounded-full animate-spin"></div>
            </div>
            <span className="ml-3 text-gray-500">Thinking...</span>
          </div>
        </div>
        
        {/* Chat input loading skeleton */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="w-full h-10 rounded-md bg-gray-200 animate-pulse"></div>
          </div>
          <div className="w-16 h-10 rounded-md bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </PageContainer>
  );
} 