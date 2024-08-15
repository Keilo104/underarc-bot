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
    public full_name: string | null = null;
    public iconImageUrl: string = "https://i.imgur.com/lQlL7DG.png";

    public rarity: Rarity = Rarity.UNKNOWN;
    public specialty: Specialty = Specialty.UNKNOWN;
    public element: Element = Element.UNKNOWN;
    public damageType: DamageType = DamageType.UNKNOWN;
    public faction: Faction = Faction.UNKNOWN;

    public purpleCoreMat: PurpleCoreMat = PurpleCoreMat.UNKNOWN;
    public goldenCoreMat: GoldenCoreMat = GoldenCoreMat.UNKNOWN;

    public baseAtk: number = 0;
    public atkGrowth: number = 0;
    public baseHp: number = 0;
    public hpGrowth: number = 0;
    public baseDef: number = 0;
    public defGrowth: number = 0;

    public baseImpact: number = 0;
    public baseAnomalyMastery: number = 0;
    public baseAnomalyProficiency: number = 0;


    public static AgentFromHakushin(): Agent {
        let agent = new Agent();




        return agent;
    }
}