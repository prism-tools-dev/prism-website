import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Python Inheritance, MRO, and Developer Tooling",
  description:
    "Technical writing on Python method resolution order, dead code detection, C3 linearization, and building real-time VS Code extensions. From the creator of PRISM.",
  alternates: { canonical: "https://prism-tools.dev/blog" },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
