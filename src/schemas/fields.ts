import { object, z } from "zod";
import { Gender } from "../types/gender.enum";
import { Category } from "../types/category.enum";
import { AgeGroup } from "../types/age-group.enum";

export const nicknameField = { nickname: z.string().max(10) };

export const descriptionField = { description: z.optional(z.string().max(400)) };

export const genderFieldInUser = { gender: z.optional(z.enum([Gender.Female, Gender.Male])) };

export const genderFieldInTeam = { gender: z.enum([Gender.Female, Gender.Male, Gender.Mixed]) };

const ageGroup = z.enum([
    AgeGroup.Teenagers,
    AgeGroup.Twenties,
    AgeGroup.Thirties,
    AgeGroup.Forties,
    AgeGroup.FiftiesAndAbove,
]);

export const ageGroupFieldInUser = { ageGroup: z.optional(ageGroup) };

export const ageGroupFieldInTeam = { ageGroup: ageGroup };

export const heightField = { height: z.optional(z.number().int()) };

export const regionFieldInProfile = { region: z.optional(z.string()) };

export const regionFieldInTeam = { region: z.string() };

export const positionField = { position: z.optional(z.string()) }; //TODO: 추후 enum으로 변경

export const categoryField = {
    category: z.enum([
        Category.Basketball,
        Category.Baseball,
        Category.Tennis,
        Category.Soccer,
        Category.Futsal,
        Category.Volleyball,
        Category.Bowling,
        Category.Badminton,
        Category.TableTennis,
    ]),
};

export const logoField = { logo: z.optional(z.string().max(200)) };

export const nameField = { name: z.string().max(20) };

export const gymNameField = { gymName: z.string().max(100) };

export const memberIdsToDeleteField = { memberIdsToDelete: z.optional(z.array(z.number().int())) };

export const categoryParam = object({
    params: object({
        ...categoryField,
    }),
});
