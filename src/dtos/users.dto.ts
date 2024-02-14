import { getAgeGroup } from "../constants/age-group.constant";
import { getGender } from "../constants/gender.constant";
import { AgeGroup } from "../types/age-group.enum";
import { Gender } from "../types/gender.enum";

interface ReadUserProfile {
    nickname: string;
    gender: Exclude<Gender, Gender.Mixed> | null;
    ageGroup: AgeGroup | null;
    Profiles: {
        skillLevel: number;
        mannerLevel: number;
        region: string | null;
        position: string | null;
        description: string | null;
    };
}

export const readUserProfileResponseDTO = (profile: ReadUserProfile) => {
    return {
        nickname: profile.nickname,
        skillLevel: !profile["Profiles.skillLevel"] ? null : profile["Profiles.skillLevel"],
        mannerLevel: !profile["Profiles.mannerLevel"] ? null : profile["Profiles.mannerLevel"],
        gender: !profile.gender ? null : getGender(profile.gender),
        ageGroup: !profile.ageGroup ? null : getAgeGroup(profile.ageGroup),
        region: profile["Profiles.region"],
        position: profile["Profiles.position"],
        description: profile["Profiles.description"],
    };
};
