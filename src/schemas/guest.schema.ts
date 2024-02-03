import { TypeOf, object } from "zod";
import { teamIdField, gameTimeField, descriptionField, recruitCountField } from "./fields";

const body = {
    ...teamIdField,
    ...gameTimeField,
    ...descriptionField,
    ...recruitCountField,
};

const createGuestBody = object({
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

export type CreateGuestingBody = TypeOf<typeof createGuestBody>;
export type UpdateGuestingBody = TypeOf<typeof updateGuestBody>;
