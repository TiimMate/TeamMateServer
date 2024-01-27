type Gender = {
    name: string;
};

const Genders: { [key: number]: Gender } = {
    1: { name: "여성" },
    2: { name: "남성" },
    3: { name: "혼성" },
};

export const getGendersLength = (): number => {
    return Object.keys(Genders).length;
};

export const getGenderById = (id: number): string | undefined => {
    return Genders[id].name;
};
