import { TypeOf, object } from "zod";
import {
    contentFieldInPost,
    linkField,
    titleField,
    rentDateField,
    rentPlaceField,
    rentMapValueField,
    rentStatusField,
} from "./fields";

const body = {
    ...titleField,
    ...contentFieldInPost,
    ...linkField,
    ...rentDateField,
    ...rentPlaceField,
    ...rentMapValueField,
};

export const createPostBody = object({
    ...body,
});

export const createPostSchema = object({
    body: createPostBody,
});

export type CreatePostBody = TypeOf<typeof createPostBody>;

const updatePostBody = object({
    ...body,
    ...rentStatusField,
});

export const updatePostSchema = object({
    body: updatePostBody,
});

export type UpdatePostBody = TypeOf<typeof updatePostBody>;
