import {Emote} from "./emote";

export class GoldenCoreMat {
    public static FEROCIOUS_GRIP = new GoldenCoreMat("110001", "Ferocious Grip", Emote.BOSS1_MAT_ICON);
    public static LIVING_DRIVE = new GoldenCoreMat("110002", "Living Drive", Emote.BOSS2_MAT_ICON);
    public static FINALE_DANCE_SHOES = new GoldenCoreMat("110003", "Finale Dance Shoes", Emote.BOSS3_MAT_ICON);
    public static SCARLET_ENGINE = new GoldenCoreMat("110004", "Scarlet Engine", Emote.UNKNOWN_ICON);

    public static UNKNOWN = new GoldenCoreMat(null, "No Data", Emote.UNKNOWN_ICON);

    private constructor(
        public id: string | null,
        public goldenCoreMat: string,
        public emote: Emote,
    ) {
    }

    public static GetGoldenCoreMatFromId(id: string | number | null): GoldenCoreMat {
        switch(`${id}`) {
            case "110001":
                return GoldenCoreMat.FEROCIOUS_GRIP;

            case "110002":
                return GoldenCoreMat.LIVING_DRIVE;

            case "110003":
                return GoldenCoreMat.FINALE_DANCE_SHOES;

            case "110004":
                return GoldenCoreMat.SCARLET_ENGINE;

            default:
                return GoldenCoreMat.UNKNOWN;
        }
    }
}