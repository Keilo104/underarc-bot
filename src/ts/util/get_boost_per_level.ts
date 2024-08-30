export function GetBoostForLevel(boostArray: number[], level: number): number {
    if(level < 11)
        return boostArray[0];

    if(level < 21)
        return boostArray[1];

    if(level < 31)
        return boostArray[2];

    if(level < 41)
        return boostArray[3];

    if(level < 51)
        return boostArray[4];

    return boostArray[5];
}