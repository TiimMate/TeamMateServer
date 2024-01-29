import { getAgeGroupById } from "../constants/age-group.constant";
import { getGenderById } from "../constants/gender.constant";
import { getLevelById } from "../constants/level.constant";

export const readUserProfileByCategoryResponseDTO = (profile) => {
    return {
        nickname: profile.nickname,
        skillLevel: profile["Profiles.skillLevel"] == null ? null : getLevelById(profile["Profiles.skillLevel"]),
        mannerLevel: profile["Profiles.mannerLevel"] == null ? null : getLevelById(profile["Profiles.mannerLevel"]),
        gender: profile.gender == null ? null : getGenderById(profile.gender),
        ageGroup: profile.ageGroup == null ? null : getAgeGroupById(profile.ageGroup),
        region: profile["Profiles.region"],
        position: profile["Profiles.position"],
        description: profile["Profiles.description"],
    };
};