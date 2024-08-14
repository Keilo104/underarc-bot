export class Agent {
    public id: number | null = null;
    public name: string | null = null;
    public full_name: string | null = null;

    public rarity: number; // TODO = enum
    public specialty: number; // TODO = enum
    public element: number; // TODO = enum
    public damageType: number; // TODO = enum
    public faction: number; // TODO = enum

    public baseAtk: number;
    public atkGrowth: number;
    public baseHp: number;
    public hpGrowth: number;
    public baseDef: number;
    public defGrowth: number;

    public baseImpact: number;
    public baseAnomalyMastery: number;
    public baseAnomalyProficiency: number;
    public baseCritRate: number;
    public baseCritDamage: number;

}