import {JsonResponse} from "../model/JsonResponse";
import {InteractionResponseFlags, InteractionResponseType} from "discord-interactions";
import {WEngine} from "../model/WEngine";
import {
    printWEngine
} from "./wengine_commands/print_wengine";
import {logInteraction} from "../util/log_interaction";
import {translateAgent} from "./agent_command";
import {Agent} from "../model/Agent";
import {printAmbiguousWEngines} from "./wengine_commands/print_ambiguous_wengines";

async function translateWEngine(wengine: string | null, env: any): Promise<string | string[] | null> {
    if(wengine == null)
        return null;

    const signatureWeaponStrings = JSON.parse(await env.helpers.get("wengine_signature_translations"))["wengineSignatureTranslations"];
    const wengineTranslations = JSON.parse(await env.helpers.get("wengine_translations"));

    let lookingFor = wengine;
    let foundLen = 0;

    signatureWeaponStrings.forEach((item: string) => {
        if(wengine.endsWith(item) && item.length > foundLen) {
            lookingFor = wengine.substring(0, wengine.length - item.length);
            foundLen = item.length;
        }
    });

    const agentId = await translateAgent(lookingFor, env);

    if(agentId)
        return `${(await Agent.AgentFromIdSlim(agentId, env)).signatureWEngineId}`;

    if(wengineTranslations.hasOwnProperty(wengine))
        return wengineTranslations[wengine];

    return null;
}

export async function wengineCommandHandler(interaction: any, env: any): Promise<JsonResponse> {
    let wengineInput: string | null = null;
    let levelInput: number | null = null;
    let refinementInput: string | null = null;
    let embed: any | null = null;
    let ephemeral = false;

    interaction.data.options.forEach((option: any) => {
        if (option["name"] == "w-engine")
            wengineInput = option["value"].toLowerCase();

        else if (option["name"] == "level")
            levelInput = option["value"];

        else if (option["name"] == "refinement")
            refinementInput = option["value"];
    });

    const wengineId = await translateWEngine(wengineInput, env);

    if(wengineId && wengineInput) {
        if(typeof wengineId == "string"){
            const wengine = await WEngine.WEngineFromId(wengineId, env);

            embed = printWEngine(wengine, levelInput, refinementInput, env);
        } else {
            embed = await printAmbiguousWEngines(wengineInput, wengineId, env);
            ephemeral = true;
        }

    }

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