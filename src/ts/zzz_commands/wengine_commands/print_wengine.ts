import {WEngine} from "../../model/WEngine";
import {generateBaseWengineEmbed} from "./generate_base_wengine_embed";

export function printWEngine(wengine: WEngine): any {
    const wengineEmbed = generateBaseWengineEmbed(wengine);

    baseDescription(wengine, wengineEmbed);
    baseStats(wengine, wengineEmbed)

    return wengineEmbed;
}

export function printWEngineAtLevel(wengine: WEngine, level: number): any {
    const wengineEmbed = generateBaseWengineEmbed(wengine);

    baseDescription(wengine, wengineEmbed);
    statsAtLevel(wengine, wengineEmbed, level);

    return wengineEmbed;
}

export function printWEngineAtRefinement(wengine: WEngine, refinement: number): any {
    const wengineEmbed = generateBaseWengineEmbed(wengine);

    descriptionAtRefinement(wengine, wengineEmbed, refinement);
    baseStats(wengine, wengineEmbed);

    return wengineEmbed;
}

export function printWEngineAtLevelAndRefinement(wengine: WEngine, level: number, refinement: number): any {
    const wengineEmbed = generateBaseWengineEmbed(wengine);

    descriptionAtRefinement(wengine, wengineEmbed, refinement);
    statsAtLevel(wengine, wengineEmbed, level);

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
