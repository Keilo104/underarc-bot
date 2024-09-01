import {Agent} from "../../model/Agent";
import {Emote} from "../../enums/emote";
import {generateBaseAgentEmbed} from "./generate_base_agent_embed";

export function printAgentStats(agent: Agent): any {
    const agentEmbed = generateBaseAgentEmbed(agent);

    agentEmbed.fields.unshift({
        name: "Base stats at Lv1 → Lv60", inline: false,
        value:
            `${Emote.HP_STAT_ICON.emote} **HP:** ${agent.hpAtLevel(1)} → ${agent.hpAtLevel(60)}` +
            `\n${Emote.ATK_STAT_ICON.emote} **ATK:** ${agent.atkAtLevel(1)} → ${agent.atkAtLevel(60)}` +
            `\n${Emote.DEF_STAT_ICON.emote} **DEF:** ${agent.defAtLevel(1)} → ${agent.defAtLevel(60)}` +
            `${agent.specialFirstCoreStat() ? `\n${agent.firstCoreStat.emote.emote} **${agent.firstCoreStat.name}:** ` +
                `${agent.firstCoreStatAtLevel(1)} → ${agent.firstCoreStatAtLevel(60)}` : ""}` +
            `${agent.specialSecondCoreStat() ? `\n${agent.secondCoreStat.emote.emote} **${agent.secondCoreStat.name}:** ` + 
                `${agent.secondCoreStatAtLevel(1)} → ${agent.secondCoreStatAtLevel(60)}` : ""}` +
            `\n${Emote.IMPACT_STAT_ICON.emote} **Impact:** ${agent.impactAtLevel(1)}` +
            `${agent.scalesImpact() ? ` → ${agent.impactAtLevel(60)}` : ""}` +
            `\n${Emote.ANOMALY_MASTERY_STAT_ICON.emote} **Anomaly Mastery:** ${agent.anomalyMasteryAtLevel(1)}` +
            `${agent.scalesAnomalyMastery() ? ` → ${agent.anomalyMasteryAtLevel(60)}` : ""}` +
            `\n${Emote.ANOMALY_PROFICIENCY_STAT_ICON.emote} **Anomaly Proficiency:** ${agent.anomalyProficiencyAtLevel(1)}` +
            `${agent.scalesAnomalyProficiency() ? ` → ${agent.anomalyProficiencyAtLevel(60)}` : ""}`
    });

    return agentEmbed;
}

export function printAgentStatsAtLevel(agent: Agent, level: number): any {
    const agentEmbed = generateBaseAgentEmbed(agent);

    agentEmbed.fields.unshift({
        name: `Base stats at Lv${level}`, inline: false,
        value:
            `${Emote.HP_STAT_ICON.emote} **HP:** ${agent.hpAtLevel(level)}` +
            `\n${Emote.ATK_STAT_ICON.emote} **ATK:** ${agent.atkAtLevel(level)}` +
            `\n${Emote.DEF_STAT_ICON.emote} **DEF:** ${agent.defAtLevel(level)}` +
            `${agent.specialFirstCoreStat() ? `\n${agent.firstCoreStat.emote.emote} **${agent.firstCoreStat.name}:** ` +
                `${agent.firstCoreStatAtLevel(level)}` : ""}` +
            `${agent.specialSecondCoreStat() ? `\n${agent.secondCoreStat.emote.emote} **${agent.secondCoreStat.name}:** ` + 
                `${agent.secondCoreStatAtLevel(level)}` : ""}` +
            `\n${Emote.IMPACT_STAT_ICON.emote} **Impact:** ${agent.impactAtLevel(level)}` +
            `\n${Emote.ANOMALY_MASTERY_STAT_ICON.emote} **Anomaly Mastery:** ${agent.anomalyMasteryAtLevel(level)}` +
            `\n${Emote.ANOMALY_PROFICIENCY_STAT_ICON.emote} **Anomaly Proficiency:** ${agent.anomalyProficiencyAtLevel(level)}`
    });

    return agentEmbed;
}