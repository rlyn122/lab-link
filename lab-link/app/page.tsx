import { PageContainer } from "@/components/layout/page-container";

export default function ChatPage() {
  return (
    <PageContainer className="flex flex-col h-full" maxWidth="narrow">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Lab Link Assistant</h1>
        <p className="mt-2 text-muted-foreground">
          Ask questions about research papers, faculty, and academic topics
        </p>
      </div>
      
      <div className="flex-1 flex flex-col min-h-[60vh] rounded-lg border bg-card p-4 md:p-6">
        {/* Chat messages will go here */}
        <div className="flex-1 space-y-4 mb-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium">Lab Link AI</p>
            <p className="mt-1">
              Hello! I'm your research assistant. How can I help you today?
            </p>
          </div>
        </div>
        
        {/* Chat input */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
            />
          </div>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Send
          </button>
        </div>
      </div>
    </PageContainer>
  );
}
