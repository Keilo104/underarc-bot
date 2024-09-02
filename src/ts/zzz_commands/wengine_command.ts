import {JsonResponse} from "../util/json_reponse";
import {InteractionResponseFlags, InteractionResponseType} from "discord-interactions";
import {WEngine} from "../model/WEngine";
import {
    printWEngine
} from "./wengine_commands/print_wengine";
import {logMessage} from "../util/log_message";
import {translateAgent} from "./agent_command";
import {Agent} from "../model/Agent";

async function translateWEngine(wengine: string | null, env: any): Promise<string | null> {
    if(wengine == null)
        return null;

    const signatureWeaponStrings = require("../../data/helpers/wengine_signature_translations.json")["wengineSignatureTranslations"];
    const wengineTranslations = require("../../data/helpers/wengine_translations.json");

    let lookingFor = wengine;
    let foundLen = 0;
    let sig = false;

    signatureWeaponStrings.forEach((item: string) => {
        if(wengine.endsWith(item) && item.length > foundLen) {
            lookingFor = wengine.substring(0, wengine.length - item.length);
            foundLen = item.length;
            sig = true;
        }
    });

    if(sig) {
        const agentId = translateAgent(lookingFor);

        if(agentId)
            return `${(await Agent.AgentForWEngine(agentId, env)).signatureWEngineId}`;
    }

    if(wengineTranslations.hasOwnProperty(wengine))
        return wengineTranslations[wengine];

    return null;
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

    const wengineId = await translateWEngine(wengineInput, env);

    if(wengineId) {
        const wengine = await WEngine.WEngineFromId(wengineId, env);

        embed = printWEngine(wengine, levelInput, refinementInput);
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