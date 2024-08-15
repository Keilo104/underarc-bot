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

export const AGENT_COMMAND = {
    name: "agent",
    type: 1,
    integration_types: [ApplicationIntegrationType.GUILD_INSTALL, ApplicationIntegrationType.USER_INSTALL],
    contexts: [InteractionContextType.GUILD, InteractionContextType.PRIVATE_CHANNEL],
    description: "ask for information from a zzz agent!",
    options: [
        {
            name: "agent",
            description: "the agent you wish to ask for!",
            type: 3,
            required: true,
        },

        {
            name: "what",
            description: "what of the agent to show!",
            type: 3,
            required: false,
            choices: [
                {
                    name: "Stats",
                    value: "stats"
                }
            ]
        },

        {
            name: "level",
            description: "level of what you want to show!",
            type: 4,
            required: false,
            min_value: 0,
            max_value: 60,
        }
    ]
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