import ids_json from "./data/helpers/zzz_ids.json" assert { type: "json" }
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

ids_json.agents.forEach((agentId) => {
    const agentFile = fs.readFileSync(`./src/data/agents/${agentId}.json`, "utf-8");
    const agentJson = JSON.parse(agentFile);

    axios.post(`${endpoint}/agents/${agentId}`, agentJson, {
        headers: {
            "security-key": securityKey
        }
    })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error.message);
        })
})
