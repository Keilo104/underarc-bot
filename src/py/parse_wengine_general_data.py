import json
import os

zenless_data_path = os.environ["ZENLESS_DATA_PATH"]

wengine_general_data = {
    2: {
        "MainstatScaling": [None] * 61,
        "MainstatBoosts": [None] * 6,
        "SubstatBoosts": [None] * 6
    },
    3: {
        "MainstatScaling": [None] * 61,
        "MainstatBoosts": [None] * 6,
        "SubstatBoosts": [None] * 6
    },
    4: {
        "MainstatScaling": [None] * 61,
        "MainstatBoosts": [None] * 6,
        "SubstatBoosts": [None] * 6
    }
}

with open(f"{zenless_data_path}/FileCfg/WeaponLevelTemplateTb.json", "r", encoding="utf-8") as json_file:
    json_to_parse = json.load(json_file)

    for item in json_to_parse["KHHABHLHAFG"]:
        wengine_general_data[item["GNAGJHPOCIO"]]["MainstatScaling"][item["MNCDOKNPIBD"]] = item["EPEPMBDNOLN"]

with open(f"{zenless_data_path}/FileCfg/WeaponStarTemplateTb.json", "r", encoding="utf-8") as json_file:
    json_to_parse = json.load(json_file)

    for item in json_to_parse["KHHABHLHAFG"]:
        wengine_general_data[item["GNAGJHPOCIO"]]["MainstatBoosts"][item["LLLIKCEGBBJ"]] = item["LDIAMGGGFME"]
        wengine_general_data[item["GNAGJHPOCIO"]]["SubstatBoosts"][item["LLLIKCEGBBJ"]] = item["CGMEFNBJIGH"]

with open(f"src/data/wengines/xp_tables.json", "w", encoding="utf-8") as json_file_to_write:
    json_file_to_write.write(json.dumps(wengine_general_data, indent=2))
