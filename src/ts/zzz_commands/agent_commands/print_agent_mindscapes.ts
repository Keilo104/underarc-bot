import {Agent} from "../../model/Agent";
import {generateBaseAgentEmbed} from "./generate_base_agent_embed";


export function printAgentMindscapes(agent: Agent, env: any): any {
    const agentEmbed = generateBaseAgentEmbed(agent, env);

    [5, 3, 1, 0].forEach(item => {
         agentEmbed.fields.unshift({
             name: `M${item+1}: ${agent.consNames[item] ? agent.consNames[item] : "No Data"}`, inline: false,
             value:
                 `${agent.consEffects[item] ? agent.consEffects[item] : "No Data"}`
        });
    });

    return agentEmbed;
}

export function printAgentMindscapesAtLevel(agent: Agent, level: number, env: any): any {
    const agentEmbed = generateBaseAgentEmbed(agent, env);

    agentEmbed.fields.unshift({
         name: `M${level}: ${agent.consNames[level-1] ? agent.consNames[level-1] : "No Data"}`, inline: false,
         value:
             `${agent.consEffects[level-1] ? agent.consEffects[level-1] : "No Data"}`
    });

    return agentEmbed;
}