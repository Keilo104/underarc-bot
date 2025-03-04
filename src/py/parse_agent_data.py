import json
import os


def load_initial_info(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBaseTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["LFPICNCBMIF"]:
        i = item["FJKECLFEHOA"]

        valks[i] = {}
        valks[i]["Id"] = item["FJKECLFEHOA"]
        valks[i]["Name"] = translation_json[item["JOMJELIIAGO"]]
        valks[i]["FullName"] = translation_json[item["CECKFPJBKFH"]]
        valks[i]["Specialty"] = item["AMBNGBEEMFL"]
#       valks[i]["Gender"] = item["BALHOENJJFI"]
        valks[i]["Faction"] = item["OAPKLLCBIBI"]

        valks[i]["Element"] = item["ONHPDFPEKAJ"]
        valks[i]["DamageType"] = item["HBIHJGEICJM"]

def load_avatar_battle_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBattleTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["LFPICNCBMIF"]:
        i = item["FJKECLFEHOA"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["Stats"] = {}

        valks[i]["Stats"]["BaseAtk"] = item["MNEABICKICA"]
        valks[i]["Stats"]["AtkGrowth"] = item["NBPEEDNHJMB"]
        valks[i]["Stats"]["BaseDef"] = item["EHJMKACFEBG"]
        valks[i]["Stats"]["DefGrowth"] = item["EJOLBJFGOFO"]
        valks[i]["Stats"]["BaseHp"] = item["CFLLEMCHNLF"]
        valks[i]["Stats"]["HpGrowth"] = item["NDBENMNGDGN"]

        valks[i]["Stats"]["BaseImpact"] = item["AIBNGECBKPJ"]
        valks[i]["Stats"]["BaseAnomalyMastery"] = item["BNGJHNAOPHO"]
        valks[i]["Stats"]["BaseAnomalyProficiency"] = item["HBGIDHGJENM"]

def load_avatar_level_advance_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarLevelAdvanceTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["LFPICNCBMIF"]:
        valk_id = item["FBEDJACHNDM"]
        boost_id = item["FNFKBFPMOBI"]

        if valk_id not in valks:
            valks[valk_id] = { "Id": valk_id }

        if "HpBoosts" not in valks[valk_id]:
            valks[valk_id]["HpBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["AtkBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["DefBoosts"] = [0, 0, 0, 0, 0, 0]

        valks[valk_id]["HpBoosts"][boost_id-1] = item["CFLLEMCHNLF"]
        valks[valk_id]["AtkBoosts"][boost_id-1] = item["MNEABICKICA"]
        valks[valk_id]["DefBoosts"][boost_id-1] = item["EHJMKACFEBG"]

def load_avatar_ui_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarUITemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["LFPICNCBMIF"]:
        i = item["FJKECLFEHOA"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["SigWeaponId"] = item["LDBADHDKOPF"]

def load_rarity(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/ItemTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["LFPICNCBMIF"]:
        i = item["FJKECLFEHOA"]

        if i in valks:
            valks[i]["Rarity"] = item["KKNDMODGNCA"]


def load_avatar_talent_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarTalentTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["LFPICNCBMIF"]:
        i = item["FBEDJACHNDM"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "Cons" not in valks[i]:
            valks[i]["Cons"] = [None, None, None, None, None, None]

        valks[i]["Cons"][item["IKEKFKFHGMN"]-1] = {
            "Name": translation_json[item["BJGOOHGAILM"]] if item["BJGOOHGAILM"] in translation_json else item["BJGOOHGAILM"],
            "Effect": translation_json[item["CJPHPNBEBNF"]] if item["CJPHPNBEBNF"] in translation_json else item["CJPHPNBEBNF"],
#           "FlavorText": translation_json[item["NKLPIJKCJNP"]] if item["NKLPIJKCJNP"] in translation_json else item["NKLPIJKCJNP"],
        }

def load_avatar_passive_skill_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarPassiveSkillTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["LFPICNCBMIF"]:
        i = item["FBEDJACHNDM"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillInfo" not in valks[i]:
            valks[i]["CoreSkillInfo"] = {}
            valks[i]["CoreSkillInfo"]["FirstCoreStat"] = item["HHJHJICKDLH"][0]["EHBHELJNBLH"]
            valks[i]["CoreSkillInfo"]["FirstCoreStatValues"] = [None, None, None, None, None, None]
            valks[i]["CoreSkillInfo"]["SecondCoreStat"] = item["HHJHJICKDLH"][1]["EHBHELJNBLH"]
            valks[i]["CoreSkillInfo"]["SecondCoreStatValues"] = [None, None, None, None, None, None]

        for stat in item["HHJHJICKDLH"]:
            if stat["EHBHELJNBLH"] == valks[i]["CoreSkillInfo"]["FirstCoreStat"]:
                valks[i]["CoreSkillInfo"]["FirstCoreStatValues"][item["BJEKKBBKDGJ"]-1] = stat["GICNLDOJJEI"]

            if stat["EHBHELJNBLH"] == valks[i]["CoreSkillInfo"]["SecondCoreStat"]:
                valks[i]["CoreSkillInfo"]["SecondCoreStatValues"][item["BJEKKBBKDGJ"]-1] = stat["GICNLDOJJEI"]

        if item["KDJFMHEMLKC"] == 7:
            for material in item["IMKFGOFDDMK"]:
                if material["GICNLDOJJEI"] == 30:
                    valks[i]["CoreSkillInfo"]["PurpleCoreMat"] = material["CMDJPOHGGBI"]

                elif material["GICNLDOJJEI"] == 4:
                    valks[i]["CoreSkillInfo"]["GoldenCoreMat"] = material["CMDJPOHGGBI"]

def load_avatar_skill_level_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarSkillLevelTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["LFPICNCBMIF"]:
        i = item["FBEDJACHNDM"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillLevels" not in valks[i]:
            valks[i]["CoreSkillLevels"] = {}
            valks[i]["CoreSkillLevels"]["Name"] = None
            valks[i]["CoreSkillLevels"]["Descriptions"] = [None, None, None, None, None, None, None]

        if item["KFPOJBIJGID"] == 5:
            valks[i]["CoreSkillLevels"]["Name"] = []
            valks[i]["CoreSkillLevels"]["Descriptions"][item["FDFDKFIHMNL"]-1] = []

            for name in item["CFHONIFKILL"]:
                valks[i]["CoreSkillLevels"]["Name"] += [translation_json[name] if name in translation_json else name]

            for name in item["NIBDDCMKEFM"]:
                valks[i]["CoreSkillLevels"]["Descriptions"][item["FDFDKFIHMNL"]-1] += [translation_json[name] if name in translation_json else name]


zenless_data_path = os.environ["ZENLESS_DATA_PATH"]

with open(f"{zenless_data_path}/TextMap/TextMap_ENTemplateTb.json", "r", encoding="utf-8") as j_file:
    trans_json = json.load(j_file)

valk_dict = {}

load_initial_info(valk_dict, trans_json)
load_rarity(valk_dict, trans_json)
load_avatar_battle_template(valk_dict, trans_json)
load_avatar_ui_template(valk_dict, trans_json)
load_avatar_level_advance_template(valk_dict, trans_json)
load_avatar_passive_skill_template(valk_dict, trans_json)
load_avatar_skill_level_template(valk_dict, trans_json)
load_avatar_talent_template(valk_dict, trans_json)

for x in valk_dict.values():
    with open(f"src/data/agents/{x['Id']}.json", "w", encoding="utf-8") as json_file_to_write:
        json_file_to_write.write(json.dumps(x, indent=2))

    pass
