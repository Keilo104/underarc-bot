import ids_json from "../../data/helpers/zzz_ids.json" assert { type: "json" }
import agent_helper from "../../data/helpers/agent_extra_infos.json" assert { type: "json" }
import wengine_helper from "../../data/helpers/wengine_extra_infos.json" assert { type: "json" }
import bangboo_helper from "../../data/helpers/bangboo_extra_infos.json" assert { type: "json" }
import helpers_helper from "../../data/helpers/helpers_helper.json" assert { type: "json" }
import fs from "node:fs";
import axios from "axios";
import dotenv from "dotenv";

if (process.argv[2] == "dev")
    dotenv.config({ path: ".dev.vars" });
else if (process.argv[2] == "prod")
    dotenv.config({ path: ".prod.vars" });
else
    throw new Error("Argument is necessary, either dev or prod.");

const endpoint = process.env.ENDPOINT;
const securityKey = process.env.ENDPOINT_KEY;

const jsonResponse: { [k: string]: any } = {}

jsonResponse["agents"] = [];

ids_json.agents.forEach((agentId: string) => {
    let agentFile: string, agentJson: any;

    if("source" in agent_helper[agentId as keyof Object]) {
        agentFile = fs.readFileSync(`./src/data/hakushin_data/${agentId}.json`, "utf-8");
        agentJson = JSON.parse(agentFile);
    } else {
        agentFile = fs.readFileSync(`./src/data/agents/${agentId}.json`, "utf-8");
        agentJson = JSON.parse(agentFile);
    }

    jsonResponse["agents"].push({
        "Id": agentId,
        "json": agentJson,
    });
});

jsonResponse["wengines"] = [];

ids_json.wengines.forEach((wengineId: string) => {
    let wengineFile: string, wengineJson: any;

    if("source" in wengine_helper[wengineId as keyof Object]) {
        wengineFile = fs.readFileSync(`./src/data/hakushin_data/${wengineId}.json`, "utf-8");
        wengineJson = JSON.parse(wengineFile);
    } else {
        wengineFile = fs.readFileSync(`./src/data/wengines/${wengineId}.json`, "utf-8");
        wengineJson = JSON.parse(wengineFile);
    }

    jsonResponse["wengines"].push({
        "Id": wengineId,
        "json": wengineJson,
    });
});

jsonResponse["bangboos"] = [];

ids_json.bangboos.forEach((bangbooId: string) => {
    let bangbooFile: string, bangbooJson: any;

    if("source" in bangboo_helper[bangbooId as keyof Object]) {
        bangbooFile = fs.readFileSync(`./src/data/hakushin_data/${bangbooId}.json`, "utf-8");
        bangbooJson = JSON.parse(bangbooFile);
    } else {
        bangbooFile = fs.readFileSync(`./src/data/bangboos/${bangbooId}.json`, "utf-8");
        bangbooJson = JSON.parse(bangbooFile);
    }

    jsonResponse["bangboos"].push({
        "Id": bangbooId,
        "json": bangbooJson,
    });
});

jsonResponse["helpers"] = [];

helpers_helper.helpers.forEach((helperId: string) => {
    let helperFile = fs.readFileSync(`./src/data/helpers/${helperId}.json`, "utf-8");
    let helperJson = JSON.parse(helperFile);

    jsonResponse["helpers"].push({
        "Id": helperId,
        "json": helperJson,
    });
});

axios.post(`${endpoint}/massUpdate`, jsonResponse, {
    headers: {
        "security-key": securityKey
    }
})
.then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.error(error.message);
});
