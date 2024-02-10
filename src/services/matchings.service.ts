import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { getApplyGuestingUser, getGuestUserById, setGuestUserStatus } from "../daos/guest-user.dao";
import {
    findGamesOfMatchingGuesting,
    findGuestsOfMatchingHosting,
    findGuestsOfMatchingGuesting,
    findGamesOfMatchingHosting,
    getTeamsAppliedById,
} from "../daos/matching.dao";
import { getMemberCountByTeamId, addMemberCount } from "../daos/member.dao";
import { getTeamIdByLeaderId } from "../daos/team.dao";
import {
    readApplyGuestingUserResponseDTO,
    readMatchingResponseDTO,
    readHostingApplicantsTeamResponseDTO,
} from "../dtos/matchings.dto";

export const readMatchingGuesting = async (userId, query) => {
    const teamId = await getTeamIdByLeaderId(userId);
    const matchingGuestings = await findGuestsOfMatchingGuesting(teamId, query.date);
    await addMemberCount(matchingGuestings);

    const matchingGames = await findGamesOfMatchingGuesting(userId, query.date);
    await addMemberCount(matchingGames);

    const guestingResponseDTO = readMatchingResponseDTO(matchingGuestings);
    const gameResponseDTO = readMatchingResponseDTO(matchingGames);

    const matchingGuesting = [guestingResponseDTO, gameResponseDTO].sort((a, b) =>
        a.gameTime.localeCompare(b.gameTime),
    );
    return matchingGuesting;
};

export const readMatchingHosting = async (userId, query) => {
    const teamId = await getTeamIdByLeaderId(userId);
    const matchingGuestings = await findGuestsOfMatchingHosting(teamId, query.date);
    await addMemberCount(matchingGuestings);

    const matchingGames = await findGamesOfMatchingHosting(teamId, query.date);
    await addMemberCount(matchingGames);

    const guestingResponseDTO = readMatchingResponseDTO(matchingGuestings);
    const gameResponseDTO = readMatchingResponseDTO(matchingGames);

    const matchingHosting = [guestingResponseDTO, gameResponseDTO].sort((a, b) => a.gameTime.localeCompare(b.gameTime));
    return matchingHosting;
};

export const readApplyGuestingUser = async (params) => {
    const guestingId = params.guestingId;
    const applyGuestingUser = await getApplyGuestingUser(guestingId);

    return readApplyGuestingUserResponseDTO(applyGuestingUser);
};

export const updateGuestStatus = async (params) => {
    const guestUserId = params.guestUserId;
    const guestUser = await getGuestUserById(guestUserId);
    if (!guestUser) {
        throw new BaseError(status.GUESTUSER_NOT_FOUND);
    }
    await setGuestUserStatus(guestUser);
    return;
};

export const readHostingApplicantsTeamList = async (userId, params) => {
    const gameId = params.gameId;
    const teamsApplied = await getTeamsAppliedById(gameId);
    for (const team of teamsApplied) {
        team.memberCount = await getMemberCountByTeamId(team);
    }

    return readHostingApplicantsTeamResponseDTO(teamsApplied);
};
