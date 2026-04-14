import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — The Story Behind PRISM",
  description:
    "PRISM was born from a debug session at Uber where deep Python inheritance hierarchies made it impossible to know which method version actually ran. Built by Temilola Olowolayemo.",
  alternates: { canonical: "https://prism-tools.dev/about" },
  openGraph: {
    title: "About PRISM — The Story Behind the Tool",
    description:
      "Born from a debug session at Uber where deep Python inheritance made it impossible to know which method version actually ran.",
    url: "https://prism-tools.dev/about",
    images: [{ url: "https://prism-tools.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About PRISM — The Story Behind the Tool",
    images: ["https://prism-tools.dev/og-image.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
