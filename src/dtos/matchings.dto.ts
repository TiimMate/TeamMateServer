import { getAgeGroup } from "../constants/age-group.constant";
import { getGender } from "../constants/gender.constant";
import { getLevelById } from "../constants/level.constant";

export const readMatchingGuestingResponseDTO = (guestings) => {
    return guestings.map((guesting) => ({
        gameTime: guesting.gameTime,
        teamName: guesting["Team.name"],
        teamRegion: guesting["Team.region"],
        teamGender: getGender(guesting["Team.gender"]),
        memberCount: guesting.memberCount,
        teamAgeGroup: getAgeGroup(guesting["Team.ageGroup"]),
        teamSkillLevel: getLevelById(guesting["Team.skillLevel"]),
    }));
};
