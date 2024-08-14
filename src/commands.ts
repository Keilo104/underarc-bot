import {ApplicationIntegrationType, InteractionContextType} from "./util/discord_enums";

export const PING_COMMAND = {
    name: "ping",
    integration_types: [ApplicationIntegrationType.GUILD_INSTALL, ApplicationIntegrationType.USER_INSTALL],
    contexts: [InteractionContextType.GUILD, InteractionContextType.PRIVATE_CHANNEL],
    description: "ping and then it pong",
}

export const EIGHT_BALL_COMMAND = {
    name: "8ball",
    type: 1,
    description: "ask arcy a question! she will answer.",
    integration_types: [ApplicationIntegrationType.GUILD_INSTALL, ApplicationIntegrationType.USER_INSTALL],
    contexts: [InteractionContextType.GUILD, InteractionContextType.PRIVATE_CHANNEL],
    options: [
        {
            name: "question",
            description: "question you want to ask",
            type: 3,
            required: true,
        }
    ]
}