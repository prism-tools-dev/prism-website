import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — The Story Behind PRISM",
  description:
    "PRISM was born from a debug session at Uber where deep Python inheritance hierarchies made it impossible to know which method version actually ran. Built by Temilola Olowolayemo.",
  alternates: { canonical: "https://prism-tools.dev/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
