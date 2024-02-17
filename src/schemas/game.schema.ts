import { TypeOf, object, z } from "zod";
import {
    hostTeamIdField,
    gameTimeField,
    descriptionFieldInGame,
    categoryField,
    dateField,
    levelField,
    regionFieldInTeam,
    genderFieldInTeam,
} from "./fields";

const fields = {
    hostTeamId: z.number().int().optional(),
    gameTime: z.preprocess((arg) => {
        if (typeof arg == "string") {
            return new Date(arg);
        }
        return arg;
    }, z.date()),
    description: z.string(),
};

const body = object({
    ...hostTeamIdField,
    ...gameTimeField,
    ...descriptionFieldInGame,
});

export const createGameSchema = object({
    body: body,
});

export type CreateGameBody = TypeOf<typeof body>;

export const updateGameSchema = object({
    body: body,
});

export type UpdateGameBody = TypeOf<typeof body>;

export const readGame = {
    ...categoryField,
    ...dateField,
};

export const readGameSchema = object({
    query: object({
        ...readGame,
    }),
});

export const readGameFilterGenderSchema = object({
    query: object({
        ...readGame,
        ...genderFieldInTeam,
    }),
});

export const readGameFilterLevelSchema = object({
    query: object({
        ...readGame,
        ...levelField,
    }),
});

export const readGameFilterRegionSchema = object({
    query: object({
        ...readGame,
        ...regionFieldInTeam,
    }),
});
