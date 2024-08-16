import {JsonResponse} from "../util/json_reponse";
import {InteractionResponseFlags, InteractionResponseType} from "discord-interactions";
import {Agent} from "../model/Agent";
import {printAgentStats, printAgentStatsAtLevel} from "./agent_commands/print_agent_stats";

function translateAgent(agent: string | null): string | null {
    const agentTranslations = require("../data/helpers/agent_translations.json");

    if(agent && agentTranslations.hasOwnProperty(agent)){
        return agentTranslations[agent]
    }

    return null;
}

function bindLevel(min: number, max: number, level: number): number {
    if(level > max)
        return max;

    if(level < min)
        return min;

    return level;
}

export async function agentCommandHandler(request: any, env: any): Promise<JsonResponse> {
    let agentInput: string | null = null;
    let whatInput: string = "stats";
    let levelInput: number = 99;

    request.forEach((option: any) => {
        if (option["name"] == "agent")
            agentInput = option["value"];

        else if (option["name"] == "what")
            whatInput = option["value"];

        else if (option["name"] == "level")
            levelInput = option["value"];
    })

    let agentId: string | null = translateAgent(agentInput);

    if(agentId && levelInput == 99) {
        const agentJson = JSON.parse(await env.agents.get(agentId));
        const agent = Agent.AgentFromHakushin(agentJson);

        switch(whatInput) {
            default:
            case "stats":
                return printAgentStats(agent);
        }
    } else if (agentId) {
        const agentJson = JSON.parse(await env.agents.get(agentId));
        const agent = Agent.AgentFromHakushin(agentJson);

        switch(whatInput) {
            default:
            case "stats":
                return printAgentStatsAtLevel(agent, bindLevel(1, 60, levelInput));
        }
    }

    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: "Couldn't figure out what you want. Maybe ping mama keilo about it?",
            flags: InteractionResponseFlags.EPHEMERAL,
        },
    })
}