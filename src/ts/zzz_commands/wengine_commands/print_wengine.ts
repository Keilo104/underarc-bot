import {WEngine} from "../../model/WEngine";
import {generateBaseWengineEmbed} from "./generate_base_wengine_embed";

export function printWEngine(wengine: WEngine, level: number | null, refinement: number | null, env: any): any {
    const wengineEmbed = generateBaseWengineEmbed(wengine, env);

    if(refinement)
        descriptionAtRefinement(wengine, wengineEmbed, refinement);
    else
        baseDescription(wengine, wengineEmbed);

    if(level)
        statsAtLevel(wengine, wengineEmbed, level);
    else
        baseStats(wengine, wengineEmbed);

    return wengineEmbed;
}

function baseDescription(wengine: WEngine, wengineEmbed: any) {
    wengineEmbed.fields.unshift({
        name: `${wengine.descName}`, inline: false,
        value: `${wengine.meshedDescription()}`
    });
}

function descriptionAtRefinement(wengine: WEngine, wengineEmbed: any, refinement: number) {
    wengineEmbed.fields.unshift({
        name: `${wengine.descName} at p${refinement}`, inline: false,
        value: `${wengine.descValues[refinement-1]}`
    });
}

function baseStats(wengine: WEngine, wengineEmbed: any) {
    wengineEmbed.fields.unshift({
        name: "Stats at Lv1 → Lv60", inline: false,
        value:
            `${wengine.mainStat.emote.emote} **${wengine.mainStat.name}:** ` +
            `${wengine.mainStat.getFormattedStatForWEngine(wengine.mainStatAtLevel(0))} → ${wengine.mainStat.getFormattedStatForWEngine(wengine.mainStatAtLevel(60))}\n` +
            `${wengine.subStat.emote.emote} **${wengine.subStat.name}:** ` +
            `${wengine.subStat.getFormattedStatForWEngine(wengine.subStatAtLevel(0))} → ${wengine.subStat.getFormattedStatForWEngine(wengine.subStatAtLevel(60))}`
    });
}

function statsAtLevel(wengine: WEngine, wengineEmbed: any, level: number) {
    wengineEmbed.fields.unshift({
        name: `Stats at Lv${level}`, inline: false,
        value:
            `${wengine.mainStat.emote.emote} **${wengine.mainStat.name}:** ` +
            `${wengine.mainStat.getFormattedStatForWEngine(wengine.mainStatAtLevel(level))}\n` +
            `${wengine.subStat.emote.emote} **${wengine.subStat.name}:** ` +
            `${wengine.subStat.getFormattedStatForWEngine(wengine.subStatAtLevel(level))}`
    });
}
