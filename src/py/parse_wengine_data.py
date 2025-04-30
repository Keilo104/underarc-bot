import json
import os


def load_initial_weapon(weapons, translation_json):
    with open(f"{zenless_data_path}/FileCfg/WeaponTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["MCOOHPLIKCF"]:
        i = item["NNHJEGNOAIG"]

        weapons[i] = {}
        weapons[i]["Id"] = item["NNHJEGNOAIG"]
        weapons[i]["Specialty"] = item["PIANEABKLGC"]
        weapons[i]["BaseProp"] = item["AFCKEEJNOBD"]["NCLMGBEIABB"]
        weapons[i]["BasePropValue"] = item["AFCKEEJNOBD"]["JIGPCHENDDM"]
        weapons[i]["SubProp"] = item["HOIAPALHPED"]["NCLMGBEIABB"]
        weapons[i]["SubPropValue"] = item["HOIAPALHPED"]["JIGPCHENDDM"]


def load_item_template(weapons, translation_json):
    with open(f"{zenless_data_path}/FileCfg/ItemTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["MCOOHPLIKCF"]:
        i = item["NHNBEFBOCMH"]

        if i in weapons:
            weapons[i]["Name"] = translation_json[item["MLGCKOOKMHN"]]
            weapons[i]["Rarity"] = item["GLPEPLDOFOK"]

def load_weapon_refinement(weapons, translation_json):
    with open(f"{zenless_data_path}/FileCfg/WeaponTalentTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["MCOOHPLIKCF"]:
        i = item["FNKLFEGBLPA"]

        if i not in weapons:
            weapons[i] = { "Id": i }

        if "Refinements" not in weapons[i]:
            weapons[i]["Refinements"] = {
                "Name": translation_json[item["CNINEGHPOIH"]] if item["CNINEGHPOIH"] in translation_json else item["CNINEGHPOIH"],
                "Descriptions": [None, None, None, None, None],
            }

        weapons[i]["Refinements"]["Descriptions"][item["GPACKNGPHFP"]-1] = translation_json[item["EDKNACLPBNI"]] \
            if item["EDKNACLPBNI"] in translation_json else item["EDKNACLPBNI"]


zenless_data_path = os.environ["ZENLESS_DATA_PATH"]

with open(f"{zenless_data_path}/TextMap/TextMap_ENTemplateTb.json", "r", encoding="utf-8") as j_file:
    trans_json = json.load(j_file)

with open(f"{zenless_data_path}/TextMap/TextMap_ENOverwriteTemplateTb.json", "r", encoding="utf-8") as j_file:
    trans_json.update(json.load(j_file))

weapon_dict = {}

load_initial_weapon(weapon_dict, trans_json)
load_item_template(weapon_dict, trans_json)
load_weapon_refinement(weapon_dict, trans_json)

for x in weapon_dict.values():
    with open(f"src/data/wengines/{x['Id']}.json", "w", encoding="utf-8") as json_file_to_write:
        json_file_to_write.write(json.dumps(x, indent=2))

    pass
