import json
import os


def load_initial_weapon(weapons, translation_json):
    with open(f"{zenless_data_path}/FileCfg/WeaponTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["GHFLHABGNDH"]:
        i = item["NMHNBHDEKBP"]

        weapons[i] = {}
        weapons[i]["Id"] = item["NMHNBHDEKBP"]
        weapons[i]["Specialty"] = item["LDBDIBAEKDM"]
        weapons[i]["BaseProp"] = item["PEAEKNFCPML"]["PIIPPIBBFBE"]
        weapons[i]["BasePropValue"] = item["PEAEKNFCPML"]["ENCANOPLLDM"]
        weapons[i]["SubProp"] = item["BPFIOCMFACA"]["PIIPPIBBFBE"]
        weapons[i]["SubPropValue"] = item["BPFIOCMFACA"]["ENCANOPLLDM"]


def load_item_template(weapons, translation_json):
    with open(f"{zenless_data_path}/FileCfg/ItemTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["GHFLHABGNDH"]:
        i = item["OPFEAMDPIAG"]

        if i in weapons:
            weapons[i]["Name"] = translation_json[item["MPHLIEKKFIK"]]
            weapons[i]["Rarity"] = item["GPEHNHPCIDC"]

def load_weapon_refinement(weapons, translation_json):
    with open(f"{zenless_data_path}/FileCfg/WeaponTalentTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["GHFLHABGNDH"]:
        i = item["NDLAAEIJICC"]

        if i not in weapons:
            weapons[i] = { "Id": i }

        if "Refinements" not in weapons[i]:
            weapons[i]["Refinements"] = {
                "Name": translation_json[item["AKLFOEACLHE"]] if item["AKLFOEACLHE"] in translation_json else item["AKLFOEACLHE"],
                "Descriptions": [None, None, None, None, None],
            }

        weapons[i]["Refinements"]["Descriptions"][item["IAGGENODCPG"]-1] = translation_json[item["DPFFJOEHBBC"]] \
            if item["DPFFJOEHBBC"] in translation_json else item["DPFFJOEHBBC"]


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
