import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://emir-portfolio-two.vercel.app'),
  title: "Muhammed Emir Aydın | AI-Assisted Web Products",
  description: "I build AI-assisted web products and turn ideas into working, deployed tools. Explore my projects, frontend experiments, and interactive web work.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Muhammed Emir Aydın | AI-Assisted Web Products",
    description: "I build AI-assisted web products and turn ideas into working, deployed tools. Explore my projects, frontend experiments, and interactive web work.",
    type: "website",
    url: "https://emir-portfolio-two.vercel.app",
    siteName: "Muhammed Emir Aydın",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammed Emir Aydın | AI-Assisted Web Products",
    description: "I build AI-assisted web products and turn ideas into working, deployed tools. Explore my projects, frontend experiments, and interactive web work.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-accent/30 selection:text-foreground">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
