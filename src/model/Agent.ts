import { Element } from "../enums/element";
import {Specialty} from "../enums/specialty";
import {Rarity} from "../enums/rarity";
import {Faction} from "../enums/faction";
import {DamageType} from "../enums/damage_type";
import {PurpleCoreMat} from "../enums/purple_core_mat";
import {GoldenCoreMat} from "../enums/golden_core_mat";
import {Stat} from "../enums/stat";

export class Agent {
    public id: number | null = null;
    public name: string | null = null;
    public fullName: string | null = null;
    public iconImageUrl: string = "https://i.imgur.com/lQlL7DG.png";
    public embedColor: number = 0xffffff;
    public releasePatch: number | null = 1;

    public rarity: Rarity = Rarity.UNKNOWN;
    public faction: Faction = Faction.UNKNOWN;
    public element: Element = Element.UNKNOWN;
    public specialty: Specialty = Specialty.UNKNOWN;
    public damageType: DamageType = DamageType.UNKNOWN;

    public purpleCoreMat: PurpleCoreMat = PurpleCoreMat.UNKNOWN;
    public goldenCoreMat: GoldenCoreMat = GoldenCoreMat.UNKNOWN;

    public baseHp: number = 0;
    public hpGrowth: number = 0;
    public baseAtk: number = 0;
    public atkGrowth: number = 0;
    public baseDef: number = 0;
    public defGrowth: number = 0;

    public baseImpact: number = 0;
    public baseAnomalyMastery: number = 0;
    public baseAnomalyProficiency: number = 0;

    public firstCoreStat: Stat = Stat.UNKNOWN;
    public secondCoreStat: Stat = Stat.UNKNOWN;

    public hpBoosts: number[] = [0, 0, 0, 0, 0, 0];
    public atkBoosts: number[] = [0, 0, 0, 0, 0, 0];
    public defBoosts: number[] = [0, 0, 0, 0, 0, 0];

    public firstCoreBoosts: number[] = [0, 0, 0, 0, 0, 0];
    public secondCoreBoosts: number[] = [0, 0, 0, 0, 0, 0];

    public loadFromHelper() {
        const agentHelper = require(`../data/helpers/agent_extra_infos.json`);

        if (this.id && "override_full_name" in agentHelper[`${this.id}`])
            this.fullName = agentHelper[`${this.id}`]["override_full_name"];

        if (this.id && "icon_image_url" in agentHelper[`${this.id}`])
            this.iconImageUrl = agentHelper[`${this.id}`]["icon_image_url"];

        if (this.id && "embed_color" in agentHelper[`${this.id}`])
            this.embedColor = Number(agentHelper[`${this.id}`]["embed_color"]);

        if (this.id && "release_patch" in agentHelper[`${this.id}`])
            this.releasePatch = agentHelper[`${this.id}`]["release_patch"];
    }

    public hpAtLevel(level: number): number {
        if(this.firstCoreStat == Stat.HP)
            return Math.floor(this.baseHp + ((this.hpGrowth * (level - 1)) / 10000) +
                Agent.getBoostForLevel(this.hpBoosts, level) + Agent.getCoreBoostForLevel(this.firstCoreBoosts, level));

        if(this.secondCoreStat == Stat.HP)
            return Math.floor(this.baseHp + ((this.hpGrowth * (level - 1)) / 10000) +
                Agent.getBoostForLevel(this.hpBoosts, level) + Agent.getCoreBoostForLevel(this.secondCoreBoosts, level));

        return Math.floor(this.baseHp + ((this.hpGrowth * (level - 1)) / 10000) +
            Agent.getBoostForLevel(this.hpBoosts, level));
    }

    public atkAtLevel(level: number): number {
        if(this.firstCoreStat == Stat.ATK)
            return Math.floor(this.baseAtk + ((this.atkGrowth * (level - 1)) / 10000) +
                Agent.getBoostForLevel(this.atkBoosts, level) + Agent.getCoreBoostForLevel(this.firstCoreBoosts, level));

        if(this.secondCoreStat == Stat.ATK)
            return Math.floor(this.baseAtk + ((this.atkGrowth * (level - 1)) / 10000) +
                Agent.getBoostForLevel(this.atkBoosts, level) + Agent.getCoreBoostForLevel(this.secondCoreBoosts, level));

        return Math.floor(this.baseAtk + ((this.atkGrowth * (level - 1)) / 10000) +
            Agent.getBoostForLevel(this.atkBoosts, level));
    }

    public defAtLevel(level: number): number {
        if(this.firstCoreStat == Stat.DEF)
            return Math.floor(this.baseDef + ((this.defGrowth * (level - 1)) / 10000) +
                Agent.getBoostForLevel(this.defBoosts, level) + Agent.getCoreBoostForLevel(this.firstCoreBoosts, level));

        if(this.secondCoreStat == Stat.DEF)
            return Math.floor(this.baseDef + ((this.defGrowth * (level - 1)) / 10000) +
                Agent.getBoostForLevel(this.defBoosts, level) + Agent.getCoreBoostForLevel(this.secondCoreBoosts, level));

        return Math.floor(this.baseDef + ((this.defGrowth * (level - 1)) / 10000) +
            Agent.getBoostForLevel(this.defBoosts, level));
    }

    public impactAtLevel(level: number): number {
        if(this.firstCoreStat == Stat.IMPACT)
            return this.baseImpact + Agent.getCoreBoostForLevel(this.firstCoreBoosts, level);

        if(this.secondCoreStat == Stat.IMPACT)
            return this.baseImpact + Agent.getCoreBoostForLevel(this.secondCoreBoosts, level);

        return this.baseImpact;
    }

    public anomalyMasteryAtLevel(level: number): number {
        if(this.firstCoreStat == Stat.ANOMALY_MASTERY)
            return this.baseAnomalyMastery + Agent.getCoreBoostForLevel(this.firstCoreBoosts, level);

        if(this.secondCoreStat == Stat.ANOMALY_MASTERY)
            return this.baseAnomalyMastery + Agent.getCoreBoostForLevel(this.secondCoreBoosts, level);

        return this.baseAnomalyMastery;
    }

    public anomalyProficiencyAtLevel(level: number): number {
        if(this.firstCoreStat == Stat.ANOMALY_PROFICIENCY)
            return this.baseAnomalyProficiency + Agent.getCoreBoostForLevel(this.firstCoreBoosts, level);

        if(this.secondCoreStat == Stat.ANOMALY_PROFICIENCY)
            return this.baseAnomalyProficiency + Agent.getCoreBoostForLevel(this.secondCoreBoosts, level);

        return this.baseAnomalyProficiency;
    }

    public scalesImpact(): boolean {
        return this.firstCoreStat == Stat.IMPACT || this.secondCoreStat == Stat.IMPACT;
    }

    public scalesAnomalyMastery(): boolean {
        return this.firstCoreStat == Stat.ANOMALY_MASTERY || this.secondCoreStat == Stat.ANOMALY_MASTERY;
    }

    public scalesAnomalyProficiency(): boolean {
        return this.firstCoreStat == Stat.ANOMALY_PROFICIENCY || this.secondCoreStat == Stat.ANOMALY_PROFICIENCY;
    }

    public specialFirstCoreStat(): boolean {
        let regularStats: Stat[] = [Stat.HP, Stat.ATK, Stat.DEF,
            Stat.IMPACT, Stat.ANOMALY_MASTERY, Stat.ANOMALY_PROFICIENCY]

        return !regularStats.includes(this.firstCoreStat);
    }

    public specialSecondCoreStat(): boolean {
        let regularStats: Stat[] = [Stat.HP, Stat.ATK, Stat.DEF,
            Stat.IMPACT, Stat.ANOMALY_MASTERY, Stat.ANOMALY_PROFICIENCY]

        return !regularStats.includes(this.secondCoreStat);
    }

    public firstCoreStatAtLevel(level: number): string {
        switch(this.firstCoreStat) {
            case Stat.ENERGY_REGEN:
                return `${1.2 + (Agent.getCoreBoostForLevel(this.firstCoreBoosts, level) / 100)}/s`;

            case Stat.CRIT_RATE:
                return `${5 + (Agent.getCoreBoostForLevel(this.firstCoreBoosts, level) / 100)}%`;

            case Stat.CRIT_DMG:
                return `${50 + (Agent.getCoreBoostForLevel(this.firstCoreBoosts, level) / 100)}%`;

            case Stat.PEN_RATIO:
                return `${Agent.getCoreBoostForLevel(this.firstCoreBoosts, level) / 100}%`;

            default:
                return `0`;
        }
    }

    public secondCoreStatAtLevel(level: number): string {
        switch(this.secondCoreStat) {
            case Stat.ENERGY_REGEN:
                return `${1.2 + (Agent.getCoreBoostForLevel(this.secondCoreBoosts, level) / 100)}/s`;

            case Stat.CRIT_RATE:
                return `${5 + (Agent.getCoreBoostForLevel(this.secondCoreBoosts, level) / 100)}%`;

            case Stat.CRIT_DMG:
                return `${50 + (Agent.getCoreBoostForLevel(this.secondCoreBoosts, level) / 100)}%`;

            case Stat.PEN_RATIO:
                return `${Agent.getCoreBoostForLevel(this.secondCoreBoosts, level) / 100}%`;

            default:
                return `0`;
        }
    }

    public static AgentFromHakushin(agentJson: any): Agent {
        let agent = new Agent();

        agent.id = agentJson["Id"];
        agent.name = agentJson["Name"];

        if ("FullName" in agentJson["PartnerInfo"])
            agent.fullName = agentJson["PartnerInfo"]["FullName"];

        agent.rarity = Rarity.GetRarityFromId(agentJson["Rarity"]);
        agent.faction = Faction.GetFactionFromId(Object.keys(agentJson["Camp"])[0]);
        agent.element = Element.GetElementFromId(Object.keys(agentJson["ElementType"])[0]);
        agent.specialty = Specialty.GetSpecialtyFromId(Object.keys(agentJson["WeaponType"])[0]);
        agent.damageType = DamageType.GetDamageTypeFromId(Object.keys(agentJson["HitType"])[0]);

        if ("Materials" in agentJson["Passive"]) {
            Object.keys(agentJson["Passive"]["Materials"][6]).forEach((material) => {
                if (agentJson["Passive"]["Materials"][6][material] == 30)
                    agent.purpleCoreMat = PurpleCoreMat.GetPurpleCoreMatFromId(material);

                else if (agentJson["Passive"]["Materials"][6][material] == 4)
                    agent.goldenCoreMat = GoldenCoreMat.GetGoldenCoreMatFromId(material);
            })
        }

        if (Object.keys(agentJson["Stats"]).length) {
            agent.baseHp = agentJson["Stats"]["HpMax"];
            agent.hpGrowth = agentJson["Stats"]["HpGrowth"];
            agent.baseAtk = agentJson["Stats"]["Attack"];
            agent.atkGrowth = agentJson["Stats"]["AttackGrowth"];
            agent.baseDef = agentJson["Stats"]["Defence"];
            agent.defGrowth = agentJson["Stats"]["DefenceGrowth"];

            agent.baseImpact = agentJson["Stats"]["BreakStun"];
            agent.baseAnomalyMastery = agentJson["Stats"]["ElementMystery"];
            agent.baseAnomalyProficiency = agentJson["Stats"]["ElementAbnormalPower"];
        }

        if (Object.keys(agentJson["Level"]).length) {
            agent.hpBoosts = [];
            agent.atkBoosts = [];
            agent.defBoosts = [];

            ["1", "2", "3", "4", "5", "6"].forEach((level) => {
                agent.hpBoosts.push(agentJson["Level"][level]["HpMax"]);
                agent.atkBoosts.push(agentJson["Level"][level]["Attack"]);
                agent.defBoosts.push(agentJson["Level"][level]["Defence"]);
            });
        }

        if (Object.keys(agentJson["ExtraLevel"]).length) {
            agent.firstCoreBoosts = [];
            agent.secondCoreBoosts = [];
            let firstCoreStatKey = "";
            let secondCoreStatKey = "";

            Object.keys(agentJson["ExtraLevel"]["1"]["Extra"]).forEach((ascension) => {
                if(agent.firstCoreStat == Stat.UNKNOWN) {
                    firstCoreStatKey = ascension;
                    agent.firstCoreStat = Stat.GetStatFromCoreName(agentJson["ExtraLevel"]["1"]["Extra"][ascension]["Name"]);
                } else if (agent.secondCoreStat == Stat.UNKNOWN) {
                    secondCoreStatKey = ascension;
                    agent.secondCoreStat = Stat.GetStatFromCoreName(agentJson["ExtraLevel"]["1"]["Extra"][ascension]["Name"]);
                }
            });

            if(agentJson["ExtraLevel"]["1"]["Extra"][firstCoreStatKey]["Value"] == 0) {
                let helperCoreStatKey = firstCoreStatKey;
                firstCoreStatKey = secondCoreStatKey;
                secondCoreStatKey = helperCoreStatKey;

                let helperCoreStat = agent.firstCoreStat;
                agent.firstCoreStat = agent.secondCoreStat;
                agent.secondCoreStat = helperCoreStat;
            }

            ["1", "2", "3", "4", "5", "6"].forEach((ascension) => {
                agent.firstCoreBoosts.push(agentJson["ExtraLevel"][ascension]["Extra"][firstCoreStatKey]["Value"]);
                agent.secondCoreBoosts.push(agentJson["ExtraLevel"][ascension]["Extra"][secondCoreStatKey]["Value"]);
            });
        }

        agent.loadFromHelper();

        return agent;
    }

    public static getBoostForLevel(boostArray: number[], level: number): number {
        if(level < 11)
            return boostArray[0];

        if(level < 21)
            return boostArray[1];

        if(level < 31)
            return boostArray[2];

        if(level < 41)
            return boostArray[3];

        if(level < 51)
            return boostArray[4];

        return boostArray[5];
    }

    public static getCoreBoostForLevel(boostArray: number[], level: number): number {
        if (level < 15)
            return 0

        if (level < 25)
            return boostArray[0]

        if (level < 35)
            return boostArray[1]

        if (level < 45)
            return boostArray[2]

        if (level < 55)
            return boostArray[3]

        if (level < 60)
            return boostArray[4]

        return boostArray[5]
    }
}