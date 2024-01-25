type Level = {
    name: string;
};

const Levels: { [key: number]: Level } = {
    1: { name: "Level 1" },
    2: { name: "Level 2" },
    3: { name: "Level 3" },
    4: { name: "Level 4" },
};

export const defaultLevel = 1;

export const getLevelById = (id: number): string | undefined => {
    return Levels[id].name;
};
