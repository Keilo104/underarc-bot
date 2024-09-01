import { Element } from "../enums/element";
import {Specialty} from "../enums/specialty";
import {Rarity} from "../enums/rarity";
import {Faction} from "../enums/faction";
import {DamageType} from "../enums/damage_type";
import {PurpleCoreMat} from "../enums/purple_core_mat";
import {GoldenCoreMat} from "../enums/golden_core_mat";
import {Stat} from "../enums/stat";
import {Emote} from "../enums/emote";
import {TreatString} from "../util/treat_string";
import {GetBoostForLevel} from "../util/get_boost_per_level";

export class Agent {
    public id: number | null = null;
    public name: string | null = null;
    public fullName: string | null = null;
    public iconImageUrl: string = "https://i.imgur.com/lQlL7DG.png";
    public embedColor: number = 0xffffff;
    public releasePatch: number | null = 1;
    public emote: Emote = Emote.UNKNOWN_ICON;

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

    public coreSkillNames: string[] = [];
    public coreSkillDescs: string[][] = [];

    private loadFromHelper() {
        const agentHelper = require(`../../data/helpers/agent_extra_infos.json`);

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
                GetBoostForLevel(this.hpBoosts, level) + Agent.GetCoreBoostForLevel(this.firstCoreBoosts, level));

        if(this.secondCoreStat == Stat.HP)
            return Math.floor(this.baseHp + ((this.hpGrowth * (level - 1)) / 10000) +
                GetBoostForLevel(this.hpBoosts, level) + Agent.GetCoreBoostForLevel(this.secondCoreBoosts, level));

        return Math.floor(this.baseHp + ((this.hpGrowth * (level - 1)) / 10000) +
            GetBoostForLevel(this.hpBoosts, level));
    }

    public atkAtLevel(level: number): number {
        if(this.firstCoreStat == Stat.ATK)
            return Math.floor(this.baseAtk + ((this.atkGrowth * (level - 1)) / 10000) +
                GetBoostForLevel(this.atkBoosts, level) + Agent.GetCoreBoostForLevel(this.firstCoreBoosts, level));

        if(this.secondCoreStat == Stat.ATK)
            return Math.floor(this.baseAtk + ((this.atkGrowth * (level - 1)) / 10000) +
                GetBoostForLevel(this.atkBoosts, level) + Agent.GetCoreBoostForLevel(this.secondCoreBoosts, level));

        return Math.floor(this.baseAtk + ((this.atkGrowth * (level - 1)) / 10000) +
            GetBoostForLevel(this.atkBoosts, level));
    }

    public defAtLevel(level: number): number {
        if(this.firstCoreStat == Stat.DEF)
            return Math.floor(this.baseDef + ((this.defGrowth * (level - 1)) / 10000) +
                GetBoostForLevel(this.defBoosts, level) + Agent.GetCoreBoostForLevel(this.firstCoreBoosts, level));

        if(this.secondCoreStat == Stat.DEF)
            return Math.floor(this.baseDef + ((this.defGrowth * (level - 1)) / 10000) +
                GetBoostForLevel(this.defBoosts, level) + Agent.GetCoreBoostForLevel(this.secondCoreBoosts, level));

        return Math.floor(this.baseDef + ((this.defGrowth * (level - 1)) / 10000) +
            GetBoostForLevel(this.defBoosts, level));
    }

    public impactAtLevel(level: number): number {
        if(this.firstCoreStat == Stat.IMPACT)
            return this.baseImpact + Agent.GetCoreBoostForLevel(this.firstCoreBoosts, level);

        if(this.secondCoreStat == Stat.IMPACT)
            return this.baseImpact + Agent.GetCoreBoostForLevel(this.secondCoreBoosts, level);

        return this.baseImpact;
    }

    public anomalyMasteryAtLevel(level: number): number {
        if(this.firstCoreStat == Stat.ANOMALY_MASTERY)
            return this.baseAnomalyMastery + Agent.GetCoreBoostForLevel(this.firstCoreBoosts, level);

        if(this.secondCoreStat == Stat.ANOMALY_MASTERY)
            return this.baseAnomalyMastery + Agent.GetCoreBoostForLevel(this.secondCoreBoosts, level);

        return this.baseAnomalyMastery;
    }

    public anomalyProficiencyAtLevel(level: number): number {
        if(this.firstCoreStat == Stat.ANOMALY_PROFICIENCY)
            return this.baseAnomalyProficiency + Agent.GetCoreBoostForLevel(this.firstCoreBoosts, level);

        if(this.secondCoreStat == Stat.ANOMALY_PROFICIENCY)
            return this.baseAnomalyProficiency + Agent.GetCoreBoostForLevel(this.secondCoreBoosts, level);

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
        return this.coreStatAtLevel(level, this.firstCoreStat, this.firstCoreBoosts);
    }

    public secondCoreStatAtLevel(level: number): string {
        return this.coreStatAtLevel(level, this.secondCoreStat, this.secondCoreBoosts);
    }

    private coreStatAtLevel(level: number, stat: Stat, boostArray: number[]): string {
        switch(stat) {
            case Stat.IMPACT:
                return `${this.baseImpact + Agent.GetCoreBoostForLevel(boostArray, level)}`

            case Stat.ANOMALY_MASTERY:
                return `${this.baseAnomalyMastery + Agent.GetCoreBoostForLevel(boostArray, level)}`

            case Stat.ENERGY_REGEN:
                return `${1.2 + (Agent.GetCoreBoostForLevel(boostArray, level) / 100)}/s`;

            case Stat.CRIT_RATE:
                return `${5 + (Agent.GetCoreBoostForLevel(boostArray, level) / 100)}%`;

            case Stat.CRIT_DMG:
                return `${50 + (Agent.GetCoreBoostForLevel(boostArray, level) / 100)}%`;

            case Stat.PEN_RATIO:
                return `${Agent.GetCoreBoostForLevel(boostArray, level) / 100}%`;

            default:
                return `0`;
        }
    }

    public coreSkillMeshedDescription(index: number): string {
        let meshedDescription = "";
        let description1 = this.coreSkillDescs[index][0].split(" ");
        let description2 = this.coreSkillDescs[index][1].split(" ");
        let description3 = this.coreSkillDescs[index][2].split(" ");
        let description4 = this.coreSkillDescs[index][3].split(" ");
        let description5 = this.coreSkillDescs[index][4].split(" ");
        let description6 = this.coreSkillDescs[index][5].split(" ");
        let description7 = this.coreSkillDescs[index][6].split(" ");

        for(let i = 0; i < description1.length ; i++) {
            if (description1[i] !== description2[i]) {
                let extrasStart = "";
                let extrasEnd = "";

                ["+"].forEach((item) => {
                    if(description1[i].startsWith(item)) {
                        extrasStart = `${extrasStart}${item}`
                        description1[i] = description1[i].slice(item.length, description1[i].length);
                        description2[i] = description2[i].slice(item.length, description2[i].length);
                        description3[i] = description3[i].slice(item.length, description3[i].length);
                        description4[i] = description4[i].slice(item.length, description4[i].length);
                        description5[i] = description5[i].slice(item.length, description5[i].length);
                        description6[i] = description6[i].slice(item.length, description6[i].length);
                        description7[i] = description7[i].slice(item.length, description7[i].length);
                    }
                });

                [",", ".", "%", "/s", "s"].forEach((item) => {
                    if(description1[i].endsWith(item)) {
                        extrasEnd = `${item}${extrasEnd}`
                        description1[i] = description1[i].slice(0, -item.length);
                        description2[i] = description2[i].slice(0, -item.length);
                        description3[i] = description3[i].slice(0, -item.length);
                        description4[i] = description4[i].slice(0, -item.length);
                        description5[i] = description5[i].slice(0, -item.length);
                        description6[i] = description6[i].slice(0, -item.length);
                        description7[i] = description7[i].slice(0, -item.length);
                    }
                });

                meshedDescription =
                    `${meshedDescription} **${extrasStart}${description1[i]}/${description2[i]}/${description3[i]}/` +
                    `${description4[i]}/${description5[i]}/${description6[i]}/${description7[i]}${extrasEnd}**`;

            } else {
                meshedDescription = `${meshedDescription} ${description1[i]}`;
            }
        }

        if (meshedDescription.length > 1024) {
            meshedDescription = meshedDescription.replaceAll(`${Emote.ATK_STAT_ICON.emote}`, "");
        }

        return meshedDescription;
    }

    public static async AgentFromId(agentId: string, env: any): Promise<Agent> {
        const agentJson = JSON.parse(await env.agents.get(agentId));
        const agentHelper = require(`../../data/helpers/agent_extra_infos.json`);

        if("source" in agentHelper[agentId] && agentHelper[agentId]["source"] == "hakushin")
            return Agent.AgentFromHakushin(agentJson);

        return Agent.AgentFromSelfData(agentJson);
    }

    private static AgentFromSelfData(agentJson: any): Agent {
        const agent = new Agent();

        agent.id = agentJson["Id"];
        agent.name = agentJson["Name"];
        agent.fullName = agentJson["FullName"];

        agent.specialty = Specialty.GetSpecialtyFromId(agentJson["Specialty"]);
        agent.faction = Faction.GetFactionFromId(agentJson["Faction"]);
        agent.element = Element.GetElementFromId(agentJson["Element"][0]);
        agent.damageType = DamageType.GetDamageTypeFromId(agentJson["DamageType"][0]);
        agent.rarity = Rarity.GetRarityFromId(agentJson["Rarity"]);

        if("Stats" in agentJson) {
            agent.baseAtk = agentJson["Stats"]["BaseAtk"];
            agent.atkGrowth = agentJson["Stats"]["AtkGrowth"];
            agent.baseDef = agentJson["Stats"]["BaseDef"];
            agent.defGrowth = agentJson["Stats"]["DefGrowth"];
            agent.baseHp = agentJson["Stats"]["BaseHp"];
            agent.hpGrowth = agentJson["Stats"]["HpGrowth"];

            agent.baseImpact = agentJson["Stats"]["BaseImpact"];
            agent.baseAnomalyMastery = agentJson["Stats"]["BaseAnomalyMastery"];
            agent.baseAnomalyProficiency = agentJson["Stats"]["BaseAnomalyProficiency"];
        }

        if("HpBoosts" in agentJson) {
            agent.hpBoosts = agentJson["HpBoosts"];
            agent.atkBoosts = agentJson["AtkBoosts"];
            agent.defBoosts = agentJson["DefBoosts"];
        }

        if("CoreSkillInfo" in agentJson) {
            agent.firstCoreStat = Stat.GetStatFromProps(agentJson["CoreSkillInfo"]["FirstCoreStat"]);
            agent.firstCoreBoosts = agentJson["CoreSkillInfo"]["FirstCoreStatValues"];
            agent.secondCoreStat = Stat.GetStatFromProps(agentJson["CoreSkillInfo"]["SecondCoreStat"]);
            agent.secondCoreBoosts = agentJson["CoreSkillInfo"]["SecondCoreStatValues"];

            agent.purpleCoreMat = PurpleCoreMat.GetPurpleCoreMatFromId(agentJson["CoreSkillInfo"]["PurpleCoreMat"]);
            agent.goldenCoreMat = GoldenCoreMat.GetGoldenCoreMatFromId(agentJson["CoreSkillInfo"]["GoldenCoreMat"]);
        }

        if("CoreSkillLevels" in agentJson) {
            agent.coreSkillNames = agentJson["CoreSkillLevels"]["Name"];

            for(let _ = 0; _ < agent.coreSkillNames.length; _++) {
                agent.coreSkillDescs.push([]);
            }

            for(let item = 0; item < agentJson["CoreSkillLevels"]["Descriptions"].length; item++) {
                for(let i = 0; i < agentJson["CoreSkillLevels"]["Descriptions"][item].length; i++) {
                    let treatedString = TreatString(agentJson["CoreSkillLevels"]["Descriptions"][item][i]);
                    agent.coreSkillDescs[i].push(treatedString);
                }
            }
        }

        agent.emote = Emote.GetEmoteFromId(`${agent.id}`);

        agent.loadFromHelper();
        return agent;
    }

    private static AgentFromHakushin(agentJson: any): Agent {
        const agent = new Agent();

        agent.id = agentJson["Id"];
        agent.name = agentJson["Name"];

        if ("FullName" in agentJson["PartnerInfo"])
            agent.fullName = agentJson["PartnerInfo"]["FullName"];

        agent.rarity = Rarity.GetRarityFromId(agentJson["Rarity"]);
        agent.faction = Faction.GetFactionFromId(Object.keys(agentJson["Camp"])[0]);
        agent.element = Element.GetElementFromId(Object.keys(agentJson["ElementType"])[0]);
        agent.specialty = Specialty.GetSpecialtyFromId(Object.keys(agentJson["WeaponType"])[0]);
        agent.damageType = DamageType.GetDamageTypeFromId(Object.keys(agentJson["HitType"])[0]);

        if ("Materials" in agentJson["Passive"])
            Agent.SetCoreMatsFromHakushin(agent, agentJson);

        if (Object.keys(agentJson["Stats"]).length)
            Agent.SetStatsFromHakushin(agent, agentJson);

        if (Object.keys(agentJson["Level"]).length)
            Agent.SetBoostsFromHakushin(agent, agentJson);

        if (Object.keys(agentJson["ExtraLevel"]).length)
            Agent.SetCoreBoostsFromHakushin(agent, agentJson);

        if (Object.keys(agentJson["Passive"]["Level"]).length) {
            agent.coreSkillNames = agentJson["Passive"]["Level"]["1"]["Name"];
            agent.coreSkillNames.forEach((_) => {
                agent.coreSkillDescs.push([]);
            });

            ["1", "2", "3", "4", "5", "6", "7"].forEach((level) => {
                agent.coreSkillDescs[0].push(TreatString(agentJson["Passive"]["Level"][level]["Desc"][0]));
                agent.coreSkillDescs[1].push(TreatString(agentJson["Passive"]["Level"][level]["Desc"][1]));
            });
        }

        agent.emote = Emote.GetEmoteFromId(`${agent.id}`);

        agent.loadFromHelper();
        return agent;
    }

    private static SetCoreMatsFromHakushin(agent: Agent, agentJson: any) {
        Object.keys(agentJson["Passive"]["Materials"][6]).forEach((material) => {
            if (agentJson["Passive"]["Materials"][6][material] == 30)
                agent.purpleCoreMat = PurpleCoreMat.GetPurpleCoreMatFromId(material);

            else if (agentJson["Passive"]["Materials"][6][material] == 4)
                agent.goldenCoreMat = GoldenCoreMat.GetGoldenCoreMatFromId(material);
        })
    }

    private static SetStatsFromHakushin(agent: Agent, agentJson: any) {
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

    private static SetBoostsFromHakushin(agent: Agent, agentJson: any) {
        agent.hpBoosts = [];
        agent.atkBoosts = [];
        agent.defBoosts = [];

        ["1", "2", "3", "4", "5", "6"].forEach((level) => {
            agent.hpBoosts.push(agentJson["Level"][level]["HpMax"]);
            agent.atkBoosts.push(agentJson["Level"][level]["Attack"]);
            agent.defBoosts.push(agentJson["Level"][level]["Defence"]);
        });
    }

    private static SetCoreBoostsFromHakushin(agent: Agent, agentJson: any) {
        agent.firstCoreBoosts = [];
        agent.secondCoreBoosts = [];
        let firstCoreStatKey = "";
        let secondCoreStatKey = "";

        Object.keys(agentJson["ExtraLevel"]["1"]["Extra"]).forEach((ascension) => {
            if(agent.firstCoreStat == Stat.UNKNOWN) {
                firstCoreStatKey = ascension;
                agent.firstCoreStat = Stat.GetStatFromProps(agentJson["ExtraLevel"]["1"]["Extra"][ascension]["Prop"]);
            } else if (agent.secondCoreStat == Stat.UNKNOWN) {
                secondCoreStatKey = ascension;
                agent.secondCoreStat = Stat.GetStatFromProps(agentJson["ExtraLevel"]["1"]["Extra"][ascension]["Prop"]);
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

    private static GetCoreBoostForLevel(boostArray: number[], level: number): number {
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