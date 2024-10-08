import {Agent} from "../../model/Agent";

export function generateBaseAgentEmbed(agent: Agent, env: any): any {
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

    if(agent.signatureWEngine)
        agentEmbed.fields.push({
            name: "", inline: false,
            value:
                `${agent.name}'s signature W-Engine is ` +
                `${agent.signatureWEngine.emote.emote} **${agent.signatureWEngine.name}**`
        });


    if (agent.releasePatch == null)
        agentEmbed.footer = {
            text:
                "This entry is from skeleton data left on the game by MiHoYo, it doesn't mean " +
                "this is releasing soon, or at all, and all information is subject to changes before release."
        }

    else if (agent.releasePatch > env.CURRENT_PATCH)
        agentEmbed.footer = {
            text:
                "This entry is from a future version, all information on it could be " +
                "inaccurate and is subject to changes before release."
        }

    return agentEmbed;
}