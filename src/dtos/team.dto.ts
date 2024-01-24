export const readTeamDetailResponseDTO = (detail, leaderInfo, memberInfo, isTeamLeader) => {
    const member = memberInfo.map((info) => ({
        //TODO
        nickname: info["User.nickname"],
        height: null,
        weight: null,
        position: null,
    }));
    return {
        name: detail.name,
        logo: detail.logo,
        skillLevel: detail.skillLevel,
        mannerLevel: detail.mannerLevel,
        description: detail.description,
        participants: {
            leader: leaderInfo,
            member,
        },
        isTeamLeader,
    };
};
