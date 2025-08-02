import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Penmark",
  description: "Note app for real developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="retro" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar
          brand="Penmark"
          navItems={[
            { label: "Github", href: "https://github.com/RazFernandez" },
            { label: "LinkedIn", href: "https://linkedin.com/in/mrjfernandez" },
            { label: "Portfolio", href: "https://miguel-portfolio-web-fawn.vercel.app/portfolio" },
          ]}
        />
        {children}
      </body>
    </html>
  );
}
