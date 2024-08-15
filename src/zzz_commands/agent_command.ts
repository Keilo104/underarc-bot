import {JsonResponse} from "../util/json_reponse";
import {InteractionResponseFlags, InteractionResponseType} from "discord-interactions";

export function agent_command_handler(request: string): JsonResponse {


    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: "Couldn't figure out what you want. Maybe ping mama keilo about it?",
            flags: InteractionResponseFlags.EPHEMERAL,
        },
    })
}