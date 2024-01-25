import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { findGamesByDate, findGamesByGender, findGamesByLevel, findGamesByRegion } from "../daos/games.dao";

export const readGamesByDate = async (selectedDate, query) => {
    return await findGamesByDate(selectedDate, query.category);
};

export const readGamesByGender = async (userId, query) => {
    return await findGamesByGender(userId, query.category, query.gender);
};

export const readGamesByLevel = async (userId, query) => {
    return await findGamesByLevel(userId, query.category, query.level);
};

export const readGamesByRegion = async (userId, query) => {
    return await findGamesByRegion(userId, query.category, query.region);
};
