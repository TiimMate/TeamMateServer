import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { findGameByTeamsAndGameTime } from "../daos/game.dao";
import { getApplyGuestingUser, getGuestUserById, setGuestUserStatus } from "../daos/guest-user.dao";
import { findGuestingByTeamsAndGameTime } from "../daos/guest.dao";
import { findGamesOfMatchingGuesting, findGuestsOfMatchingGuesting, getTeamsAppliedById } from "../daos/matching.dao";
import { getMemberCountByTeamId, addMemberCount } from "../daos/member.dao";
import { findTeamIdByLeaderId, getTeamIdByLeaderId } from "../daos/team.dao";
import {
    readApplyGuestingUserResponseDTO,
    readMatchingResponseDTO,
    readHostingApplicantsTeamResponseDTO,
    readMatchingHostingResponseDTO,
} from "../dtos/matchings.dto";

export const readMatchingGuesting = async (userId, query) => {
    const teamId = await getTeamIdByLeaderId(userId);
    const matchingGuestings = await findGuestsOfMatchingGuesting(teamId, query.date);
    await addMemberCount(matchingGuestings);
    const matchingGames = await findGamesOfMatchingGuesting(teamId, query.date);
    await addMemberCount(matchingGames);

    const guestingResponseDTO = readMatchingResponseDTO(matchingGuestings);
    const gameResponseDTO = readMatchingResponseDTO(matchingGames);

    const matchingGuesting = [...guestingResponseDTO.matchings, ...gameResponseDTO.matchings].sort(
        (a, b) => new Date(a.gameTime).getTime() - new Date(b.gameTime).getTime(),
    );

    return matchingGuesting;
};

export const readMatchingHosting = async (userId: number, query) => {
    const gameTime = query.date;
    const teamIds = await findTeamIdByLeaderId(userId);

    const matchingGuestings = await findGuestingByTeamsAndGameTime(teamIds, gameTime);
    const matchingGames = await findGameByTeamsAndGameTime(teamIds, gameTime);
    return readMatchingHostingResponseDTO(matchingGuestings, matchingGames);
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
