export const readGuestingResponseDTO = (guestings) => {
    console.log(guestings);
    return guestings.map((guesting) => ({
        gameTime: guesting.gameTime,
        teamName: guesting["Team.name"],
        teamRegion: guesting["Team.region"],
        teamGender: guesting["Team.gender"], //getGenderById(guesting["Team.gender"]),
        memberCount: guesting.memberCount,
        teamAgeGroup: guesting["Team.ageGroup"], //getAgeGroupById(guesting["Team.ageGroup"]),
        teamSkillLevel: guesting["Team.skillLevel"], //getLevelById(guesting["Team.skillLevel"])
        recruitCount: guesting.recruitCount,
    }));
};
