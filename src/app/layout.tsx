import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "../config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Muhammed Emir Aydın | AI & Full-Stack Engineer",
  description: "4th-year Computer Engineering student at Kütahya Dumlupınar University. Builds end-to-end AI, web, and mobile systems. Founder of Nef Ajans. Selected engineering work and case studies.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Muhammed Emir Aydın | AI & Full-Stack Engineer",
    description: "4th-year Computer Engineering student at Kütahya Dumlupınar University. Builds end-to-end AI, web, and mobile systems.",
    type: "website",
    url: SITE_URL,
    siteName: "Muhammed Emir Aydın",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammed Emir Aydın | AI & Full-Stack Engineer",
    description: "4th-year Computer Engineering student at Kütahya Dumlupınar University. Builds end-to-end AI, web, and mobile systems.",
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
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
