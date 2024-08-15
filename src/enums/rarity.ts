import {Emote} from "./emote";

export class Rarity {
    public static C_RANK = new Rarity(1, "C-Rank", Emote.UNKNOWN_ICON, Emote.GEAR_C_RANK_ICON);
    public static B_RANK = new Rarity(2, "B-Rank", Emote.B_RANK_ICON, Emote.GEAR_B_RANK_ICON);
    public static A_RANK = new Rarity(3, "A-Rank", Emote.A_RANK_ICON, Emote.GEAR_A_RANK_ICON);
    public static S_RANK = new Rarity(4, "S-Rank", Emote.S_RANK_ICON, Emote.GEAR_S_RANK_ICON);

    public static UNKNOWN = new Rarity(null, "No Data", Emote.UNKNOWN_ICON, Emote.UNKNOWN_ICON);

    private constructor(
        public id: number | null,
        public rarity: string,
        public agentEmote: Emote,
        public gearEmote: Emote
    ) {
    }

    public static GetRarityFromId(id: number | null): Rarity {
        switch(id) {
            case 1:
                return Rarity.C_RANK;

            case 2:
                return Rarity.B_RANK;

            case 3:
                return Rarity.A_RANK;

            case 4:
                return Rarity.S_RANK;

            default:
                return Rarity.UNKNOWN;
        }
    }
}