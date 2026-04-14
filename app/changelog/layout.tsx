import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — PRISM Version History",
  description:
    "Release history for PRISM VS Code extension. From v0.1.0 (Python MRO) through v0.4.0 (10 languages, graph views, workspace scanning).",
  alternates: { canonical: "https://prism-tools.dev/changelog" },
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
