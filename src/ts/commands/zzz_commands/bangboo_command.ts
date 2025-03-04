import {JsonResponse} from "../../model/JsonResponse";
import {InteractionResponseFlags, InteractionResponseType} from "discord-interactions";
import {logInteraction} from "../../util/log_interaction";

export async function bangbooCommandHandler(interaction: any, env: any): Promise<JsonResponse> {
    let bangbooInput: string | null = null;
    let whatInput: string = "stats";
    let levelInput: number | null = null;
    let embed: any | null = null;
    let ephemeral: boolean = false;

    interaction.data.options.forEach((option: any) => {
        if (option["name"] == "agent")
            bangbooInput = option["value"].toLowerCase();

        else if (option["name"] == "what")
            whatInput = option["value"];

        else if (option["name"] == "level")
            levelInput = option["value"];
    });

    if (embed) {
        return new JsonResponse({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                flags: ephemeral ? InteractionResponseFlags.EPHEMERAL : 0,
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
    })
}