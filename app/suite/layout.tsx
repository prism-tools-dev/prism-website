import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suite — PRISM Tooling Roadmap",
  description:
    "The full PRISM suite: VS Code extension, CLI with pre-commit hooks, PR diff mode, MCP server for AI agents, and upcoming analysis features.",
  alternates: { canonical: "https://prism-tools.dev/suite" },
  openGraph: {
    title: "The PRISM Suite — VS Code, CLI, PR Diffs, AI Agents",
    description:
      "The full PRISM suite: VS Code extension, CLI with pre-commit hooks, PR diff mode, and MCP server for AI agents.",
    url: "https://prism-tools.dev/suite",
    images: [{ url: "https://prism-tools.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The PRISM Suite — VS Code, CLI, PR Diffs, AI Agents",
    images: ["https://prism-tools.dev/og-image.png"],
  },
};

export default function SuiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
