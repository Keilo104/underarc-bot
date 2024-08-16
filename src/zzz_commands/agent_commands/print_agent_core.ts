import {Agent} from "../../model/Agent";
import {generateBaseAgentEmbed} from "./generate_base_agent_embed";

export function printAgentCore(agent: Agent) {
    const agentEmbed = generateBaseAgentEmbed(agent);



    agentEmbed.fields.unshift({
        name: "Core skill upgrade materials", inline: false,
        value:
            `${agent.purpleCoreMat.emote.emote} ${agent.purpleCoreMat.purpleCoreMat}\n` +
            `${agent.goldenCoreMat.emote.emote} ${agent.goldenCoreMat.goldenCoreMat}`
    })

    return agentEmbed;
}

export function printAgentCoreAtLevel(agent: Agent, level: number) {
    const agentEmbed = generateBaseAgentEmbed(agent);



    agentEmbed.fields.unshift({
        name: "Core skill upgrade materials", inline: false,
        value:
            `${agent.purpleCoreMat.emote.emote} ${agent.purpleCoreMat.purpleCoreMat}\n` +
            `${agent.goldenCoreMat.emote.emote} ${agent.goldenCoreMat.goldenCoreMat}`
    })

    return agentEmbed;
}