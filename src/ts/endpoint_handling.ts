import {AutoRouterType, IRequest} from "itty-router";

export function SetEndpointHandlingRoutes(router: AutoRouterType) {
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

            if(requestJson.hasOwnProperty("helpers")) {
                for(const helper of requestJson["helpers"]) {
                    await env.helpers.put(helper["Id"], JSON.stringify(helper["json"]));
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

    router.post("/helpers/:helperId", async (request: IRequest, env: any) => {
        const securityKey = request.headers.get("security-key");

        if (securityKey && securityKey === env.ENDPOINT_KEY) {
            let helperJson = await request.json();
            let helperId = request.params.helperId;

            await env.helpers.put(helperId, JSON.stringify(helperJson));

            return new Response(`Helper ${helperId} added/updated successfully`, { status: 200 });
        }

        return new Response("Bad request signature.", { status: 401 });
    });
}