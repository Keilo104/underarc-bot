import {WEngine} from "../../model/WEngine";

export function generateBaseWengineEmbed(wengine: WEngine): any {
    console.log(wengine.specialty);

    const wengineEmbed: { [k: string]: any } = {
        title: wengine.name,
        description:
            `${wengine.rarity.gearEmote.emote} ${wengine.specialty.emote.emote} ${"placeholder obtain"}`,
        thumbnail: {
            url: wengine.iconImageUrl,
        },
        color: wengine.embedColor,
        fields: [],
    }

    wengineEmbed.fields.push({
        name: "", inline: false,
        value:
            `${wengine.name} is **blablabla**'s signature W-Engine!`
    });

    if (wengine.releasePatch == null)
        wengineEmbed.footer = {
            text:
                "This entry is from skeleton data left on the game by MiHoYo, it doesn't mean " +
                "this is releasing soon, or at all, and all information is subject to changes before release."
        }

    else if (wengine.releasePatch > 2)
        wengineEmbed.footer = {
            text:
                "This entry is from a future version, all information on it could be " +
                "inaccurate and is subject to changes before release."
        }

    return wengineEmbed;
}