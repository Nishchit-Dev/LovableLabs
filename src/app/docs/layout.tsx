import type { Metadata } from "next";
import React from "react";
import DocLayoutClient from "./components/DocLayout";

export const metadata: Metadata = {
  title: "Lovable UI | Docs",
  description: "Documentation for Lovable UI Components",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocLayoutClient>{children}</DocLayoutClient>;
}
