import { z } from 'zod';

/**
 * Blog post metadata schema
 * Validates all required and optional fields for blog posts
 */
export const BlogMetadataSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must be less than 200 characters'),
  
  slug: z.string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  
  date: z.string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      'Date must be a valid ISO date string (YYYY-MM-DD)'
    ),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  
  tags: z.array(z.string().min(1))
    .min(1, 'At least one tag is required')
    .max(10, 'Maximum 10 tags allowed'),
  
  coverImage: z.string()
    .url('Cover image must be a valid URL')
    .optional()
    .or(z.string().startsWith('/', 'Cover image must be a valid path')),
  
  readingTime: z.number()
    .int()
    .positive('Reading time must be positive')
    .optional()
    .default(5),
  
  featured: z.boolean().optional().default(false),
  
  published: z.boolean().optional().default(true),
  
  updated: z.string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      'Updated date must be a valid ISO date string'
    )
    .optional()
});

/**
 * Type inference from schema
 */
export type BlogMetadata = z.infer<typeof BlogMetadataSchema>;

/**
 * Extended blog post type including computed fields
 */
export interface BlogPost extends BlogMetadata {
  slug: string;
}

/**
 * Validate blog metadata with error collection
 * @param data - Raw metadata object
 * @param slug - Slug for error context
 * @returns Validated metadata or throws with detailed errors
 */
export function validateBlogMetadata(
  data: unknown,
  slug: string
): BlogMetadata {
  try {
    return BlogMetadataSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join('; ');
      throw new Error(`Blog post "${slug}" has invalid metadata:\n${issues}`);
    }
    throw error;
  }
}

/**
 * Safely validate multiple posts, collecting errors
 * @param posts - Array of raw post objects with slugs
 * @returns Object with validated posts and errors
 */
export function validateBlogPosts(
  posts: Array<{ slug: string; metadata: unknown }>
): {
  valid: BlogPost[];
  errors: Array<{ slug: string; error: string }>;
} {
  const valid: BlogPost[] = [];
  const errors: Array<{ slug: string; error: string }> = [];

  for (const { slug, metadata } of posts) {
    try {
      const validated = validateBlogMetadata(metadata, slug);
      valid.push({ ...validated, slug });
    } catch (error) {
      errors.push({
        slug,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  return { valid, errors };
}
