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
