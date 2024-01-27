// import { BaseError } from "../config/error";
// import { status } from "../config/response.status";
import {
    findGuesting,
    findGuestingByGender,
    // findGuestingByLevel,
    findGuestingByRegion,
} from "../daos/guest.dao";
import { getMemberCountByTeamId } from "../daos/member.dao";
import { readGuestingResponseDTO } from "../dtos/guests.dto";

export const readGuesting = async (query) => {
    const guestings = await findGuesting(query.date, query.category);
    for (const guesting of guestings) {
        guesting.memberCount = (await getMemberCountByTeamId(guesting["Team.id"])) + 1;
    }
    return readGuestingResponseDTO(guestings);
};

export const readGuestingByGender = async (query) => {
    const guestings = await findGuestingByGender(query.date, query.category, query.gender);
    for (const guesting of guestings) {
        guesting.memberCount = (await getMemberCountByTeamId(guesting["Team.id"])) + 1;
    }
    return readGuestingResponseDTO(guestings);
};

// export const readGuestingByLevel = async (query) => {
//     const guestings = await findGuestingByLevel(query.date, query.category, query.skillLevel);
//     for (const guesting of guestings) {
//         guesting.memberCount = (await getMemberCountByTeamId(guesting["Team.id"])) + 1;
//     }
//     return readGuestingResponseDTO(guestings);
// };

export const readGuestingByRegion = async (query) => {
    const guestings = await findGuestingByRegion(query.date, query.category, query.region);
    for (const guesting of guestings) {
        guesting.memberCount = (await getMemberCountByTeamId(guesting["Team.id"])) + 1;
    }
    return readGuestingResponseDTO(guestings);
};
