import {Agent} from "../model/Agent";
import {JsonResponse} from "../util/json_reponse";
import {InteractionResponseType} from "discord-interactions";

export function printAgentStats(agent: Agent): JsonResponse {
    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            embeds: [
                {
                    title: "Test"
                }
            ]
        }
    })
}

export function printAgentStatsAtLevel(agent: Agent, level: number): JsonResponse {
    return new JsonResponse({

    })
}