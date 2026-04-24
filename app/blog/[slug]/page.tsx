import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug, imagePlaceholderBlur } from "@/lib/data";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return blogPosts.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getPostBySlug(slug);
  if (!a) return {};
  return { title: `${a.title} | Expert Habitat` };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getPostBySlug(slug);
  if (!a) notFound();
  return (
    <article
      className={cn(
        "section-padding-y",
        "page-container max-w-3xl",
      )}
    >
      <Link href="/blog" className="text-base font-medium text-brand-pink sm:text-lg">
        ← Tous les articles
      </Link>
      <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl sm:mt-6">
        <Image
          src={a.cover}
          alt=""
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={imagePlaceholderBlur}
        />
      </div>
      <p className="mt-5 text-base text-text-muted-custom sm:text-lg">
        {a.category} · {new Date(a.date).toLocaleDateString("fr-FR", { dateStyle: "long" })} ·{" "}
        {a.readMinutes} min de lecture
      </p>
      <h1 className="mt-3 text-balance font-display text-3xl font-bold text-brand-violet sm:text-4xl">
        {a.title}
      </h1>
      <div className="mt-10 max-w-none whitespace-pre-wrap text-lg leading-[1.75] text-text-primary sm:leading-[1.8]">
        {a.content}
      </div>
    </article>
  );
}
