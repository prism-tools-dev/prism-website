import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground — Try PRISM Live in Your Browser",
  description:
    "Interactive demo of PRISM's MRO analysis. Click through a Python inheritance hierarchy and see method resolution, status classification, and graph visualization in real time.",
  alternates: { canonical: "https://prism-tools.dev/playground" },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
