import {Emote} from "../enums/emote";
import {Rarity} from "../enums/rarity";
import {Specialty} from "../enums/specialty";
import {Stat} from "../enums/stat";

export class WEngine {
    public id: number | null = null;
    public name: string | null = null;
    public iconImageUrl: string = "https://i.imgur.com/lQlL7DG.png"
    public embedColor: number = 0xffffff;
    public releasePatch: number | null = 1;
    public emote: Emote = Emote.UNKNOWN_ICON;

    public rarity: Rarity = Rarity.UNKNOWN;
    public specialty: Specialty = Specialty.UNKNOWN;

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

    private loadHelper() {
        const wengineHelper = require(`../../data/helpers/wengine_extra_infos.json`);

        if (this.id && "obtain" in wengineHelper[`${this.id}`])
            console.log("HEEEELP");

        if (this.id && "override_description" in wengineHelper[`${this.id}`])
            this.descOverride = wengineHelper[`${this.id}`]["override_description"];

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