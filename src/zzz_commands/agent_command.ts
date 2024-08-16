import {JsonResponse} from "../util/json_reponse";
import {InteractionResponseFlags, InteractionResponseType} from "discord-interactions";
import {Agent} from "../model/Agent";
import {printAgentStats} from "./print_agent_stats";

function translateAgent(agent: string | null): string | null {
    const agentTranslations = require("../data/helpers/agent_translations.json");

    if(agent && agentTranslations.hasOwnProperty(agent)){
        return agentTranslations[agent]
    }

    return null;
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

    if(agentId) {
        const agentJson = JSON.parse(await env.agents.get(agentId));
        const agent = Agent.AgentFromHakushin(agentJson);

        switch(whatInput) {
            case "stats":
            default:
                return printAgentStats(agent);
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