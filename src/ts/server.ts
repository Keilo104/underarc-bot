import { AutoRouter, IRequest } from "itty-router";
import { InteractionResponseFlags, InteractionResponseType, InteractionType, verifyKey } from "discord-interactions";
import {
    AGENT_COMMAND,
    EIGHT_BALL_COMMAND,
    GUILD_INSTALL_COMMAND,
    PING_COMMAND, SEND_ISSUE_COMMAND,
    USER_INSTALL_COMMAND, WENGINE_COMMAND,
} from "./commands";
import { Emote } from "./enums/emote";
import { FigureOutUsername } from "./util/figure_out_username";
import {JsonResponse} from "./util/json_reponse";
import {agentCommandHandler } from "./zzz_commands/agent_command";
import {wengineCommandHandler} from "./zzz_commands/wengine_command";
import {logInteraction} from "./util/log_interaction";

const router = AutoRouter();

export interface Env {
    agents: KVNamespace,
    wengines: KVNamespace,
    bangboos: KVNamespace,
}

router.get("/", (_: IRequest, env: any) => {
    return new Response(`Heyo ${env.DISCORD_APPLICATION_ID}!! :D`)
});

router.post("/massUpdate", async (request: IRequest, env: any) => {
    const securityKey = request.headers.get("security-key");

    if (securityKey && securityKey === env.ENDPOINT_KEY) {
        let requestJson: { [k: string]: any } = await request.json();
        let updatedAmount: number = 0;

        if(requestJson.hasOwnProperty("agents")) {
            for(const agent of requestJson["agents"]) {
                await env.agents.put(agent["Id"], JSON.stringify(agent["json"]));
                updatedAmount++;
            }
        }

        if(requestJson.hasOwnProperty("wengines")) {
            for(const wengine of requestJson["wengines"]) {
                await env.wengines.put(wengine["Id"], JSON.stringify(wengine["json"]));
                updatedAmount++;
            }
        }

        if(requestJson.hasOwnProperty("bangboos")) {
            for(const bangboo of requestJson["bangboos"]) {
                await env.bangboos.put(bangboo["Id"], JSON.stringify(bangboo["json"]));
                updatedAmount++;
            }
        }

        return new Response(`Successfully added/updated ${updatedAmount} entries.`, { status: 200 });
    }

    return new Response("Bad request signature.", { status: 401 });
});

router.post("/agents/:agentId", async (request: IRequest, env: any) => {
    const securityKey = request.headers.get("security-key");

    if (securityKey && securityKey === env.ENDPOINT_KEY) {
        let agentJson = await request.json();
        let agentId = request.params.agentId;

        await env.agents.put(agentId, JSON.stringify(agentJson));

        return new Response(`Agent ${agentId} added/updated successfully`, { status: 200 });
    }

    return new Response("Bad request signature.", { status: 401 });
});

router.post("/wengines/:wengineId", async (request: IRequest, env: any) => {
    const securityKey = request.headers.get("security-key");

    if (securityKey && securityKey === env.ENDPOINT_KEY) {
        let wengineJson = await request.json();
        let wengineId = request.params.wengineId;

        await env.wengines.put(wengineId, JSON.stringify(wengineJson));

        return new Response(`W-Engine ${wengineId} added/updated successfully`, { status: 200 });
    }

    return new Response("Bad request signature.", { status: 401 });
});

router.post("/bangboos/:bangbooId", async (request: IRequest, env: any) => {
    const securityKey = request.headers.get("security-key");

    if (securityKey && securityKey === env.ENDPOINT_KEY) {
        let bangbooJson = await request.json();
        let bangbooId = request.params.bangbooId;

        await env.bangboos.put(bangbooId, JSON.stringify(bangbooJson));

        return new Response(`Bangboo ${bangbooId} added/updated successfully`, { status: 200 });
    }

    return new Response("Bad request signature.", { status: 401 });
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
                await logInteraction(env, interaction);

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
