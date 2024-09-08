import {AutoRouterType, IRequest} from "itty-router";
import {InteractionResponseFlags, InteractionResponseType, InteractionType} from "discord-interactions";
import {JsonResponse} from "./model/JsonResponse";
import {
    AGENT_COMMAND,
    EIGHT_BALL_COMMAND,
    GUILD_INSTALL_COMMAND,
    PING_COMMAND,
    SEND_ISSUE_COMMAND,
    USER_INSTALL_COMMAND, WENGINE_COMMAND
} from "./enums/commands";
import {FigureOutUsername} from "./util/figure_out_username";
import {Emote} from "./enums/emote";
import {logInteraction} from "./util/log_interaction";
import {agentCommandHandler} from "./zzz_commands/agent_command";
import {wengineCommandHandler} from "./zzz_commands/wengine_command";
import server from "./server";

export function SetCommandHandlingRoute(router: AutoRouterType) {
    router.post("/", async (request: IRequest, env: any) => {
        const { isValid, interaction } = await server.verifyDiscordRequest(request, env);

        if (!isValid || !interaction) {
            return new Response("Bad request signature.", { status: 401 });
        }

        if (interaction.type == InteractionType.PING) {
            return new JsonResponse({
                type: InteractionResponseType.PONG,
            });
        }

        if (interaction.type === InteractionType.APPLICATION_COMMAND) {
            const applicationId = env.DISCORD_APPLICATION_ID
            let INVITE_URL: string

            switch (interaction.data.name.toLowerCase()) {
                case PING_COMMAND.name.toLowerCase():
                    return new JsonResponse({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: "pong"
                        }
                    });

                case GUILD_INSTALL_COMMAND.name.toLowerCase():
                    INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${applicationId}&permissions=2048&integration_type=0&scope=applications.commands+bot`

                    return new JsonResponse({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content:INVITE_URL,
                            flags: InteractionResponseFlags.EPHEMERAL,
                        },
                    });

                case USER_INSTALL_COMMAND.name.toLowerCase():
                    INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${applicationId}&integration_type=1&scope=applications.commands`

                    return new JsonResponse({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: INVITE_URL,
                            flags: InteractionResponseFlags.EPHEMERAL,
                        },
                    });

                case EIGHT_BALL_COMMAND.name.toLowerCase():
                    const eight_ball_answers_json = require("../data/8ball_answers.json")

                    return new JsonResponse({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content:
                                `**${FigureOutUsername(interaction)} asked:** ${interaction.data.options[0].value}\n\n` +
                                `${Emote.ARCY_ICON.emote}: ${eight_ball_answers_json["answers"].sample()}`
                        }
                    });

                case SEND_ISSUE_COMMAND.name.toLowerCase():
                    await logInteraction(interaction, env);

                    return new JsonResponse({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: `Thanks for the raised issue! Mama keilo will look at it!`,
                            flags: InteractionResponseFlags.EPHEMERAL,
                        }
                    });

                case AGENT_COMMAND.name.toLowerCase():
                    return await agentCommandHandler(interaction, env);

                case WENGINE_COMMAND.name.toLowerCase():
                    return await wengineCommandHandler(interaction, env);

                default:
                    return new JsonResponse({ error: "Unknown Type" }, { status: 400 })
            }
        }

        console.error("Unknown Type");
        return new JsonResponse({ error: "Unknown Type" }, { status: 400 });
    });
}