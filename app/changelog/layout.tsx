import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — PRISM Version History",
  description:
    "Release history for PRISM VS Code extension. From v0.1.0 (Python MRO) through v0.4.0 (10 languages, graph views, workspace scanning).",
  alternates: { canonical: "https://prism-tools.dev/changelog" },
  openGraph: {
    title: "PRISM Changelog — Version History",
    description:
      "Release history from v0.1.0 (Python MRO) through v0.4.0 (10 languages, graph views, workspace scanning).",
    url: "https://prism-tools.dev/changelog",
    images: [{ url: "https://prism-tools.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRISM Changelog — Version History",
    images: ["https://prism-tools.dev/og-image.png"],
  },
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
