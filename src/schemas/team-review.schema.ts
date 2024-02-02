import { TypeOf, object, z } from "zod";
import { mannerScoreField, skillScoreField } from "./fields";

const createTeamReviewBody = object({
    team_match_id: z.optional(z.number().int()),
    guest_match_id: z.optional(z.number().int()),
    ...skillScoreField,
    ...mannerScoreField,
});

export const createTeamReviewSchema = object({
    body: createTeamReviewBody,
});

export type CreateTeamReviewBody = TypeOf<typeof createTeamReviewBody>;
