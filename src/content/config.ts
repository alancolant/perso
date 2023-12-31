import {defineCollection, z} from 'astro:content';

export const collections = {
    portfolio: defineCollection({
        type: 'content',
        schema: z.object({
            title: z.string(),
            description: z.string(),
            publishDate: z.coerce.date(),
            tags: z.array(z.string()),
            img: z.string(),
            img_alt: z.string().optional(),
            ai: z.boolean().optional(),
            draft: z.boolean().optional(),
        }),
    }),
    articles: defineCollection({
        type: 'content',
        schema: z.object({
            title: z.string(),
            description: z.string(),
            publishDate: z.coerce.date(),
            tags: z.array(z.string()),
            img: z.string(),
            img_alt: z.string().optional(),
            ai: z.boolean().optional(),
            draft: z.boolean().optional(),
        }),
    }),
    "open-source": defineCollection({
        type: 'content',
        schema: z.object({
            title: z.string(),
            project: z.string(),
            draft: z.boolean().optional(),
            tags: z.array(z.string()),

            img: z.string().optional(),
            img_alt: z.string().optional(),
        }),
    }),
};
