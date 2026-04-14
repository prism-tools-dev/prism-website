import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAdjacentPosts, getAllSlugs } from "@/data/blog-posts";
import { BlogPostContent } from "./BlogPostContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `https://prism-tools.dev/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      siteName: "PRISM",
      publishedTime: post.date,
      authors: ["Temilola Olowolayemo"],
      tags: post.tags,
      images: [
        {
          url: "https://prism-tools.dev/og-image.png",
          width: 1200,
          height: 630,
          alt: `PRISM — ${post.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["https://prism-tools.dev/og-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  return <BlogPostContent post={post} prev={prev} next={next} />;
}
