import {Emote} from "./emote";

export class PurpleCoreMat {
    public static MURDEROUS_OBITUARY = new PurpleCoreMat("110501", "Murderous Obituary", Emote.MINIBOSS1_MAT_ICON);
    public static CRIMSON_AWE = new PurpleCoreMat("110502", "Crimson Awe", Emote.MINIBOSS2_MAT_ICON);
    public static ETHEREAL_PURSUIT = new PurpleCoreMat("110503", "Ethereal Pursuit", Emote.MINIBOSS3_MAT_ICON);
    public static STEEL_MALICE = new PurpleCoreMat("110504", "Steel Malice", Emote.MINIBOSS4_MAT_ICON);
    public static DESTRUCTIVE_ADVANCE = new PurpleCoreMat("110505", "Destructive Advance", Emote.MINIBOSS5_MAT_ICON);
    public static FALLING_FIST = new PurpleCoreMat("110506", "Falling Fist", Emote.MINIBOSS6_MAT_ICON);
    public static NEW_12_MAT = new PurpleCoreMat("110507", "New 1.2 mat", Emote.UNKNOWN_ICON);

    public static UNKNOWN = new PurpleCoreMat(null, "No Data", Emote.UNKNOWN_ICON);

    private constructor(
        public id: string | null,
        public purpleCoreMat: string,
        public emote: Emote,
    ) {
    }

    public static GetPurpleCoreMatFromId(id: string | null) {
        switch(id) {
            case "110501":
                return PurpleCoreMat.MURDEROUS_OBITUARY;

            case "110502":
                return PurpleCoreMat.CRIMSON_AWE;

            case "110503":
                return PurpleCoreMat.ETHEREAL_PURSUIT;

            case "110504":
                return PurpleCoreMat.STEEL_MALICE;

            case "110505":
                return PurpleCoreMat.DESTRUCTIVE_ADVANCE;

            case "110506":
                return PurpleCoreMat.FALLING_FIST;

            case "110507":
                return PurpleCoreMat.NEW_12_MAT;

            default:
                return PurpleCoreMat.UNKNOWN;
        }
    }
}