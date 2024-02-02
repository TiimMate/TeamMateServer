import { TypeOf, object, z } from "zod";
import { mannerScoreField, skillScoreField } from "./fields";

const createTeamReviewBody = object({
    guest_match_id: z.number().int(),
    ...skillScoreField,
    ...mannerScoreField,
});

export const createTeamReviewSchema = object({
    body: createTeamReviewBody,
});

export type CreateTeamReviewBody = TypeOf<typeof createTeamReviewBody>;
