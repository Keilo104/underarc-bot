import { Element } from "../enums/element";
import {Specialty} from "../enums/specialty";
import {Rarity} from "../enums/rarity";
import {Faction} from "../enums/faction";
import {DamageType} from "../enums/damage_type";
import {PurpleCoreMat} from "../enums/purple_core_mat";
import {GoldenCoreMat} from "../enums/golden_core_mat";

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

    public hpBoosts: number[] = [0, 0, 0, 0, 0, 0];
    public atkBoosts: number[] = [0, 0, 0, 0, 0, 0];
    public defBoosts: number[] = [0, 0, 0, 0, 0, 0];

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
        return Math.floor(this.baseHp + ((this.hpGrowth * (level - 1)) / 10000) +
            Agent.getBoostForLevel(this.hpBoosts, level));
    }

    public atkAtLevel(level: number): number {
        return Math.floor(this.baseAtk + ((this.atkGrowth * (level - 1)) / 10000) +
            Agent.getBoostForLevel(this.atkBoosts, level));
    }

    public defAtLevel(level: number): number {
        return Math.floor(this.baseDef + ((this.defGrowth * (level - 1)) / 10000) +
            Agent.getBoostForLevel(this.defBoosts, level));
    }

    public impactAtLevel(level: number): number {
        return this.baseImpact;
    }

    public anomalyMasteryAtLevel(level: number): number {
        return this.baseAnomalyMastery;
    }

    public anomalyProficiencyAtLevel(level: number): number {
        return this.baseAnomalyProficiency;
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
}