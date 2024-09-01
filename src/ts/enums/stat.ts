import {Emote} from "./emote";

export class Stat {
    public static HP = new Stat(11101, "HP", Emote.HP_STAT_ICON);
    public static ATK = new Stat(12101, "ATK", Emote.ATK_STAT_ICON);
    public static ATK_PERCENT = new Stat(12102, "ATK", Emote.ATK_STAT_ICON);
    public static DEF = new Stat(13101, "DEF", Emote.DEF_STAT_ICON);
    public static IMPACT = new Stat(12201, "Impact", Emote.IMPACT_STAT_ICON);
    public static CRIT_RATE = new Stat(20101, "CRIT Rate", Emote.CRIT_RATE_STAT_ICON);
    public static CRIT_DMG = new Stat(21101, "CRIT DMG", Emote.CRIT_DMG_STAT_ICON);
    public static ANOMALY_MASTERY = new Stat(31401, "Anomaly Mastery", Emote.ANOMALY_MASTERY_STAT_ICON);
    public static ANOMALY_PROFICIENCY = new Stat(null, "Anomaly Proficiency", Emote.ANOMALY_PROFICIENCY_STAT_ICON);
    public static PEN_RATIO = new Stat(23101, "PEN Ratio", Emote.PEN_RATIO_STAT_ICON);
    public static ENERGY_REGEN = new Stat(30501, "Energy Regen", Emote.ENERGY_REGEN_STAT_ICON);

    public static UNKNOWN = new Stat(null, "No Data", Emote.UNKNOWN_ICON);

    private constructor(
        public propertyId: number | null,
        public name: string,
        public emote: Emote,
    ) {
    }

    public getFormattedStatForWEngine(statValue: number): string {
        switch(this) {
            case Stat.ATK_PERCENT:
                return `${statValue}%`;

            case Stat.DEF:
                return `${statValue}%`;

            case Stat.HP:
                return `${statValue}%`;

            case Stat.IMPACT:
                return `${statValue}%`

            case Stat.ANOMALY_PROFICIENCY:
                return `${statValue}`

            case Stat.CRIT_RATE:
                return `${statValue}%`;

            case Stat.CRIT_DMG:
                return `${statValue}%`;

            case Stat.PEN_RATIO:
                return `${statValue}%`;

            case Stat.ENERGY_REGEN:
                return `${statValue}%`;

            default:
                return `0`;
        }
    }

    public static GetStatFromProps(props: string | number): Stat {
        switch(`${props}`) {
            case "11101":
                return Stat.HP;

            case "12101":
                return Stat.ATK;

            case "12102":
                return Stat.ATK_PERCENT;

            case "13101":
                return Stat.DEF;

            case "12201":
                return Stat.IMPACT;

            case "20101":
                return Stat.CRIT_RATE;

            case "21101":
                return Stat.CRIT_DMG;

            case "31401":
                return Stat.ANOMALY_MASTERY;

            case null:
                return Stat.ANOMALY_PROFICIENCY;

            case "23101":
                return Stat.PEN_RATIO;

            case "30501":
                return Stat.ENERGY_REGEN;

            default:
                return Stat.UNKNOWN;
        }
    }
}