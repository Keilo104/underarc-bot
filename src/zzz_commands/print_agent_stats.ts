import {Agent} from "../model/Agent";
import {JsonResponse} from "../util/json_reponse";
import {InteractionResponseType} from "discord-interactions";

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
    return new JsonResponse({

    })
}