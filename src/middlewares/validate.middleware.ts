import { AnyZodObject, ZodError } from "zod";
import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { NextFunction } from "express";

export const validateBody = (schema: AnyZodObject) => (req, res, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (err: any) {
        if (err instanceof ZodError) {
            const detail = err.errors.map((err) => ({
                field: err.path[0],
                description: err.message,
            }));
            throw new BaseError(status.REQUEST_VALIDATION_ERROR, detail);
        }
    }
};

export const validateParams = (schema: AnyZodObject) => (req, res, next: NextFunction) => {
    try {
        schema.parse(req.params);
        next();
    } catch (err: any) {
        if (err instanceof ZodError) {
            const detail = err.errors.map((err) => ({
                field: err.path[0],
                description: err.message,
            }));
            throw new BaseError(status.REQUEST_VALIDATION_ERROR, detail);
        }
    }
};
