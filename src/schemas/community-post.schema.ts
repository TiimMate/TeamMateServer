import { TypeOf, object, z } from "zod";

export const createCommunityPost = object({
    title: z.string().max(30),
    content: z.optional(z.string().max(1000)),
    link: z.optional(z.string().max(200)),
});

export type CreateCommunityPostSchema = TypeOf<typeof createCommunityPost>;
