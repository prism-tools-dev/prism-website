import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "PRISM — Live Method Resolution Order for VS Code | Python Inheritance Visualizer",
    template: "%s | PRISM",
  },
  description:
    "PRISM shows which version of a method actually runs. Live MRO visualization, dead code detection, and inheritance analysis for Python, TypeScript, Java, C++, Go, and 5 more languages. Sub-200ms. Free VS Code extension.",
  metadataBase: new URL("https://prism-tools.dev"),
  keywords: [
    "PRISM", "prism extension", "prism tools", "prism vscode",
    "python mro", "method resolution order", "python inheritance",
    "inheritance visualization", "dead code detection",
    "python shadowed method", "vscode python extension",
    "class hierarchy", "C3 linearization",
    "python method override", "vscode inheritance",
  ],
  openGraph: {
    title: "PRISM — Know exactly which version of a method actually runs",
    description:
      "Live MRO and inheritance chain visualization for VS Code. Four color-coded method statuses. 10 languages. Sub-200ms. Free.",
    type: "website",
    url: "https://prism-tools.dev",
    siteName: "PRISM",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRISM — Live Method Resolution Order for VS Code",
    description:
      "See which version of a method actually runs. Dead code detection for Python inheritance chains. Free.",
  },
  alternates: {
    canonical: "https://prism-tools.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark")}else if(!t){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "PRISM",
              alternateName: "Program Resolution & Inheritance Shadow Monitor",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Windows, macOS, Linux",
              description:
                "VS Code extension for live method resolution order visualization and dead code detection across Python, TypeScript, Java, C++, Go, and 5 more languages.",
              url: "https://prism-tools.dev",
              downloadUrl:
                "https://marketplace.visualstudio.com/items?itemName=TemilolaOlowolayemo.prism-vscode",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              author: {
                "@type": "Person",
                name: "Temilola Olowolayemo",
                url: "https://linkedin.com/in/temilola-olowolayemo",
              },
              featureList: [
                "Live Method Resolution Order (MRO) visualization",
                "Four method statuses: owns, overrides, overridden, shadowed",
                "Dead code detection for shadowed methods",
                "Interactive mindmap and radial hierarchy views",
                "CodeLens editor annotations",
                "Workspace-wide inheritance scanning",
                "10 language support",
                "Sub-200ms analysis latency",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
