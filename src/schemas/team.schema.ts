import { TypeOf, object, z } from "zod";
import {
    ageGroupFieldInTeam,
    categoryField,
    descriptionField,
    genderFieldInTeam,
    gymNameField,
    logoField,
    memberIdsToDeleteField,
    nameField,
    regionFieldInTeam,
} from "./fields";

const commonFields = {
    ...logoField,
    ...nameField,
    ...descriptionField,
    ...genderFieldInTeam,
    ...ageGroupFieldInTeam,
    ...regionFieldInTeam,
    ...gymNameField,
};

const createTeamBody = object({
    ...commonFields,
    ...categoryField,
});

const updateTeamBody = object({
    ...commonFields,
    ...memberIdsToDeleteField,
});

const updateTeamBodyWithoutMemberIdsToDelete = object({
    ...commonFields,
});

export const createTeamSchema = object({
    body: createTeamBody,
});

export const updateTeamSchema = object({
    body: updateTeamBody,
});

export type CreateTeamBody = TypeOf<typeof createTeamBody>;
export type UpdateTeamBody = TypeOf<typeof updateTeamBody>;
export type UpdateTeamBodyWithoutMemberIdsToDelete = TypeOf<typeof updateTeamBodyWithoutMemberIdsToDelete>;
