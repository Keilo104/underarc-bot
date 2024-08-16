import {Agent} from "../../model/Agent";
import {generateBaseAgentEmbed} from "./generate_base_agent_embed";

export function printAgentCore(agent: Agent) {
    const agentEmbed = generateBaseAgentEmbed(agent);

    agentEmbed.fields.unshift({
        name: "Core skill upgrade materials", inline: false,
        value:
            `${agent.purpleCoreMat.emote.emote} ${agent.purpleCoreMat.purpleCoreMat}\n` +
            `${agent.goldenCoreMat.emote.emote} ${agent.goldenCoreMat.goldenCoreMat}`
    });

    agentEmbed.fields.unshift({
        name: "Core Stat Lv0 → LvF", inline: false,
        value:
            `${agent.firstCoreStat.emote.emote} **${agent.firstCoreStat.displayName}:** ` +
            `${agent.firstCoreStatAtLevel(1)} → ${agent.firstCoreStatAtLevel(60)}`
    });

    for (let i = agent.coreSkillNames.length - 1 ; i > -1 ; i--) {
        agentEmbed.fields.unshift({
            name: agent.coreSkillNames[i], inline: false,
            value: `${agent.coreSkillMeshedDescription(i)}`
        })
    }

    return agentEmbed;
}

export function printAgentCoreAtLevel(agent: Agent, level: number) {
    const agentEmbed = generateBaseAgentEmbed(agent);
    let coreLevels = [0, "A", "B", "C", "D", "E", "F"];

    agentEmbed.fields.unshift({
        name: "Core Skill Upgrade Materials", inline: false,
        value:
            `${agent.purpleCoreMat.emote.emote} ${agent.purpleCoreMat.purpleCoreMat}\n` +
            `${agent.goldenCoreMat.emote.emote} ${agent.goldenCoreMat.goldenCoreMat}`
    });

    agentEmbed.fields.unshift({
        name: "this isn't working btw", inline: false,
        value: "i'm working on it, i'm working on it"
    });

    agentEmbed.fields.unshift({
        name: `Core Stat at Lv${coreLevels[level]}`, inline: false,
        value:
            `${agent.firstCoreStat.emote.emote} **${agent.firstCoreStat.displayName}:** ` +
            `${agent.firstCoreStatAtLevel(level)}`
    });

    return agentEmbed;
}