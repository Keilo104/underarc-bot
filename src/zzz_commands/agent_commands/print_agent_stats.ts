import {Agent} from "../../model/Agent";
import {JsonResponse} from "../../util/json_reponse";
import {InteractionResponseType} from "discord-interactions";
import {Emote} from "../../enums/emote";

function generateBaseAgentEmbed(agent: Agent) {
    const agentEmbed: { [k: string]: any } = {
        title: agent.fullName ? agent.fullName : agent.name,
        description:
            `${agent.faction.emote.emote} • ${agent.faction.faction}\n` +
            `${agent.rarity.agentEmote.emote} ${agent.element.emote.emote} ` +
            `${agent.specialty.emote.emote} ${agent.damageType.emote.emote}`,
        thumbnail: {
            url: agent.iconImageUrl,
        },
        color: agent.embedColor,
        fields: [],
    }

    if (agent.releasePatch == null)
        agentEmbed.footer = {
            text:
                "This entry is from skeleton data left on the game by MiHoYo, it doesn't mean " +
                "this is releasing soon, or at all, and all information is subject to changes before release."
        }

    else if (agent.releasePatch > 2)
        agentEmbed.footer = {
            text:
                "This entry is from a future version, all information on it could be " +
                "inaccurate and is subject to changes before release."
        }

    return agentEmbed;
}


export function printAgentStats(agent: Agent): JsonResponse {
    const agentEmbed = generateBaseAgentEmbed(agent);

    agentEmbed.fields.push({
        name: "Base stats at Lv1 → Lv60", inline: false,
        value:
            `${Emote.HP_STAT_ICON.emote} **HP:** ${agent.hpAtLevel(1)} → ${agent.hpAtLevel(60)}` +
            `\n${Emote.ATK_STAT_ICON.emote} **ATK:** ${agent.atkAtLevel(1)} → ${agent.atkAtLevel(60)}` +
            `\n${Emote.DEF_STAT_ICON.emote} **DEF:** ${agent.defAtLevel(1)} → ${agent.defAtLevel(60)}` +
            `${agent.specialFirstCoreStat() ? `\n${agent.firstCoreStat.emote.emote} **${agent.firstCoreStat.displayName}:** ` +
                `${agent.firstCoreStatAtLevel(1)} → ${agent.firstCoreStatAtLevel(60)}` : ""}` +
            `${agent.specialSecondCoreStat() ? `\n${agent.secondCoreStat.emote.emote} **${agent.secondCoreStat.displayName}:** ` + 
                `${agent.secondCoreStatAtLevel(1)} → ${agent.secondCoreStatAtLevel(60)}` : ""}` +
            `\n${Emote.IMPACT_STAT_ICON.emote} **Impact:** ${agent.impactAtLevel(1)}` +
            `${agent.scalesImpact() ? ` → ${agent.impactAtLevel(60)}` : ""}` +
            `\n${Emote.ANOMALY_MASTERY_STAT_ICON.emote} **Anomaly Mastery:** ${agent.anomalyMasteryAtLevel(1)}` +
            `${agent.scalesAnomalyMastery() ? ` → ${agent.anomalyMasteryAtLevel(60)}` : ""}` +
            `\n${Emote.ANOMALY_PROFICIENCY_STAT_ICON.emote} **Anomaly Proficiency:** ${agent.anomalyProficiencyAtLevel(1)}` +
            `${agent.scalesAnomalyProficiency() ? ` → ${agent.anomalyProficiencyAtLevel(60)}` : ""}`
    });

    agentEmbed.fields.push({
        name: "Core skill upgrade materials", inline: false,
        value:
            `${agent.purpleCoreMat.emote.emote} ${agent.purpleCoreMat.purpleCoreMat}\n` +
            `${agent.goldenCoreMat.emote.emote} ${agent.goldenCoreMat.goldenCoreMat}`
    });

    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            embeds: [
                agentEmbed,
            ]
        }
    })
}

export function printAgentStatsAtLevel(agent: Agent, level: number): JsonResponse {
    const agentEmbed = generateBaseAgentEmbed(agent);

    agentEmbed.fields.push({
        name: `Base stats at Lv${level}`, inline: false,
        value:
            `${Emote.HP_STAT_ICON.emote} **HP:** ${agent.hpAtLevel(level)}` +
            `\n${Emote.ATK_STAT_ICON.emote} **ATK:** ${agent.atkAtLevel(level)}` +
            `\n${Emote.DEF_STAT_ICON.emote} **DEF:** ${agent.defAtLevel(level)}` +
            `${agent.specialFirstCoreStat() ? `\n${agent.firstCoreStat.emote.emote} **${agent.firstCoreStat.displayName}:** ` +
                `${agent.firstCoreStatAtLevel(level)}` : ""}` +
            `${agent.specialSecondCoreStat() ? `\n${agent.secondCoreStat.emote.emote} **${agent.secondCoreStat.displayName}:** ` + 
                `${agent.secondCoreStatAtLevel(level)}` : ""}` +
            `\n${Emote.IMPACT_STAT_ICON.emote} **Impact:** ${agent.impactAtLevel(level)}` +
            `\n${Emote.ANOMALY_MASTERY_STAT_ICON.emote} **Anomaly Mastery:** ${agent.anomalyMasteryAtLevel(level)}` +
            `\n${Emote.ANOMALY_PROFICIENCY_STAT_ICON.emote} **Anomaly Proficiency:** ${agent.anomalyProficiencyAtLevel(level)}`
    });

    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            embeds: [
                agentEmbed,
            ]
        }
    })
}