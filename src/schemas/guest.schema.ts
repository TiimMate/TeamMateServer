import { TypeOf, object, z } from "zod";

const fields = {
    teamId: z.number().int().min(1),
    gameTime: z.date(),
    description: z.optional(z.string()),
    recruitCount: z.number().int().min(1),
};

export const createGuesting = object({
    ...fields,
});

export const updateGuesting = object({
    memberIdsToDelete: z.optional(z.array(z.number().int())),
});

export type CreateGuestingSchema = TypeOf<typeof createGuesting>;
export type UpdateGuestingSchema = TypeOf<typeof updateGuesting>;
