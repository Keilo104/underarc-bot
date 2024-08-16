import {Emote} from "./emote";

export class Specialty {
    public static ATTACK = new Specialty("1", "Attack", Emote.ATTACK_ICON);
    public static STUN = new Specialty("2", "Stun", Emote.STUN_ICON);
    public static ANOMALY = new Specialty("3", "Anomaly", Emote.ANOMALY_ICON);
    public static SUPPORT = new Specialty("4", "Support", Emote.SUPPORT_ICON);
    public static DEFENSE = new Specialty("5", "Defense", Emote.DEFENSE_ICON);

    public static UNKNOWN = new Specialty(null, "No Data", Emote.UNKNOWN_ICON);

    private constructor(
        public id: string | null,
        public specialty: string,
        public emote: Emote,
    ) {
    }

    public static GetSpecialtyFromId(id: string | null | undefined): Specialty {
        switch(id) {
            case "1":
                return Specialty.ATTACK;

            case "2":
                return Specialty.STUN;

            case "3":
                return Specialty.ANOMALY;

            case "4":
                return Specialty.SUPPORT;

            case "5":
                return Specialty.DEFENSE;

            default:
                return Specialty.UNKNOWN;
        }
    }
}