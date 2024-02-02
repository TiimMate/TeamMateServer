import { TypeOf, object, z } from "zod";
import { mannerScoreField, skillScoreField } from "./fields";

const createTeamReviewBody = object({
    teamMatchId: z.optional(z.number().int()),
    guestMatchId: z.optional(z.number().int()),
    ...skillScoreField,
    ...mannerScoreField,
});

export const createTeamReviewSchema = object({
    body: createTeamReviewBody,
});

export type CreateTeamReviewBody = TypeOf<typeof createTeamReviewBody>;
