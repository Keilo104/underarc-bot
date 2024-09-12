import {Agent} from "../../model/Agent";
import {generateBaseAgentEmbed} from "./generate_base_agent_embed";

export function printAgentCore(agent: Agent, env: any): any {
    const agentEmbed = generateBaseAgentEmbed(agent, env);

    agentEmbed.fields.unshift({
        name: "Core skill upgrade materials", inline: false,
        value:
            `${agent.purpleCoreMat.emote.emote} ${agent.purpleCoreMat.purpleCoreMat}\n` +
            `${agent.goldenCoreMat.emote.emote} ${agent.goldenCoreMat.goldenCoreMat}`
    });

    agentEmbed.fields.unshift({
        name: "Core stat", inline: false,
        value:
            `${agent.firstCoreStat.emote.emote} **${agent.firstCoreStat.name}:** ` +
            `${agent.firstCoreStatAtLevel(1)} → ${agent.firstCoreStatAtLevel(60)}`
    });

    for (let i = agent.coreSkillNames.length - 1 ; i > -1 ; i--) {
        if(agent.coreSkillMeshedDescription(i).length <= 1024)
            agentEmbed.fields.unshift({
                name: agent.coreSkillNames[i], inline: false,
                value: `${agent.coreSkillMeshedDescription(i)}`
            });

        else {
            let coreSkillDescs: string[] = agent.coreSkillMeshedDescription(i).split("\n");

            for (let j = coreSkillDescs.length - 1; j > 0; j--) {
                agentEmbed.fields.unshift({
                    name: "", inline: false,
                    value: `${coreSkillDescs[j]}`
                });
            }

            agentEmbed.fields.unshift({
                name: agent.coreSkillNames[i], inline: false,
                value: `${coreSkillDescs[0]}`
            });
        }
    }

    agentEmbed.fields.unshift({
        name: `Core at Lv0 → LvF`, inline: false,
        value: ``
    });

    return agentEmbed;
}

export function printAgentCoreAtLevel(agent: Agent, level: number, env: any): any {
    const agentEmbed = generateBaseAgentEmbed(agent, env);
    let coreLevels = [0, "A", "B", "C", "D", "E", "F"];
    let coreLevelToRealLevel = [0, 15, 25, 35, 45, 55, 60];

    agentEmbed.fields.unshift({
        name: "Core Skill Upgrade Materials", inline: false,
        value:
            `${agent.purpleCoreMat.emote.emote} ${agent.purpleCoreMat.purpleCoreMat}\n` +
            `${agent.goldenCoreMat.emote.emote} ${agent.goldenCoreMat.goldenCoreMat}`
    });

    agentEmbed.fields.unshift({
        name: `Core stat`, inline: false,
        value:
            `${agent.firstCoreStat.emote.emote} **${agent.firstCoreStat.name}:** ` +
            `${agent.firstCoreStatAtLevel(coreLevelToRealLevel[level])}`
    });

    for (let i = agent.coreSkillNames.length - 1 ; i > -1 ; i--) {
        agentEmbed.fields.unshift({
            name: `${agent.coreSkillNames[i]} at Lv${coreLevels[level]}`, inline: false,
            value: agent.coreSkillDescs[i][level]
        });
    }

    agentEmbed.fields.unshift({
        name: `Core at Lv${coreLevels[level]}`, inline: false,
        value: ``
    });

    return agentEmbed;
}