import { TypeOf, object } from "zod";
import {
    teamIdField,
    gameTimeField,
    descriptionField,
    recruitCountField,
    categoryField,
    dateField,
    levelField,
    regionFieldInTeam,
    genderFieldInTeam,
} from "./fields";

const body = {
    ...gameTimeField,
    ...descriptionField,
    ...recruitCountField,
};

const createGuestBody = object({
    ...teamIdField,
    ...body,
});

const updateGuestBody = object({
    ...body,
});

export const createGuestingSchema = object({
    body: createGuestBody,
});

export const updateGuestingSchema = object({
    body: updateGuestBody,
});

const readGuest = {
    ...categoryField,
    ...dateField,
};

export const readGuestSchema = object({
    query: object({
        ...readGuest,
        ...dateField,
    }),
});

export const readGuestFilterGenderSchema = object({
    query: object({
        ...readGuest,
        ...genderFieldInTeam,
    }),
});

export const readGuestFilterLevelSchema = object({
    query: object({
        ...readGuest,
        ...levelField,
    }),
});

export const readGuestFilterRegionSchema = object({
    query: object({
        ...readGuest,
        ...regionFieldInTeam,
    }),
});

export const addGuestUserSchema = object({
    query: object({
        ...categoryField,
    }),
});

export type CreateGuestingBody = TypeOf<typeof createGuestBody>;
export type UpdateGuestingBody = TypeOf<typeof updateGuestBody>;
