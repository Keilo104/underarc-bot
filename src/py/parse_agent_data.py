import json
import os


def load_initial_info(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBaseTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["KHHABHLHAFG"]:
        i = item["NGPCCDGBLLK"]

        valks[i] = {}
        valks[i]["Id"] = item["NGPCCDGBLLK"]
        valks[i]["Name"] = translation_json[item["EAAFCGPDFAA"]]
        valks[i]["FullName"] = translation_json[item["JMBNNNBMAOE"]]
        valks[i]["Specialty"] = item["CLLOCPAPPIO"]
#       valks[i]["Gender"] = item["GPIOCOLAHNK"]
        valks[i]["Faction"] = item["HHKFOICCBFG"]

        valks[i]["Element"] = item["DHGDHPJGBEG"]
        valks[i]["DamageType"] = item["LFGOHEMCDLN"]

def load_avatar_battle_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBattleTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["KHHABHLHAFG"]:
        i = item["NGPCCDGBLLK"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["Stats"] = {}

        valks[i]["Stats"]["BaseAtk"] = item["CCNJLICOJJI"]
        valks[i]["Stats"]["AtkGrowth"] = item["ECAOCMKPMCF"]
        valks[i]["Stats"]["BaseDef"] = item["HOLJIPFJMFI"]
        valks[i]["Stats"]["DefGrowth"] = item["PKGJPJCANCF"]
        valks[i]["Stats"]["BaseHp"] = item["LGBMECJMCPJ"]
        valks[i]["Stats"]["HpGrowth"] = item["AOPLMGGHIAK"]

        valks[i]["Stats"]["BaseImpact"] = item["FIIGNCPHJEF"]
        valks[i]["Stats"]["BaseAnomalyMastery"] = item["LMOOJOBDKLP"]
        valks[i]["Stats"]["BaseAnomalyProficiency"] = item["CEADDLHLBHD"]

def load_avatar_level_advance_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarLevelAdvanceTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["KHHABHLHAFG"]:
        valk_id = item["JBHOICBGPLL"]
        boost_id = item["NNGCMMDMJAK"]

        if valk_id not in valks:
            valks[valk_id] = { "Id": valk_id }

        if "HpBoosts" not in valks[valk_id]:
            valks[valk_id]["HpBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["AtkBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["DefBoosts"] = [0, 0, 0, 0, 0, 0]

        valks[valk_id]["HpBoosts"][boost_id-1] = item["LGBMECJMCPJ"]
        valks[valk_id]["AtkBoosts"][boost_id-1] = item["CCNJLICOJJI"]
        valks[valk_id]["DefBoosts"][boost_id-1] = item["HOLJIPFJMFI"]

def load_avatar_ui_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarUITemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["KHHABHLHAFG"]:
        i = item["NGPCCDGBLLK"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["SigWeaponId"] = item["JOCBHGLDHGD"]

def load_rarity(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/ItemTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["KHHABHLHAFG"]:
        i = item["NGPCCDGBLLK"]

        if i in valks:
            valks[i]["Rarity"] = item["GNAGJHPOCIO"]


def load_avatar_talent_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarTalentTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["KHHABHLHAFG"]:
        i = item["JBHOICBGPLL"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "Cons" not in valks[i]:
            valks[i]["Cons"] = [None, None, None, None, None, None]

        valks[i]["Cons"][item["DHGONMEBBDO"]-1] = {
            "Name": translation_json[item["NGLGEBCOHBH"]] if item["NGLGEBCOHBH"] in translation_json else item["NGLGEBCOHBH"],
            "Effect": translation_json[item["FECGMMIGIMK"]] if item["FECGMMIGIMK"] in translation_json else item["FECGMMIGIMK"],
#           "FlavorText": translation_json[item["EOFHFIPIKCG"]] if item["EOFHFIPIKCG"] in translation_json else item["EOFHFIPIKCG"],
        }

def load_avatar_passive_skill_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarPassiveSkillTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["KHHABHLHAFG"]:
        i = item["JBHOICBGPLL"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillInfo" not in valks[i]:
            valks[i]["CoreSkillInfo"] = {}
            valks[i]["CoreSkillInfo"]["FirstCoreStat"] = item["GMBJHDLMMOF"][0]["MJHBFBJALFC"]
            valks[i]["CoreSkillInfo"]["FirstCoreStatValues"] = [None, None, None, None, None, None]
            valks[i]["CoreSkillInfo"]["SecondCoreStat"] = item["GMBJHDLMMOF"][1]["MJHBFBJALFC"]
            valks[i]["CoreSkillInfo"]["SecondCoreStatValues"] = [None, None, None, None, None, None]

        for stat in item["GMBJHDLMMOF"]:
            if stat["MJHBFBJALFC"] == valks[i]["CoreSkillInfo"]["FirstCoreStat"]:
                valks[i]["CoreSkillInfo"]["FirstCoreStatValues"][item["HOHDDABLOBI"]-1] = stat["HLKCJAGFJOB"]

            if stat["MJHBFBJALFC"] == valks[i]["CoreSkillInfo"]["SecondCoreStat"]:
                valks[i]["CoreSkillInfo"]["SecondCoreStatValues"][item["HOHDDABLOBI"]-1] = stat["HLKCJAGFJOB"]

        if item["OHEJNOHFFOL"] == 7:
            for material in item["JLECPLMPEJE"]:
                if material["HLKCJAGFJOB"] == 30:
                    valks[i]["CoreSkillInfo"]["PurpleCoreMat"] = material["NADBGLEMMEH"]

                elif material["HLKCJAGFJOB"] == 4:
                    valks[i]["CoreSkillInfo"]["GoldenCoreMat"] = material["NADBGLEMMEH"]

def load_avatar_skill_level_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarSkillLevelTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["KHHABHLHAFG"]:
        i = item["JBHOICBGPLL"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillLevels" not in valks[i]:
            valks[i]["CoreSkillLevels"] = {}
            valks[i]["CoreSkillLevels"]["Name"] = None
            valks[i]["CoreSkillLevels"]["Descriptions"] = [None, None, None, None, None, None, None]

        if item["KINLEFMCOLJ"] == 5:
            valks[i]["CoreSkillLevels"]["Name"] = []
            valks[i]["CoreSkillLevels"]["Descriptions"][item["KOGIEMPIGGB"]-1] = []

            for name in item["KHDFNAHNJIH"]:
                valks[i]["CoreSkillLevels"]["Name"] += [translation_json[name] if name in translation_json else name]

            for name in item["OPBNJHBDGDD"]:
                valks[i]["CoreSkillLevels"]["Descriptions"][item["KOGIEMPIGGB"]-1] += [translation_json[name] if name in translation_json else name]


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
