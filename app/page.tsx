import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { PropertyGallerySection } from "@/components/sections/property-gallery-section";
import { AboutSection } from "@/components/sections/about-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { EstimationCtaSection } from "@/components/sections/estimation-cta-section";
import { BlogSection } from "@/components/sections/blog-section";
import { getPublishedProperties } from "@/lib/data";

export default async function Home() {
  const galleryProperties = await getPublishedProperties();
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
