import {Emote} from "./emote";

export class Faction {
    public static CUNNING_HARES = new Faction("1", "Cunning Hares", Emote.CUNNING_HARES_ICON);
    public static VICTORIA_HOUSEKEEPING_CO = new Faction("2", "Victoria Housekeeping Co.", Emote.VICTORIA_HOUSEKEEPING_ICON);
    public static BELOBOG_INDUSTRIES = new Faction("3", "Belobog Heavy Industries", Emote.BELOBOG_INDUSTRIES_ICON);
    public static SONS_OF_CALYDON = new Faction("4", "Sons of Calydon", Emote.SONS_OF_CALYDON_ICON);
    public static OBOL_SQUAD = new Faction("5", "Obol Squad", Emote.OBOLS_ICON);
    public static HSOS6 = new Faction("6", "Hollow Special Operations Section 6", Emote.HSOS6_ICON);
    public static PUBSEC = new Faction("7", "Criminal Investigation Special Response Team", Emote.PUBLIC_SECURITY_ICON);

    public static UNKNOWN = new Faction(null, "No Data", Emote.UNKNOWN_ICON);

    private constructor(
        public id: string | null,
        public faction: string,
        public emote: Emote,
    ) {
    }

    public static GetFactionFromId(id: string | null | undefined) {
        switch (id) {
            case "1":
                return Faction.CUNNING_HARES;

            case "2":
                return Faction.VICTORIA_HOUSEKEEPING_CO;

            case "3":
                return Faction.BELOBOG_INDUSTRIES;

            case "4":
                return Faction.SONS_OF_CALYDON;

            case "5":
                return Faction.OBOL_SQUAD;

            case "6":
                return Faction.HSOS6;

            case "7":
                return Faction.PUBSEC;

            default:
                return Faction.UNKNOWN;
        }
    }
}