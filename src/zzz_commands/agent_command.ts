import {JsonResponse} from "../util/json_reponse";
import {InteractionResponseFlags, InteractionResponseType} from "discord-interactions";
import {Agent} from "../model/Agent";
import {printAgentStats} from "./print_agent_stats";

function translateAgent(agent: string): string {
    const agentTranslations = require("../data/helpers/agent_translations.json");

    if(agentTranslations.hasOwnProperty(agent)){
        return agentTranslations[agent]
    }

    return "";
}

export async function agentCommandHandler(request: any, env: any): Promise<JsonResponse> {
    let agentInput: string = "";
    let whatInput: string = "";
    let levelInput: number = 99;

    request.forEach((option: any) => {
        if (option["name"] == "agent")
            agentInput = option["value"];

        else if (option["name"] == "what")
            whatInput = option["value"];

        else if (option["name"] == "level")
            levelInput = option["value"];
    })

    let agentId: string = translateAgent(agentInput);

    if(agentId !== "") {
        switch(whatInput) {
            case "stats":
            default:
                const agentJson = JSON.parse(await env.agents.get(agentId));
                const agent = Agent.AgentFromHakushin(agentJson);
                console.log(agentJson);

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