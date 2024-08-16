import {Emote} from "./emote";

export class Stat {
    public static HP = new Stat("HpMax", "", "HP", Emote.HP_STAT_ICON);
    public static ATK = new Stat("Attack", "Base ATK", "ATK", Emote.ATK_STAT_ICON);
    public static DEF = new Stat("Defence", "", "DEF", Emote.DEF_STAT_ICON);
    public static IMPACT = new Stat("BreakStun", "Impact", "Impact", Emote.IMPACT_STAT_ICON);
    public static CRIT_RATE = new Stat("Crit", "CRIT Rate", "CRIT Rate", Emote.CRIT_RATE_STAT_ICON);
    public static CRIT_DMG = new Stat("CritDamage", "CRIT DMG", "CRIT DMG", Emote.CRIT_DMG_STAT_ICON);
    public static ANOMALY_MASTERY = new Stat("ElementMystery", "Anomaly Mastery", "Anomaly Mastery", Emote.ANOMALY_MASTERY_STAT_ICON);
    public static ANOMALY_PROFICIENCY = new Stat("ElementAbnormalPower", "", "Anomaly Proficiency", Emote.ANOMALY_PROFICIENCY_STAT_ICON);
    public static PEN_RATIO = new Stat("PenRate", "PEN Ratio", "PEN Ratio", Emote.PEN_RATIO_STAT_ICON);
    public static ENERGY_REGEN = new Stat("SpRecover", "Base Energy Regen", "Energy Regen", Emote.ENERGY_REGEN_STAT_ICON);

    public static UNKNOWN = new Stat(null, null, "No Data", Emote.UNKNOWN_ICON);

    private constructor(
        public name: string | null,
        public coreName: string | null,
        public displayName: string,
        public emote: Emote,
    ) {
    }

    public static GetStatFromCoreName(coreName: string): Stat {
        switch(coreName) {
            case "placeholder_hp":
                return Stat.HP;

            case "Base ATK":
                return Stat.ATK;

            case "placeholder_def":
                return Stat.DEF;

            case "Impact":
                return Stat.IMPACT;

            case "CRIT Rate":
                return Stat.CRIT_RATE;

            case "CRIT DMG":
                return Stat.CRIT_DMG;

            case "Anomaly Mastery":
                return Stat.ANOMALY_MASTERY;

            case "placeholder_anomaly_proficiency":
                return Stat.ANOMALY_PROFICIENCY;

            case "PEN Ratio":
                return Stat.PEN_RATIO;

            case "Base Energy Regen":
                return Stat.ENERGY_REGEN;

            default:
                return Stat.UNKNOWN;
        }
    }
}