import { TypeOf, object, z } from "zod";

const fieldsWithoutCategory = {
    logo: z.optional(z.string()),
    name: z.string().max(20),
    description: z.optional(z.string()),
    gender: z.number().int().min(1), //.max(getGendersLength()),
    ageGroup: z.number().int().min(1), //.max(getAgeGroupsLength()),
    region: z.string(),
    gymName: z.string(),
};

const categories = z.enum(["농구", "야구", "테니스", "축구", "풋살", "배구", "볼링", "배드민턴", "탁구"]);

export const category = object({
    category: categories,
});

export const createTeam = object({
    ...fieldsWithoutCategory,
    category: categories,
});

export const updateTeam = object({
    ...fieldsWithoutCategory,
    memberIdsToDelete: z.optional(z.array(z.number().int())),
});

export type CreateTeamSchema = TypeOf<typeof createTeam>;
export type UpdateTeamSchema = TypeOf<typeof updateTeam>;
