import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground — Try PRISM Live in Your Browser",
  description:
    "Interactive demo of PRISM's MRO analysis. Click through an inheritance hierarchy and see method resolution and status classification live.",
  alternates: { canonical: "https://prism-tools.dev/playground" },
  openGraph: {
    title: "PRISM Playground — Try Live MRO Analysis in Your Browser",
    description:
      "Interactive demo: click through a Python inheritance hierarchy and see method resolution and status classification in real time.",
    url: "https://prism-tools.dev/playground",
    images: [{ url: "https://prism-tools.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRISM Playground — Try Live MRO Analysis in Your Browser",
    images: ["https://prism-tools.dev/og-image.png"],
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
