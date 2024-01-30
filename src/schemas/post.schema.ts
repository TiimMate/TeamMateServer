import { TypeOf, object, z } from "zod";
import { contentFieldInPost, linkField, titleField } from "./fields";

export const createPost = object({
    title: z.string().max(30),
    content: z.optional(z.string().max(1000)),
    link: z.optional(z.string().max(200)),
});

const body = object({
    ...titleField,
    ...contentFieldInPost,
    ...linkField,
});

export const createPostSchema = object({
    body: body,
});

export type CreatePostBody = TypeOf<typeof body>;
