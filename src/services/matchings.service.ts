import { findGuestsOfMatchingGuesting, findGuestsOfMatchingHosting } from "../daos/matchings.dao";
import { getMemberCountByTeamId } from "../daos/member.dao";
import { readMatchingGuestingResponseDTO } from "../dtos/matchings.dto";

export const readMatchingGuesting = async (userId, query) => {
    const matchingGuestings = await findGuestsOfMatchingGuesting(userId, query.date);
    for (const matchingGuesting of matchingGuestings) {
        matchingGuestings.memberCount = (await getMemberCountByTeamId(matchingGuesting["Team.id"])) + 1;
    }

    // const matchingGames = await findGamesOfMatchingGuesting(userId, query.date);
    // for (const matchingGame of matchingGames) {
    //     matchingGames.memberCount = (await getMemberCountByTeamId(matchingGame["HostTeam.id"])) + 1;
    // }

    return readMatchingGuestingResponseDTO(matchingGuestings);
};

export const readMatchingHosting = async (userId, query) => {
    const matchingHostings = await findGuestsOfMatchingHosting(userId, query.date);
    for (const matchingHosting of matchingHostings) {
        matchingHostings.memberCount = (await getMemberCountByTeamId(matchingHosting["Team.id"])) + 1;
    }

    // const matchingGames = await findGamesOfMatchingGuesting(userId, query.date);
    // for (const matchingGame of matchingGames) {
    //     matchingGames.memberCount = (await getMemberCountByTeamId(matchingGame["HostTeam.id"])) + 1;
    // }

    return readMatchingGuestingResponseDTO(matchingHostings);
};
