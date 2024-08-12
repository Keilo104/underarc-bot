import { AutoRouter } from "itty-router";
import { InteractionResponseType, InteractionType, verifyKey } from "discord-interactions";

class JsonResponse extends Response {
    constructor(body?: any, init?: any) {
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

router.get("/", (request, env) => {
    return new Response(`Heyooo ${env.DISCORD_APPLICATION_ID}!! :D`)
});

router.post("/", async (request, env) => {
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
        return new JsonResponse({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: "pong"
            }
        })
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


const server = {
    verifyDiscordRequest,
    fetch: router.fetch,
}

export default server;
