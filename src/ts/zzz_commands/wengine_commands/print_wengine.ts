import {WEngine} from "../../model/WEngine";
import {generateBaseWengineEmbed} from "./generate_base_wengine_embed";


export function printWEngine(wengine: WEngine): any {
    const wengineEmbed = generateBaseWengineEmbed(wengine);

    wengineEmbed.fields.unshift({
        name: `${wengine.descName}`, inline: false,
        value: ``
    });

    wengineEmbed.fields.unshift({
        name: "Stats at Lv1 → Lv60", inline: false,
        value: ``
    });

    return wengineEmbed;
}