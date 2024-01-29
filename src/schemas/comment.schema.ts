import { TypeOf, object, z } from "zod";

export const createComment = object({
    content: z.string().max(500),
});

export type CreateCommentSchema = TypeOf<typeof createComment>;
