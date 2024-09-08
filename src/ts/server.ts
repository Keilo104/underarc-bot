import { AutoRouter, IRequest } from "itty-router";
import {SetCommandHandlingRoute} from "./command_handling";
import {SetEndpointHandlingRoutes} from "./endpoint_handling";
import {verifyKey} from "discord-interactions";

const router = AutoRouter();

router.get("/", (_: IRequest, env: any) => {
    return new Response(`Heyo ${env.DISCORD_APPLICATION_ID}!! :D`)
});

SetEndpointHandlingRoutes(router);
SetCommandHandlingRoute(router);

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
