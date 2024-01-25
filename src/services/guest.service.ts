import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { findGuesting, findGuestingByGender, findGuestingByLevel, findGuestingByRegion } from "../daos/guest.dao";

export const readGuesting = async (query) => {
    return await findGuesting(query.date, query.category);
};

export const readGuestingByGender = async (selectedDate, query) => {
    return await findGuestingByGender(selectedDate, query.category, query.gender);
};

export const readGuestingByLevel = async (selectedDate, query) => {
    return await findGuestingByLevel(selectedDate, query.category, query.level);
};

export const readGuestingByRegion = async (selectedDate, query) => {
    return await findGuestingByRegion(selectedDate, query.category, query.region);
};
