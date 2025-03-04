import {JsonResponse} from "../model/JsonResponse";
import {InteractionResponseFlags, InteractionResponseType} from "discord-interactions";
import {logInteraction} from "../util/log_interaction";
import {Emote} from "../enums/emote";
import {FigureOutId} from "../util/figure_out_id";

export async function callQuoteCommand(interaction: any, env: any): Promise<JsonResponse> {
    let userId: string = FigureOutId(interaction);
    let quotes: any = JSON.parse(await env.quotes.get(userId) ?? "{}");
    let quoteName: string | null = null, quoteContent: string | null = null;

    interaction.data.options.forEach((option: any) => {
        if (option["name"] == "quote")
            quoteName = option["value"].toLowerCase();
    });

    if (quoteName != null) {
        if (quotes.hasOwnProperty(quoteName)) {
            quoteContent = quotes[quoteName];

            return new JsonResponse({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `\`${quoteName}\` ${Emote.MEGAPHONE.emote} ${quoteContent}`,
                }
            });
        }

        return new JsonResponse({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Quote \`${quoteName}\` not found.`,
                flags: InteractionResponseFlags.EPHEMERAL,
            }
        });
    }

    await logInteraction(interaction, env);
    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `i'll be honest chief i don't even know how you did this`,
            flags: InteractionResponseFlags.EPHEMERAL,
        }
    });
}

export async function addQuoteCommand(interaction: any, env: any): Promise<JsonResponse> {
    let userId: string = FigureOutId(interaction);
    let quotes: any = JSON.parse(await env.quotes.get(userId) ?? "{}");
    let quoteName: any, quoteContent: any;

    interaction.data.options.forEach((option: any) => {
        if (option["name"] == "quote")
            quoteName = option["value"].toLowerCase();

        else if (option["name"] == "content")
            quoteContent = option["value"];
    });

    let updateFlag: boolean = quotes.hasOwnProperty(quoteName);
    quotes[quoteName] = quoteContent;

    await env.quotes.put(userId, JSON.stringify(quotes));

    if (updateFlag) {
        return new JsonResponse({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Updated quote \`${quoteName}\` successfully!\n\n` +
                    `\`${quoteName}\` ${Emote.MEGAPHONE.emote} ${quoteContent}`,
                flags: InteractionResponseFlags.EPHEMERAL,
            }
        });
    }

    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `Added quote \`${quoteName}\` successfully!\n\n` +
                `\`${quoteName}\` ${Emote.MEGAPHONE.emote} ${quoteContent}`,
            flags: InteractionResponseFlags.EPHEMERAL,
        }
    });
}

export async function deleteQuoteCommand(interaction: any, env: any): Promise<JsonResponse> {
    let userId: string = FigureOutId(interaction);
    let quotes: any = JSON.parse(await env.quotes.get(userId) ?? "{}");
    let quoteName: string | null = null;

    interaction.data.options.forEach((option: any) => {
        if (option["name"] == "quote")
            quoteName = option["value"].toLowerCase();
    });

    if (quoteName != null) {
        if (quotes.hasOwnProperty(quoteName)) {

            delete quotes[quoteName];
            await env.quotes.put(userId, JSON.stringify(quotes));

            return new JsonResponse({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `\`${quoteName}\` deleted successfully.`,
                    flags: InteractionResponseFlags.EPHEMERAL,
                }
            });
        }

        return new JsonResponse({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Quote \`${quoteName}\` not found to be deleted.`,
                flags: InteractionResponseFlags.EPHEMERAL,
            }
        });
    }

    await logInteraction(interaction, env);
    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `i'll be honest chief i don't even know how you did this`,
            flags: InteractionResponseFlags.EPHEMERAL,
        }
    });
}