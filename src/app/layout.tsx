import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07090D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Ahmad Hassan | Computer Science Student & Aspiring AI Developer",
  description:
    "Explore Ahmad Hassan's software projects, learning journey, and interests in AI, automation, and web development.",
  keywords: [
    "Ahmad Hassan",
    "Computer Science Student",
    "AI Developer",
    "Automation Developer",
    "Next.js",
    "TypeScript",
    "Software Engineering",
    "ShopLens",
    "Flexivo",
  ],
  authors: [{ name: "Ahmad Hassan" }],
  creator: "Ahmad Hassan",
  metadataBase: new URL("https://ahmad-portfolio.vercel.app"),
  openGraph: {
    title: "Ahmad Hassan | Computer Science Student & Aspiring AI Developer",
    description:
      "Explore Ahmad Hassan's software projects, learning journey, and interests in AI, automation, and web development.",
    type: "website",
    locale: "en_US",
    siteName: "Ahmad Hassan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Hassan | Computer Science Student & Aspiring AI Developer",
    description:
      "Explore Ahmad Hassan's software projects, learning journey, and interests in AI, automation, and web development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="bg-[#07090D] text-[#F5F7FA] min-h-screen flex flex-col relative antialiased selection:bg-[#A3FF12] selection:text-[#07090D]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
