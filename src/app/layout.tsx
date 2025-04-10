import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import Footer from "./components/Footer";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  preload: true,
  variable: "--font-jetbrains",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lovable UI",
  description: "UI Components for Lovable Devs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`  ${geistSans.variable} ${geistMono.variable} bg-[var(--bg-dark)] ${jetBrainsMono.variable} overflow-x-hidden grain-bg antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
