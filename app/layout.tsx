import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import EasterEgg from "@/components/ui/EasterEgg";

export const metadata: Metadata = {
  title: "Sadugudu Studios | Story Driven Tamil Game Development Studio",
  description:
    "Sadugudu Studios is building unforgettable story-driven Tamil games for Roblox, Steam, and Epic Games. Where every game begins with a story.",
  keywords: [
    "Tamil Games",
    "Roblox Games",
    "Game Studio",
    "Tamil Gaming",
    "Game Development",
    "Steam Games",
    "Epic Games",
    "India Game Studio",
    "Story Games",
    "Sadugudu Studios",
  ],
  authors: [{ name: "Sadugudu Studios" }],
  openGraph: {
    title: "Sadugudu Studios | Story Driven Tamil Game Development Studio",
    description:
      "Building unforgettable story-driven Tamil games. Where every game begins with a story.",
    siteName: "Sadugudu Studios",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadugudu Studios | Tamil Game Development Studio",
    description:
      "Building unforgettable story-driven Tamil games. Where every game begins with a story.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full bg-[#050505] text-white overflow-x-hidden">
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <EasterEgg />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
