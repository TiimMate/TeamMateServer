import { getAgeGroup } from "../constants/age-group.constant";
import { getTeamGender } from "../constants/gender.constant";
import { getGuestStatus } from "../constants/guest-status.constant";
import { getLevelById } from "../constants/level.constant";
import { AgeGroup } from "../types/age-group.enum";
import { Gender } from "../types/gender.enum";

interface ReadMatching {
    gameTime: string;
    memberCount: number | null;
    type: string;
    Team: {
        name: string;
        region: string | null;
        gender: Gender;
        ageGroup: AgeGroup;
        skillLevel: number;
    };
}

interface ReadGuestingUser {
    status: number;
    User: {
        nickname: string;
        height: number | null;
    };
}

export const readMatchingResponseDTO = (matching: ReadMatching) => {
    return {
        gameTime: matching.gameTime,
        teamName: matching["Team.name"],
        teamRegion: matching["Team.region"],
        teamGender: getTeamGender(matching["Team.gender"]),
        memberCount: matching.memberCount,
        teamAgeGroup: getAgeGroup(matching["Team.ageGroup"]),
        teamSkillLevel: getLevelById(matching["Team.skillLevel"]),
        type: matching.type,
    };
};

export const readApplyGuestingUserResponseDTO = (guestingUsers: ReadGuestingUser) => {
    return {
        nickname: guestingUsers["User.nickname"],
        height: guestingUsers["User.height"],
        status: getGuestStatus(guestingUsers.status),
    };
};
