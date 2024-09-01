import {Emote} from "../enums/emote";
import {Rarity} from "../enums/rarity";
import {Specialty} from "../enums/specialty";
import {Stat} from "../enums/stat";
import {ObtainMethod} from "../enums/gear_obtain_method";
import {TreatString} from "../util/treat_string";
import {GetBoostForLevel} from "../util/get_boost_per_level";

export class WEngine {
    public id: number | null = null;
    public name: string | null = null;
    public iconImageUrl: string = "https://i.imgur.com/lQlL7DG.png"
    public embedColor: number = 0xffffff;
    public releasePatch: number | null = 1;
    public emote: Emote = Emote.UNKNOWN_ICON;

    public rarity: Rarity = Rarity.UNKNOWN;
    public specialty: Specialty = Specialty.UNKNOWN;
    public obtainMethod: ObtainMethod = ObtainMethod.UNKNOWN;

    public mainStat: Stat = Stat.UNKNOWN;
    public mainStatBase: number = 0;
    public mainStatScaling: number[] = new Array(61).fill(0);
    public mainStatBoosts: number[] = new Array(6).fill(0);

    public subStat: Stat = Stat.UNKNOWN;
    public subStatBase: number = 0;
    public subStatBoosts: number[] = new Array(6).fill(0);

    public descName: string | null = null;
    public descValues: string[] = [];
    public descOverride: string | null = null;

    public meshedDescription(): string {
        if(this.descOverride !== null)
            return this.descOverride;

        let meshedDescription = "";
        let description1 = this.descValues[0].split(" ");
        let description2 = this.descValues[1].split(" ");
        let description3 = this.descValues[2].split(" ");
        let description4 = this.descValues[3].split(" ");
        let description5 = this.descValues[4].split(" ");

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
                    }
                });

                meshedDescription =
                    `${meshedDescription} **${extrasStart}${description1[i]}/${description2[i]}/` +
                    `${description3[i]}/${description4[i]}/${description5[i]}${extrasEnd}**`;

            } else {
                meshedDescription = `${meshedDescription} ${description1[i]}`;
            }
        }

        return meshedDescription;
    }

    public mainStatAtLevel(level: number): number {
        return Math.floor(
          this.mainStatBase * (1+ ((this.mainStatScaling[level] + GetBoostForLevel(this.mainStatBoosts, level)) / 10000))
        );
    }

    public subStatAtLevel(level: number): number {
        return Math.floor(
          this.subStatBase * (1 + (GetBoostForLevel(this.subStatBoosts, level) / 10000))
        );
    }

    private loadHelper() {
        const wengineHelper = require(`../../data/helpers/wengine_extra_infos.json`);

        if (this.id && "obtain" in wengineHelper[`${this.id}`])
            this.obtainMethod = ObtainMethod.GetObtainMethodFromString(wengineHelper[`${this.id}`]["obtain"]);

        if (this.id && "override_description" in wengineHelper[`${this.id}`])
            this.descOverride = TreatString(wengineHelper[`${this.id}`]["override_description"]);

        if (this.id && "signature" in wengineHelper[`${this.id}`])
            console.log("HEEEEEEEEEEEEEEEELP");

        if (this.id && "icon_image_url" in wengineHelper[`${this.id}`])
            this.iconImageUrl = wengineHelper[`${this.id}`]["icon_image_url"];

        if (this.id && "embed_color" in wengineHelper[`${this.id}`])
            this.embedColor = Number(wengineHelper[`${this.id}`]["embed_color"]);

        if (this.id && "release_patch" in wengineHelper[`${this.id}`])
            this.releasePatch = wengineHelper[`${this.id}`]["release_patch"];
    }

    private setScalingsFromRarity() {
        if(this.rarity != null) {
            const xpTables = require(`../../data/wengines/xp_tables.json`);

            this.mainStatScaling = xpTables[`${this.rarity.id}`]["MainstatScaling"];
            this.mainStatBoosts = xpTables[`${this.rarity.id}`]["MainstatBoosts"];
            this.subStatBoosts = xpTables[`${this.rarity.id}`]["SubstatBoosts"];
        }
    }

    public static async WEngineFromId(wengineId: string, env: any): Promise<WEngine> {
        const wengineJson = JSON.parse(await env.wengines.get(wengineId));
        const wengineHelper = require(`../../data/helpers/wengine_extra_infos.json`);

        if("source" in wengineHelper[wengineId] && wengineHelper[wengineId]["source"] == "hakushin")
            return WEngine.WEngineFromHakushin(wengineJson);

        return WEngine.WEngineFromSelfData(wengineJson);
    }

    private static WEngineFromSelfData(wengineJson: any): WEngine {
        const wengine = new WEngine();

        wengine.id = wengineJson["Id"];
        wengine.specialty = Specialty.GetSpecialtyFromId(wengineJson["Specialty"]);
        wengine.name = wengineJson["Name"];

        wengine.rarity = Rarity.GetRarityFromId(wengineJson["Rarity"]);
        wengine.emote = Emote.GetEmoteFromId(`${wengine.id}`);

        wengine.mainStat = Stat.GetStatFromProps(wengineJson["BaseProp"]);
        wengine.mainStatBase = wengineJson["BasePropValue"];
        wengine.subStat = Stat.GetStatFromProps(wengineJson["SubProp"]);
        wengine.subStatBase = wengineJson["SubPropValue"];

        wengine.descName = wengineJson["Refinements"]["Name"];
        wengine.descValues = wengineJson["Refinements"]["Descriptions"];

        for(let i = 0; i < wengine.descValues.length; i++) {
            wengine.descValues[i] = TreatString(wengine.descValues[i]);
        }

        wengine.setScalingsFromRarity();
        wengine.loadHelper();
        return wengine;
    }

    private static WEngineFromHakushin(wengineJson: any): WEngine {
        const wengine = new WEngine();

        wengine.id = wengineJson["Id"];
        wengine.name = wengineJson["Name"];
        wengine.specialty = wengineJson["WeaponType"];

        wengine.rarity = Rarity.GetRarityFromId(wengineJson["Rarity"]);
        wengine.emote = Emote.GetEmoteFromId(`${wengine.id}`);

        wengine.setScalingsFromRarity();
        wengine.loadHelper();
        return wengine;
    }
}