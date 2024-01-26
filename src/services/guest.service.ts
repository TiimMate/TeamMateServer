// import { BaseError } from "../config/error";
// import { status } from "../config/response.status";
import { findGuesting } from "../daos/guest.dao";
import { getMemberCountByTeamId } from "../daos/member.dao";
import { readGuestingResponseDTO } from "../dtos/guests.dto";

export const readGuesting = async (query) => {
    const guestings = await findGuesting(query.date, query.category);
    for (const guesting of guestings) {
        guesting.memberCount = (await getMemberCountByTeamId(guesting["Team.id"])) + 1;
    }
    return readGuestingResponseDTO(guestings);
};

// export const readGuestingByGender = async (selectedDate, query) => {
//     return await findGuestingByGender(selectedDate, query.category, query.gender);
// };

// export const readGuestingByLevel = async (selectedDate, query) => {
//     return await findGuestingByLevel(selectedDate, query.category, query.level);
// };

// export const readGuestingByRegion = async (selectedDate, query) => {
//     return await findGuestingByRegion(selectedDate, query.category, query.region);
// };
