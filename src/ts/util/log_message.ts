import {FigureOutUsername} from "./figure_out_username";
import {InteractionContextType} from "./discord_enums";
import {FigureOutId} from "./figure_out_id";

export async function logMessage(env: any, interaction: any, logging: string[]) {
    const url = `https://discord.com/api/webhooks/${env.LOGGING_WEBHOOK}`;

    const fields: any[] = [];
    let channel: string = "Not in a server";
    const currentDate: number = Math.floor(Date.now() / 1000);

    logging.forEach(log => {
        fields.push({
            name: "", inline: false,
            value: log
        })
    });

    if(interaction.context !== InteractionContextType.PRIVATE_CHANNEL)
        channel = `https://discord.com/channels/${interaction.guild_id}/${interaction.channel_id}`;


    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
            embeds: [
                {
                    title: `Attempt at <t:${currentDate}:T> <t:${currentDate}:R>`,
                    description:
                        `**User:** ${FigureOutUsername(interaction)} <@${FigureOutId(interaction)}>\n` +
                        `**Channel sent:** ${channel}\n` +
                        `**Attempted command:** /${interaction.data.name.toLowerCase()}`,

                    fields: fields
                }
            ]
        })
    });

    if (response.ok) {
        console.log(`Logged an issue successfully!`);

    } else {
        console.error("Error logging issue");
        let errorText = `Error logging issue \n ${response.url}: ${response.status} ${response.statusText}`;

        try {
            const error = await response.text();
            if (error)
                errorText = `${errorText} \n\n ${error}`;

        } catch (err) {
            console.error('Error reading body from request:', err);
        }

        console.error(errorText);
    }
}