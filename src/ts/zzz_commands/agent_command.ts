import {JsonResponse} from "../model/JsonResponse";
import {InteractionResponseFlags, InteractionResponseType} from "discord-interactions";
import {Agent} from "../model/Agent";
import {printAgentStats, printAgentStatsAtLevel} from "./agent_commands/print_agent_stats";
import {printAgentCore, printAgentCoreAtLevel} from "./agent_commands/print_agent_core";
import {logInteraction} from "../util/log_interaction";
import {printAgentMindscapes, printAgentMindscapesAtLevel} from "./agent_commands/print_agent_mindscapes";

export async function translateAgent(agent: string | null, env: any): Promise<string | null> {
    const agentTranslations = JSON.parse(await env.helpers.get("agent_translations"));

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
            agentInput = option["value"].toLowerCase();

        else if (option["name"] == "what")
            whatInput = option["value"];

        else if (option["name"] == "level")
            levelInput = option["value"];
    });

    const agentId: string | null = await translateAgent(agentInput, env);

    if(agentId) {
        const agent = await Agent.AgentFromId(agentId, env);

        if(levelInput !== null) {
            switch(whatInput) {
            case "stats":
                embed = printAgentStatsAtLevel(agent, bindLevel(1, 60, levelInput), env);
                break;

            case "mindscape":
                embed = printAgentMindscapesAtLevel(agent, bindLevel(1, 6, levelInput), env);
                break;

            default:
            case "core":
                embed = printAgentCoreAtLevel(agent, bindLevel(0, 6, levelInput), env);
            }

        } else {
            switch(whatInput) {
            case "stats":
                embed = printAgentStats(agent, env);
                break;

            case "mindscape":
                embed = printAgentMindscapes(agent, env);
                break;

            default:
            case "core":
                embed = printAgentCore(agent, env);
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

    await logInteraction(interaction, env);
    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: "Couldn't figure out what you want. Maybe ping mama keilo about it?",
            flags: InteractionResponseFlags.EPHEMERAL,
        },
    });
}