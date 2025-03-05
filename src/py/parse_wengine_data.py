import json
import os


def load_initial_weapon(weapons, translation_json):
    with open(f"{zenless_data_path}/FileCfg/WeaponTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["HBEGBJCAGAJ"]:
        i = item["NPFMKHODEDF"]

        weapons[i] = {}
        weapons[i]["Id"] = item["NPFMKHODEDF"]
        weapons[i]["Specialty"] = item["LEJKBGLJHIA"]
        weapons[i]["BaseProp"] = item["LNNGKOAFIGA"]["ENBFLOFNHMN"]
        weapons[i]["BasePropValue"] = item["LNNGKOAFIGA"]["FDDKBNGCHFE"]
        weapons[i]["SubProp"] = item["IPJKNHIKILJ"]["ENBFLOFNHMN"]
        weapons[i]["SubPropValue"] = item["IPJKNHIKILJ"]["FDDKBNGCHFE"]


def load_item_template(weapons, translation_json):
    with open(f"{zenless_data_path}/FileCfg/ItemTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["HBEGBJCAGAJ"]:
        i = item["PDJOCPDOOAA"]

        if i in weapons:
            weapons[i]["Name"] = translation_json[item["KMFMLNCJBEG"]]
            weapons[i]["Rarity"] = item["APKAKGLCKJD"]

def load_weapon_refinement(weapons, translation_json):
    with open(f"{zenless_data_path}/FileCfg/WeaponTalentTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["HBEGBJCAGAJ"]:
        i = item["NHFANNJGNJE"]

        if i not in weapons:
            weapons[i] = { "Id": i }

        if "Refinements" not in weapons[i]:
            weapons[i]["Refinements"] = {
                "Name": translation_json[item["LLGPLBHCELE"]] if item["LLGPLBHCELE"] in translation_json else item["LLGPLBHCELE"],
                "Descriptions": [None, None, None, None, None],
            }

        weapons[i]["Refinements"]["Descriptions"][item["ONIPHJHNFGN"]-1] = translation_json[item["KHEFPJBLPHO"]] \
            if item["KHEFPJBLPHO"] in translation_json else item["KHEFPJBLPHO"]


zenless_data_path = os.environ["ZENLESS_DATA_PATH"]

with open(f"{zenless_data_path}/TextMap/TextMap_ENTemplateTb.json", "r", encoding="utf-8") as j_file:
    trans_json = json.load(j_file)

weapon_dict = {}

load_initial_weapon(weapon_dict, trans_json)
load_item_template(weapon_dict, trans_json)
load_weapon_refinement(weapon_dict, trans_json)

for x in weapon_dict.values():
    with open(f"src/data/wengines/{x['Id']}.json", "w", encoding="utf-8") as json_file_to_write:
        json_file_to_write.write(json.dumps(x, indent=2))

    pass
