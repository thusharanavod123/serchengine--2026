import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexAI — AI Chat Platform",
  description: "Your intelligent AI assistant. Chat, search, and explore ideas with powerful AI.",
  keywords: ["AI", "chat", "assistant", "search", "NexAI"],
  openGraph: {
    title: "NexAI — AI Chat Platform",
    description: "Your intelligent AI assistant",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
