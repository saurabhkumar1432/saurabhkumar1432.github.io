import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://saurabhkumar.com"), // Update this with your actual domain
  title: "Saurabh Kumar | Creative Developer",
  description: "Portfolio of Saurabh Kumar, a Full Stack Developer & Creative Technologist specializing in AI-native mobile apps, 3D web experiences, and scalable SaaS architectures.",
  keywords: ["Saurabh Kumar", "Software Engineer", "Full Stack Developer", "Creative Developer", "Next.js", "Three.js", "React Native", "AI", "Portfolio"],
  authors: [{ name: "Saurabh Kumar", url: "https://saurabhkumar.com" }],
  creator: "Saurabh Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com", // User needs to update this
    title: "Saurabh Kumar | Creative Developer",
    description: "Building the next generation of digital experiences. Explore my work in AI, 3D, and Web Engineering.",
    siteName: "Saurabh Kumar Portfolio",
    images: [
      {
        url: "/og-image.jpg", // User needs to add this file to public/
        width: 1200,
        height: 630,
        alt: "Saurabh Kumar Portfolio",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico", // User needs to add this
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="noise" />
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
