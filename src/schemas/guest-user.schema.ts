import { TypeOf, object } from "zod";
import { guestIdField, userIdField, statusField } from "./fields";

const body = {
    ...guestIdField,
    ...userIdField,
    ...statusField,
};

const updateGuestUserBody = object({
    ...body,
});

export const updateGuestUserSchema = object({
    body: updateGuestUserBody,
});

export type UpdateGuestUserBody = TypeOf<typeof updateGuestUserBody>;
