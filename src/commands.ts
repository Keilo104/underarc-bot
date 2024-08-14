export const PING_COMMAND = {
    name: "ping",
    description: "ping and then it pong",
}

export const EIGHT_BALL_COMMAND = {
    name: "8ball",
    type: 1,
    description: "ask arcy a question! she will answer.",
    options: [
        {
            name: "question",
            description: "question you want to ask",
            type: 3,
            required: true,
        }
    ]
}