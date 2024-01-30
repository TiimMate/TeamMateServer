import { getAgeGroup } from "../constants/age-group.constant";
import { getGender } from "../constants/gender.constant";
import { getLevelById } from "../constants/level.constant";

export const readMatchingGuestingResponseDTO = (matchings) => {
    return matchings.map((matching) => ({
        gameTime: matching.gameTime,
        teamName: matching["Team.name"],
        teamRegion: matching["Team.region"],
        teamGender: getGender(matching["Team.gender"]),
        memberCount: matching.memberCount,
        teamAgeGroup: getAgeGroup(matching["Team.ageGroup"]),
        teamSkillLevel: getLevelById(matching["Team.skillLevel"]),
    }));
};
