import type { Metadata } from "next";
import React from "react";
import DocLayoutClient from "./components/DocLayout";
import ActiveLink from "./components/ActiveLink";

export const metadata: Metadata = {
  title: "LovableLabs UI | Docs",
  description: "Documentation for LovableLabs UI Components",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>
 
    <DocLayoutClient>{children}</DocLayoutClient>
  </>;
}
