import { TypeOf, object, z } from "zod";

export const createCommunityComment = object({
    content: z.string().max(500),
});

export type CreateCommunityCommentSchema = TypeOf<typeof createCommunityComment>;
