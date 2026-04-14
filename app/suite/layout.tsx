import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suite — PRISM Tooling Roadmap",
  description:
    "The full PRISM suite: VS Code extension, CLI with pre-commit hooks, PR diff mode, MCP server for AI agents, and upcoming analysis features.",
  alternates: { canonical: "https://prism-tools.dev/suite" },
};

export default function SuiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
