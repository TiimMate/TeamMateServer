import { getAgeGroup } from "../constants/age-group.constant";
import { getTeamGender } from "../constants/gender.constant";
import { getGuestStatus } from "../constants/guest-status.constant";
import { getLevelById } from "../constants/level.constant";

export const readMatchingResponseDTO = (result) => {
    return {
        matchings: result.map((matching) => ({
            gameTime: matching.gameTime,
            teamName: matching["Team.name"],
            teamRegion: matching["Team.region"],
            teamGender: getTeamGender(matching["Team.gender"]),
            memberCount: matching.memberCount,
            teamAgeGroup: getAgeGroup(matching["Team.ageGroup"]),
            teamSkillLevel: getLevelById(matching["Team.skillLevel"]),
            type: matching.type,
        })),
    };
};

export const readApplyGuestingUserResponseDTO = (result) => {
    return result.map((guestingUser) => ({
        nickname: guestingUser["User.nickname"],
        height: guestingUser["User.height"],
        position: guestingUser["User.Profiles.position"],
        status: getGuestStatus(guestingUser.status),
    }));
};

export const readHostingApplicantsTeamResponseDTO = (teams) => {
    return teams.map((team) => ({
        teamId: team["Team.id"],
        teamLogo: team["Team.logo"],
        teamName: team["Team.name"],
        memberCount: team.memberCount,
    }));
};

export const readMatchingHostingResponseDTO = (guestings, games) => {
    const sortedMatch = [...guestings, ...games].sort((a, b) => a.gameTime.getTime() - b.gameTime.getTime());
    return sortedMatch.map((match) => {
        if (match.type === "guest") {
            return {
                type: match.type,
                matchId: match.id,
                gameTime: match.gameTime,
                name: match["Team.name"],
                region: match["Team.region"],
                gender: getTeamGender(match["Team.gender"]),
                memberCount: match.memberCount,
                ageGroup: getAgeGroup(match["Team.ageGroup"]),
                skillLevel: getLevelById(match["Team.skillLevel"]),
            };
        } else {
            return {
                type: match.type,
                matchId: match.id,
                gameTime: match.gameTime,
                name: match["HostTeam.name"],
                region: match["HostTeam.region"],
                gender: getTeamGender(match["HostTeam.gender"]),
                memberCount: match.memberCount,
                ageGroup: getAgeGroup(match["HostTeam.ageGroup"]),
                skillLevel: getLevelById(match["HostTeam.skillLevel"]),
            };
        }
    });
};
