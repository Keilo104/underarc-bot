import {InteractionContextType} from "../enums/discord_enums";

export function FigureOutUsername(interaction: any): string {
    if(interaction.context == InteractionContextType.PRIVATE_CHANNEL)
        return interaction.user.global_name;

    else if (interaction.nick != null)
        return interaction.nick;

    return interaction.member.user.global_name;
}