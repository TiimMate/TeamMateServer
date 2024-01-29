import { TypeOf, object, z } from "zod";

const fields = {
    hostTeamId: z.number().int().optional(),
    // 본인이 리더인 팀이 하나인 경우는 바로 들어가겠지만, 여러 개이면 선택하여 들어갈 듯..?
    // applyTeamId: z.number().int().min(1),
    // opposingTeamId: z.number().int().min(1),
    gameTime: z.preprocess((arg) => {
        if (typeof arg == "string") {
            return new Date(arg);
        }
        return arg;
    }, z.date()),

    // category: z.string(),
    description: z.string(),
    // status: z.number().int().min(0),
};

export const createGame = object({
    ...fields,
});

export const updateGame = object({
    memberIdsToDelete: z.optional(z.array(z.number().int())),
});

export type CreateGameSchema = TypeOf<typeof createGame>;
export type updateGameSchema = TypeOf<typeof updateGame>;
