import json
import os


def load_initial_info(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBaseTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["GHFLHABGNDH"]:
        i = item["OPFEAMDPIAG"]

        valks[i] = {}
        valks[i]["Id"] = item["OPFEAMDPIAG"]
        valks[i]["Name"] = translation_json[item["MPHLIEKKFIK"]] if item["MPHLIEKKFIK"] in translation_json else item["MPHLIEKKFIK"]
        valks[i]["FullName"] = translation_json[item["KCANNBMKBBK"]] if item["KCANNBMKBBK"] in translation_json else item["KCANNBMKBBK"]
#       valks[i]["Gender"] = item["GKBGKNKHBHI"]
        valks[i]["Faction"] = item["CGONOJBFCFF"]

def load_avatar_battle_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBattleTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["GHFLHABGNDH"]:
        i = item["OPFEAMDPIAG"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["Specialty"] = item["GPHEJIDOIJJ"]
        valks[i]["Element"] = item["PMBACBCGFCH"]
        valks[i]["DamageType"] = item["MCBEAGMLMNF"]

        valks[i]["Stats"] = {}

        valks[i]["Stats"]["BaseAtk"] = item["PAPCKEHJENB"]
        valks[i]["Stats"]["AtkGrowth"] = item["KPMDGFFGPAF"]
        valks[i]["Stats"]["BaseDef"] = item["NKAPDFEBBKJ"]
        valks[i]["Stats"]["DefGrowth"] = item["IHHFPOKACDA"]
        valks[i]["Stats"]["BaseHp"] = item["EFCFBIFDBJF"]
        valks[i]["Stats"]["HpGrowth"] = item["DEEGLPJFOCI"]

        valks[i]["Stats"]["BaseImpact"] = item["PIFBLNKFJFA"]
        valks[i]["Stats"]["BaseAnomalyMastery"] = item["JOMHJKPKMHH"]
        valks[i]["Stats"]["BaseAnomalyProficiency"] = item["KLHCIKKMDBC"]

def load_avatar_level_advance_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarLevelAdvanceTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["GHFLHABGNDH"]:
        valk_id = item["AMIJIAHGPMC"]
        boost_id = item["IHIEIMELEEH"]

        if valk_id not in valks:
            valks[valk_id] = { "Id": valk_id }

        if "HpBoosts" not in valks[valk_id]:
            valks[valk_id]["HpBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["AtkBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["DefBoosts"] = [0, 0, 0, 0, 0, 0]

        valks[valk_id]["HpBoosts"][boost_id-1] = item["EFCFBIFDBJF"]
        valks[valk_id]["AtkBoosts"][boost_id-1] = item["PAPCKEHJENB"]
        valks[valk_id]["DefBoosts"][boost_id-1] = item["NKAPDFEBBKJ"]

def load_avatar_ui_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarUITemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["GHFLHABGNDH"]:
        i = item["OPFEAMDPIAG"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["SigWeaponId"] = item["BGJPOCDNMML"]

def load_rarity(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/ItemTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["GHFLHABGNDH"]:
        i = item["OPFEAMDPIAG"]

        if i in valks:
            valks[i]["Rarity"] = item["GPEHNHPCIDC"]


def load_avatar_talent_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarTalentTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["GHFLHABGNDH"]:
        i = item["AMIJIAHGPMC"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "Cons" not in valks[i]:
            valks[i]["Cons"] = [None, None, None, None, None, None]

        valks[i]["Cons"][item["JLKGMJIDPEC"]-1] = {
            "Name": translation_json[item["FJEIMKOKDCN"]] if item["FJEIMKOKDCN"] in translation_json else item["FJEIMKOKDCN"],
            "Effect": translation_json[item["NDOCJPHEADC"]] if item["NDOCJPHEADC"] in translation_json else item["NDOCJPHEADC"],
#           "FlavorText": translation_json[item["IBNGGCFJLPN"]] if item["IBNGGCFJLPN"] in translation_json else item["IBNGGCFJLPN"],
        }

def load_avatar_passive_skill_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarPassiveSkillTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["GHFLHABGNDH"]:
        i = item["AMIJIAHGPMC"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillInfo" not in valks[i]:
            valks[i]["CoreSkillInfo"] = {}
            valks[i]["CoreSkillInfo"]["FirstCoreStat"] = item["LLHCBAEJCKF"][0]["HHALEGBBNFO"]
            valks[i]["CoreSkillInfo"]["FirstCoreStatValues"] = [None, None, None, None, None, None]
            valks[i]["CoreSkillInfo"]["SecondCoreStat"] = item["LLHCBAEJCKF"][1]["HHALEGBBNFO"]
            valks[i]["CoreSkillInfo"]["SecondCoreStatValues"] = [None, None, None, None, None, None]

        for stat in item["LLHCBAEJCKF"]:
            if stat["HHALEGBBNFO"] == valks[i]["CoreSkillInfo"]["FirstCoreStat"]:
                valks[i]["CoreSkillInfo"]["FirstCoreStatValues"][item["EPAEIOPFDHH"]-1] = stat["DACOIHOFHDN"]

            if stat["HHALEGBBNFO"] == valks[i]["CoreSkillInfo"]["SecondCoreStat"]:
                valks[i]["CoreSkillInfo"]["SecondCoreStatValues"][item["EPAEIOPFDHH"]-1] = stat["DACOIHOFHDN"]

        if item["OPBIHHKCLPF"] == 7:
            for material in item["LHMIPEMLLLB"]:
                if material["DACOIHOFHDN"] == 30:
                    valks[i]["CoreSkillInfo"]["PurpleCoreMat"] = material["NMHNBHDEKBP"]

                elif material["DACOIHOFHDN"] == 4:
                    valks[i]["CoreSkillInfo"]["GoldenCoreMat"] = material["NMHNBHDEKBP"]

def load_avatar_skill_level_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarSkillLevelTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["GHFLHABGNDH"]:
        i = item["AMIJIAHGPMC"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillLevels" not in valks[i]:
            valks[i]["CoreSkillLevels"] = {}
            valks[i]["CoreSkillLevels"]["Name"] = None
            valks[i]["CoreSkillLevels"]["Descriptions"] = [None, None, None, None, None, None, None]

        if item["GCGPNHPGPLH"] == 5:
            valks[i]["CoreSkillLevels"]["Name"] = []
            valks[i]["CoreSkillLevels"]["Descriptions"][item["HKMOGOBJLPE"]-1] = []

            for name in item["MLABOKJKBFI"]:
                valks[i]["CoreSkillLevels"]["Name"] += [translation_json[name] if name in translation_json else name]

            for name in item["FOLNLNDCLFD"]:
                valks[i]["CoreSkillLevels"]["Descriptions"][item["HKMOGOBJLPE"]-1] += [translation_json[name] if name in translation_json else name]


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
