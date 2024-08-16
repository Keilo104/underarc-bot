import {Emote} from "./emote";

export class DamageType {
    public static SLASH = new DamageType("101", "Slash", Emote.SLASH_ICON);
    public static STRIKE = new DamageType("102", "Strike", Emote.STRIKE_ICON);
    public static PIERCE = new DamageType("103", "Pierce", Emote.PIERCE_ICON);

    public static UNKNOWN = new DamageType(null, "No Data", Emote.UNKNOWN_ICON);

    private constructor(
        public id: string | null,
        public damageType: string,
        public emote: Emote,
    ) {
    }

    public static GetDamageTypeFromId(id: string | null | undefined) {
        switch(id) {
            case "101":
                return DamageType.SLASH;

            case "102":
                return DamageType.STRIKE;

            case "103":
                return DamageType.PIERCE;

            default:
                return DamageType.UNKNOWN;
        }
    }
}