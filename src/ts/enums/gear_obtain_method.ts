import {Emote} from "./emote";


export class ObtainMethod {
    public static CRAFTABLE = new ObtainMethod(1, "Craftable at the Gadget Store", Emote.WEAPON_CRAFTABLE_ICON);
    public static GACHA = new ObtainMethod(2, "Only available through Gacha", Emote.WEAPON_GACHA_ICON);
    public static BATTLEPASS = new ObtainMethod(3, "Only available through Battlepass", Emote.WEAPON_BATTLEPASS_ICON);
    public static EVENT = new ObtainMethod(4, "Only available from time-limited events", Emote.UNKNOWN_ICON);

    public static UNKNOWN = new ObtainMethod(0, "No Data", Emote.UNKNOWN_ICON);

    private constructor(
        public id: number | null,
        public method: string,
        public emote: Emote,
    ) {
    }

    public static GetObtainMethodFromString(method: string | null): ObtainMethod {
        switch(method) {
            case "Craftable":
                return ObtainMethod.CRAFTABLE;

            case "Gacha":
                return ObtainMethod.GACHA;

            case "Battlepass":
                return ObtainMethod.BATTLEPASS;

            case "Event":
                return ObtainMethod.EVENT;

            default:
                return ObtainMethod.UNKNOWN;
        }
    }
}