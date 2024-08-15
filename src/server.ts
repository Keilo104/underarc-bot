import { AutoRouter, IRequest } from "itty-router";
import { InteractionResponseFlags, InteractionResponseType, InteractionType, verifyKey } from "discord-interactions";
import {EIGHT_BALL_COMMAND, GUILD_INSTALL_COMMAND, PING_COMMAND, USER_INSTALL_COMMAND, ZZZ_COMMAND} from "./commands";
import { Emote } from "./enums/emote";
import { FigureOutUsername } from "./util/figure_out_username";

class JsonResponse extends Response {
    constructor(body: Object, init?: Object) {
        const jsonBody = JSON.stringify(body);
        init = init || {
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
        };

        super(jsonBody, init)
    }
}

const router = AutoRouter();

router.get("/", (_: IRequest, env: any) => {
    return new Response(`Heyo ${env.DISCORD_APPLICATION_ID}!! :D`)
});

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
                })

            case GUILD_INSTALL_COMMAND.name.toLowerCase():
                INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${applicationId}&permissions=2048&integration_type=0&scope=applications.commands+bot`

                return new JsonResponse({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content:INVITE_URL,
                        flags: InteractionResponseFlags.EPHEMERAL,
                    },
                })

            case USER_INSTALL_COMMAND.name.toLowerCase():
                INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${applicationId}&integration_type=1&scope=applications.commands`

                return new JsonResponse({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: INVITE_URL,
                        flags: InteractionResponseFlags.EPHEMERAL,
                    },
                })

            case EIGHT_BALL_COMMAND.name.toLowerCase():
                const eight_ball_answers_json = require("./data/8ball_answers.json")

                return new JsonResponse({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content:
                            `**${FigureOutUsername(interaction)} asked:** ${interaction.data.options[0].value}\n\n` +
                            `${Emote.ARCY_ICON.emote}: ${eight_ball_answers_json["answers"].sample()}`
                    }
                })

            case ZZZ_COMMAND.name.toLowerCase():


            default:
                return new JsonResponse({ error: "Unknown Type" }, { status: 400 })
        }
    }

    console.error("Unknown Type");
    return new JsonResponse({ error: "Unknown Type" }, { status: 400 });
})

router.all("*", () => {
    return new Response("Not Found.", { status: 404 })
});

async function verifyDiscordRequest(request: Request, env: any) {
    const signature = request.headers.get("x-signature-ed25519");
    const timestamp = request.headers.get("x-signature-timestamp");
    const body = await request.text();

    const isValidRequest =
        signature &&
        timestamp &&
        (await verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY))

    if (!isValidRequest) {
        return { isValid: false };
    }

    return { interaction: JSON.parse(body), isValid: true };
}

Array.prototype.sample = function() {
    return this[Math.floor(Math.random() * this.length)]
}

const server = {
    verifyDiscordRequest,
    fetch: router.fetch,
}

export default server;
