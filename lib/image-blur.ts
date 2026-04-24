/** Placeholder 10×10 blur pour `placeholder="blur"` (next/image). */
export const imagePlaceholderBlur =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

const U = (path: string, extra = "w=900&h=600&fit=crop&q=80&auto=format") =>
  `https://images.unsplash.com/photo-${path}?${extra}`;

/** URLs Unsplash valides, variantes poids (recadrage différé) pour différencier visuellement les fiches. */
export const unSplash = {
  villa: U("1564013799919-ab600027ffc6", "w=920&h=650&fit=crop&q=82&auto=format&fm=webp"),
  modern: U("1600585154340-be6161a56a0c", "w=900&h=650&fit=crop&q=82&auto=format&fm=webp&crop=entropy"),
  interieur: U("1416339306562-f3d12fefd36f", "w=900&h=700&fit=crop&q=82&auto=format&fm=webp"),
  villa2: U("1564013799919-ab600027ffc6", "w=1100&h=700&fit=crop&q=80&auto=format&fm=webp&crop=faces"),
  modern2: U("1600585154340-be6161a56a0c", "w=1000&h=680&fit=crop&q=80&auto=format&fm=webp&crop=edges"),
  interieur2: U("1416339306562-f3d12fefd36f", "w=950&h=640&fit=crop&q=80&auto=format&fm=webp"),
} as const;
