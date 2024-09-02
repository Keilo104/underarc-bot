import {JsonResponse} from "../util/json_reponse";
import {InteractionResponseFlags, InteractionResponseType} from "discord-interactions";
import {Agent} from "../model/Agent";
import {printAgentStats, printAgentStatsAtLevel} from "./agent_commands/print_agent_stats";
import {printAgentCore, printAgentCoreAtLevel} from "./agent_commands/print_agent_core";
import {logMessage} from "../util/log_message";

export function translateAgent(agent: string | null): string | null {
    const agentTranslations = require("../../data/helpers/agent_translations.json");

    if(agent && agentTranslations.hasOwnProperty(agent)){
        return agentTranslations[agent];
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

export async function agentCommandHandler(interaction: any, env: any): Promise<JsonResponse> {
    let agentInput: string | null = null;
    let whatInput: string = "core";
    let levelInput: number | null = null;
    let embed: any | null = null;

    interaction.data.options.forEach((option: any) => {
        if (option["name"] == "agent")
            agentInput = option["value"];

        else if (option["name"] == "what")
            whatInput = option["value"];

        else if (option["name"] == "level")
            levelInput = option["value"];
    });

    const agentId: string | null = translateAgent(agentInput);

    if(agentId) {
        const agent = await Agent.AgentFromId(agentId, env);

        if(levelInput !== null) {
            switch(whatInput) {
            case "stats":
                embed = printAgentStatsAtLevel(agent, bindLevel(1, 60, levelInput));
                break;

            default:
            case "core":
                embed = printAgentCoreAtLevel(agent, bindLevel(0, 6, levelInput));
            }

        } else {
            switch(whatInput) {
            case "stats":
                embed = printAgentStats(agent);
                break;

            default:
            case "core":
                embed = printAgentCore(agent);
            }
        }
    }

    if (embed) {
        return new JsonResponse({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [
                    embed,
                ],
            },
        });
    }

    await logMessage(env, interaction);
    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: "Couldn't figure out what you want. Maybe ping mama keilo about it?",
            flags: InteractionResponseFlags.EPHEMERAL,
        },
    });
}