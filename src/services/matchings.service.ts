import {
    // findGamesOfMatchingGuesting,
    findGuestsOfMatchingHosting,
    findGuestsOfMatchingGuesting,
    findGamesOfMatchingHosting,
    getApplyGuestingUser,
} from "../daos/matchings.dao";
import { getMemberCountByTeamId } from "../daos/member.dao";
import { readApplyGuestingUserResponseDTO, readMatchingResponseDTO } from "../dtos/matchings.dto";

export const readMatchingGuesting = async (userId, query) => {
    const matchingGuestings = await findGuestsOfMatchingGuesting(userId, query.date);
    for (const matchingGuesting of matchingGuestings) {
        matchingGuesting.memberCount = (await getMemberCountByTeamId(matchingGuesting["Team.id"])) + 1;
    }

    // const matchingGames = await findGamesOfMatchingGuesting(userId, query.date);
    // for (const matchingGame of matchingGames) {
    //     matchingGames.memberCount = (await getMemberCountByTeamId(matchingGame["Team.id"])) + 1;
    // }

    const guestingResponseDTO = readMatchingResponseDTO(matchingGuestings);
    // const gameResponseDTO = readMatchingResponseDTO(matchingGames);

    // return { guesting: guestingResponseDTO, game: gameResponseDTO };
};

export const readMatchingHosting = async (userId, query) => {
    const matchingGuestings = await findGuestsOfMatchingHosting(userId, query.date);
    for (const matchingGuesting of matchingGuestings) {
        matchingGuesting.memberCount = (await getMemberCountByTeamId(matchingGuesting["Team.id"])) + 1;
    }

    const matchingGames = await findGamesOfMatchingHosting(userId, query.date);
    for (const matchingGame of matchingGames) {
        matchingGame.memberCount = (await getMemberCountByTeamId(matchingGame["Team.id"])) + 1;
    }

    const guestingResponseDTO = readMatchingResponseDTO(matchingGuestings);
    const gameResponseDTO = readMatchingResponseDTO(matchingGames);

    return { guesting: guestingResponseDTO, game: gameResponseDTO };
};

export const readApplyGuestingUser = async (params) => {
    const guestingId = params.guestingId;
    const applyGuestingUser = await getApplyGuestingUser(guestingId);

    return readApplyGuestingUserResponseDTO(applyGuestingUser);
};
