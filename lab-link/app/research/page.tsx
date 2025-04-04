import { PageContainer } from "@/components/layout/page-container";

export default function ResearchPage() {
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
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards for research papers */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold">Research Paper Title {i + 1}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-muted-foreground">Author Name</span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-muted-foreground">2023</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
} 