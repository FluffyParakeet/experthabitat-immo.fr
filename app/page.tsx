import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { PropertyGallerySection } from "@/components/sections/property-gallery-section";
import { getPublishedPropertiesForHome } from "@/lib/data";

const AboutSection = dynamic(() =>
  import("@/components/sections/about-section").then((m) => m.AboutSection),
);
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/testimonials-section").then((m) => m.TestimonialsSection),
);
const EstimationCtaSection = dynamic(() =>
  import("@/components/sections/estimation-cta-section").then((m) => m.EstimationCtaSection),
);
const BlogSection = dynamic(() =>
  import("@/components/sections/blog-section").then((m) => m.BlogSection),
);

const HOME_GALLERY_LIMIT = 8;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const galleryProperties = await getPublishedPropertiesForHome(HOME_GALLERY_LIMIT);
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PropertyGallerySection items={galleryProperties} />
      <AboutSection />
      <TestimonialsSection />
      <EstimationCtaSection />
      <BlogSection />
    </>
  );
}
