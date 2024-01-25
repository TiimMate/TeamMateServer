import { getAgeGroupById } from "../constants/age-group.constant";
import { getGenderById } from "../constants/gender.constant";
import { getLevelById } from "../constants/level.constant";

export const readGuestingResponseDTO = (guestings) => {
    return guestings.map((guesting) => ({
        gameTime: guesting.gameTime,
        teamName: guesting["Team.name"],
        teamRegion: guesting["Team.region"],
        teamGender: getGenderById(guesting["Team.gender"]),
        memberCount: guesting.memberCount,
        teamAgeGroup: getAgeGroupById(guesting["Team.ageGroup"]),
        teamSkillLevel: getLevelById(guesting["Team.skillLevel"]),
        recruitCount: guesting.recruitCount,
    }));
};
