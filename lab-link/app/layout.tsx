import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { ChatProvider } from "@/components/chat/chat-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lab Link",
  description: "Connecting researchers and students through AI-powered research discovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ChatProvider>
          <div className="flex min-h-screen flex-col">
            <Sidebar />
            <div className="flex flex-col md:pl-64">
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </ChatProvider>
      </body>
    </html>
  );
}
