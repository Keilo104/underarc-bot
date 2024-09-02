import {Emote} from "./emote";

export class Stat {
    public static HP = new Stat(11102, "HP", Emote.HP_STAT_ICON);
    public static ATK = new Stat(12101, "Base ATK", Emote.ATK_STAT_ICON);
    public static ATK_PERCENT = new Stat(12102, "ATK", Emote.ATK_STAT_ICON);
    public static DEF = new Stat(13102, "DEF", Emote.DEF_STAT_ICON);
    public static IMPACT = new Stat(12202, "Impact", Emote.IMPACT_STAT_ICON);
    public static CRIT_RATE = new Stat(20103, "CRIT Rate", Emote.CRIT_RATE_STAT_ICON);
    public static CRIT_DMG = new Stat(21103, "CRIT DMG", Emote.CRIT_DMG_STAT_ICON);
    public static ANOMALY_MASTERY = new Stat(null, "Anomaly Mastery", Emote.ANOMALY_MASTERY_STAT_ICON);
    public static ANOMALY_PROFICIENCY = new Stat(31203, "Anomaly Proficiency", Emote.ANOMALY_PROFICIENCY_STAT_ICON);
    public static PEN_RATIO = new Stat(23103, "PEN Ratio", Emote.PEN_RATIO_STAT_ICON);
    public static ENERGY_REGEN = new Stat(30502, "Energy Regen", Emote.ENERGY_REGEN_STAT_ICON);

    public static UNKNOWN = new Stat(null, "No Data", Emote.UNKNOWN_ICON);

    private constructor(
        public propertyId: number | null,
        public name: string,
        public emote: Emote,
    ) {
    }

    public getFormattedStatForWEngine(statValue: number): string {
        switch(this) {
            case Stat.ATK:
                return `${statValue}`;

            case Stat.ATK_PERCENT:
                return `${statValue / 100}%`;

            case Stat.DEF:
                return `${statValue / 100}%`;

            case Stat.HP:
                return `${statValue / 100}%`;

            case Stat.IMPACT:
                return `${statValue / 100}%`

            case Stat.ANOMALY_PROFICIENCY:
                return `${statValue}`

            case Stat.CRIT_RATE:
                return `${statValue / 100}%`;

            case Stat.CRIT_DMG:
                return `${statValue / 100}%`;

            case Stat.PEN_RATIO:
                return `${statValue / 100}%`;

            case Stat.ENERGY_REGEN:
                return `${statValue / 100}%`;

            default:
                return `0`;
        }
    }

    public static GetStatFromProps(props: string | number): Stat {
        switch(`${props}`) {
            case "11102":
                return Stat.HP;

            case "12101":
                return Stat.ATK;

            case "12102":
                return Stat.ATK_PERCENT;

            case "13102":
                return Stat.DEF;

            case "12201":
            case "12202":
                return Stat.IMPACT;

            case "20101":
            case "20103":
                return Stat.CRIT_RATE;

            case "21101":
            case "21103":
                return Stat.CRIT_DMG;

            case "31401":
                return Stat.ANOMALY_MASTERY;

            case "31203":
                return Stat.ANOMALY_PROFICIENCY;

            case "23101":
            case "23103":
                return Stat.PEN_RATIO;

            case "30501":
            case "30502":
                return Stat.ENERGY_REGEN;

            default:
                return Stat.UNKNOWN;
        }
    }
}