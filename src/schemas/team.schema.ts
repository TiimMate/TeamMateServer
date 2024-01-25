import { TypeOf, object, z } from "zod";
import { getGendersLength } from "../constants/gender.constant";
import { getAgeGroupsLength } from "../constants/age-group.constant";

const categories = z.enum(["농구", "야구", "테니스", "축구", "풋살", "배구", "볼링", "배드민턴", "탁구"]);

export const createTeam = object({
    logo: z.optional(z.string()),
    name: z.string().max(20),
    description: z.optional(z.string()),
    gender: z.number().int().min(1).max(getGendersLength()),
    ageGroup: z.number().int().min(1).max(getAgeGroupsLength()),
    region: z.string(),
    gymName: z.string(),
    category: categories,
});

export type CreateTeamSchema = TypeOf<typeof createTeam>;
