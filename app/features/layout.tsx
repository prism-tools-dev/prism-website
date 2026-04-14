import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features — Live MRO, Dead Code Detection, 10 Languages",
  description:
    "Everything PRISM can do: live method resolution order panel, four color-coded statuses, CodeLens annotations, workspace-wide dead code scanning, interactive mindmap and radial views. Python, TypeScript, Java, C++, Go, and more.",
  alternates: { canonical: "https://prism-tools.dev/features" },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
