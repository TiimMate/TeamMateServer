import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { findGamesByDate, findGamesByGender, findGamesByLevel, findGamesByRegion } from "../daos/games.dao";

export const readGamesByDate = async (query) => {
    return await findGamesByDate(query.date, query.category);
};

export const readGamesByGender = async (query) => {
    return await findGamesByGender(query.date, query.category, query.gender);
};

export const readGamesByLevel = async (query) => {
    return await findGamesByLevel(query.date, query.category, query.skillLevel);
};

export const readGamesByRegion = async (query) => {
    return await findGamesByRegion(query.date, query.category, query.region);
};
