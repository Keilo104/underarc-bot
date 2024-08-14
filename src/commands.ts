import { ApplicationIntegrationType, InteractionContextType } from "./util/discord_enums.js";

export const PING_COMMAND = {
    name: "ping",
    integration_types: [ApplicationIntegrationType.GUILD_INSTALL, ApplicationIntegrationType.USER_INSTALL],
    contexts: [InteractionContextType.GUILD, InteractionContextType.PRIVATE_CHANNEL],
    description: "ping and then it pong",
}

export const GUILD_INSTALL_COMMAND = {
    name: "guild_invite",
    integration_types: [ApplicationIntegrationType.GUILD_INSTALL, ApplicationIntegrationType.USER_INSTALL],
    contexts: [InteractionContextType.GUILD, InteractionContextType.PRIVATE_CHANNEL],
    description: "create a link to invite arcy to your server! :D",
}

export const USER_INSTALL_COMMAND = {
    name: "user_invite",
    integration_types: [ApplicationIntegrationType.GUILD_INSTALL, ApplicationIntegrationType.USER_INSTALL],
    contexts: [InteractionContextType.GUILD, InteractionContextType.PRIVATE_CHANNEL],
    description: "create a link to add arcy to yourself, so you can use her anywhere! :D",
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
        },
    ],
}