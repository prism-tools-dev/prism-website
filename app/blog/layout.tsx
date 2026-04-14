import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Inheritance, MRO, and Developer Tooling",
  description:
    "Technical writing on method resolution order, dead code detection, C3 linearization, and building real-time VS Code extensions.",
  alternates: { canonical: "https://prism-tools.dev/blog" },
  openGraph: {
    title: "PRISM Blog — Python Inheritance, MRO, and Developer Tooling",
    description:
      "Technical writing on Python method resolution order, dead code detection, and building real-time VS Code extensions.",
    url: "https://prism-tools.dev/blog",
    images: [{ url: "https://prism-tools.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRISM Blog — Python Inheritance, MRO, and Developer Tooling",
    images: ["https://prism-tools.dev/og-image.png"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
