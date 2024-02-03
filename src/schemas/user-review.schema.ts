import { TypeOf, object } from "zod";
import { guestMatchIdFieldInUserReview, mannerScoreField, skillScoreField } from "./fields";

const createUserReviewBody = object({
    ...guestMatchIdFieldInUserReview,
    ...skillScoreField,
    ...mannerScoreField,
});

export const createTeamReviewSchema = object({
    body: createUserReviewBody,
});

export type CreateUserReviewBody = TypeOf<typeof createUserReviewBody>;
