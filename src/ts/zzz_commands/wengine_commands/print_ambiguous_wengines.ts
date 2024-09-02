import {WEngine} from "../../model/WEngine";

export async function printAmbiguousWEngines(wengineInput: string, wengines: string[], env: any): Promise<any> {
    const ambiguousEmbed: { [k: string]: any } = {
        title: `Your search for __${wengineInput}__ is ambiguous, possible options:`,
        description: ``,
    }

    for (const wengineId of wengines) {
        let wengine = await WEngine.WEngineFromIdSlim(wengineId, env);

        ambiguousEmbed.description = `${ambiguousEmbed.description}${wengine.emote.emote} ${wengine.name}\n`;
    }

    return ambiguousEmbed;
}