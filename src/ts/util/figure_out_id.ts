import {InteractionContextType} from "./discord_enums";

export function FigureOutId(interaction: any): string {
    if(interaction.context == InteractionContextType.PRIVATE_CHANNEL)
        return interaction.user.id;

    return interaction.member.user.id;
}