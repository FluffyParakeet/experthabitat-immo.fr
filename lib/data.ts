import { blogPosts, getPostBySlug } from "./data-blog";
import { imagePlaceholderBlur } from "./image-blur";
import { columnTestimonials, testimonials } from "./data-testimonials";
import { getPropertyBySlug, getPublishedProperties } from "./property-db";
import type {
  BlogCategory,
  BlogPost,
  Property,
  PropertyBadge,
  Testimonial,
} from "./types";
import { SECTEURS, legal, siteContact } from "./types";

export {
  blogPosts,
  getPostBySlug,
  imagePlaceholderBlur,
  getPublishedProperties,
  getPropertyBySlug,
  columnTestimonials,
  testimonials,
  SECTEURS,
  siteContact,
  legal,
};

export type { BlogPost, BlogCategory, Property, Testimonial, PropertyBadge };
