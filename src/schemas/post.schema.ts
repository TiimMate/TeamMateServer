import { TypeOf, object } from "zod";
import { contentFieldInPost, linkField, titleField } from "./fields";

const body = object({
    ...titleField,
    ...contentFieldInPost,
    ...linkField,
});

export const createPostSchema = object({
    body: body,
});

export type CreatePostBody = TypeOf<typeof body>;
