import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features — Live MRO, Dead Code Detection, 10 Languages",
  description:
    "Everything PRISM can do: live method resolution order panel, four color-coded statuses, CodeLens annotations, workspace-wide dead code scanning, interactive mindmap and radial views. Python, TypeScript, Java, C++, Go, and more.",
  alternates: { canonical: "https://prism-tools.dev/features" },
  openGraph: {
    title: "PRISM Features — Live MRO, Dead Code Detection, 10 Languages",
    description:
      "Everything PRISM can do: live MRO panel, four color-coded statuses, CodeLens, dead code scanning, mindmap and radial views.",
    url: "https://prism-tools.dev/features",
    images: [{ url: "https://prism-tools.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRISM Features — Live MRO, Dead Code Detection, 10 Languages",
    images: ["https://prism-tools.dev/og-image.png"],
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
