import dotenv from 'dotenv';
import {EIGHT_BALL_COMMAND, GUILD_INSTALL_COMMAND, PING_COMMAND, USER_INSTALL_COMMAND} from "./commands.js";

if (process.argv[2] == "dev")
    dotenv.config({ path: ".dev.vars" });
else if (process.argv[2] == "prod")
    dotenv.config({ path: ".prod.vars" });
else
    throw new Error("Argument is necessary, either dev or prod.");

const token = process.env.DISCORD_TOKEN;
const applicationId = process.env.DISCORD_APPLICATION_ID;

if (!token)
    throw new Error("The DISCORD_TOKEN environment variable is required.");

if (!applicationId)
      throw new Error("The DISCORD_APPLICATION_ID environment variable is required.");

const url = `https://discord.com/api/v10/applications/${applicationId}/commands`;

const response = await fetch(url, {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${token}`,
    },
    method: "PUT",
    body: JSON.stringify([PING_COMMAND, EIGHT_BALL_COMMAND, USER_INSTALL_COMMAND, GUILD_INSTALL_COMMAND]),
});

if (response.ok) {
    console.log(`Registered all commands on bot ${applicationId}`);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

} else {
    console.error("Error registering commands");
    let errorText = `Error registering commands \n ${response.url}: ${response.status} ${response.statusText}`;

    try {
        const error = await response.text();
        if (error)
            errorText = `${errorText} \n\n ${error}`;

    } catch (err) {
        console.error('Error reading body from request:', err);
    }

    console.error(errorText);
}

