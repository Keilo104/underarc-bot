import {JsonResponse} from "../util/json_reponse";
import {InteractionResponseFlags, InteractionResponseType} from "discord-interactions";
import {WEngine} from "../model/WEngine";
import {
    printWEngine,
    printWEngineAtLevel,
    printWEngineAtLevelAndRefinement,
    printWEngineAtRefinement
} from "./wengine_commands/print_wengine";
import {logMessage} from "../util/log_message";

function translateWEngine(wengine: string | null): string | null {
    return wengine;
}

export async function wengineCommandHandler(interaction: any, env: any): Promise<JsonResponse> {
    let wengineInput: string | null = null;
    let levelInput: number | null = null;
    let refinementInput: string | null = null;
    let embed: any | null = null;

    interaction.data.options.forEach((option: any) => {
        if (option["name"] == "w-engine")
            wengineInput = option["value"];

        else if (option["name"] == "level")
            levelInput = option["value"];

        else if (option["name"] == "refinement")
            refinementInput = option["value"];
    });

    const wengineId = translateWEngine(wengineInput);

    if(wengineId) {
        const wengine = await WEngine.WEngineFromId(wengineId, env);

        if(levelInput !== null && refinementInput !== null) {
            embed = printWEngineAtLevelAndRefinement(wengine, levelInput, refinementInput);
        } else if (levelInput !== null) {
            embed = printWEngineAtLevel(wengine, levelInput);
        } else if (refinementInput !== null) {
            embed = printWEngineAtRefinement(wengine, refinementInput);
        } else {
            embed = printWEngine(wengine);
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
    })
}