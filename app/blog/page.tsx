import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts, imagePlaceholderBlur } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Conseils immobiliers | Expert Habitat",
  description: "Articles vente, achat, investissement sur la Métropole lilloise.",
};

export const revalidate = 3600;

export default function BlogListPage() {
  return (
    <div className="bg-gray-soft/40 section-padding-y">
      <div className={cn("page-container", "max-w-5xl")}>
        <h1 className="font-display text-3xl font-bold text-brand-violet sm:text-4xl">
          Actualités & conseils
        </h1>
        <div className="mt-12 space-y-8 sm:mt-14 sm:space-y-10">
          {blogPosts.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm sm:flex-row"
            >
              <div className="relative h-48 w-full shrink-0 sm:w-64">
                <Image
                  src={a.cover}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 256px"
                  placeholder="blur"
                  blurDataURL={imagePlaceholderBlur}
                />
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-sm text-text-muted-custom sm:text-base">
                  {a.category} · {a.readMinutes} min
                </p>
                <h2 className="mt-2 font-display text-xl font-bold text-brand-violet group-hover:text-brand-pink sm:text-2xl">
                  {a.title}
                </h2>
                <p className="mt-2 text-base text-text-muted-custom sm:text-lg">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
