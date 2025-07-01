import type { Metadata } from "next";
import React from "react";
import DocLayoutClient from "./components/DocLayout";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Docs for React",
  },
  description: "Documentation for LovableLabs UI Components",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DocLayoutClient>{children}</DocLayoutClient>
    </>
  );
}
