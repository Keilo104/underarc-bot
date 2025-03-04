import json
import os


def load_initial_info(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBaseTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["PEPPKLMFFBD"]:
        i = item["GKNMDKNIMHP"]

        valks[i] = {}
        valks[i]["Id"] = item["GKNMDKNIMHP"]
        valks[i]["Name"] = translation_json[item["FJECNNMMDGH"]]
        valks[i]["FullName"] = translation_json[item["KHLFDOBGGFL"]]
        valks[i]["Specialty"] = item["HBHNMKPOKEG"]
#       valks[i]["Gender"] = item["EAKNPAJOAKP"]
        valks[i]["Faction"] = item["JGNLMIEEHMJ"]

        valks[i]["Element"] = item["DFHMFENGHBK"]
        valks[i]["DamageType"] = item["OGNDCHDHLMM"]

def load_avatar_battle_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBattleTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["PEPPKLMFFBD"]:
        i = item["GKNMDKNIMHP"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["Stats"] = {}

        valks[i]["Stats"]["BaseAtk"] = item["LIEPHCPINBE"]
        valks[i]["Stats"]["AtkGrowth"] = item["OHCNIOFFFCJ"]
        valks[i]["Stats"]["BaseDef"] = item["FAKHDGOPGKC"]
        valks[i]["Stats"]["DefGrowth"] = item["IGABBMADKKM"]
        valks[i]["Stats"]["BaseHp"] = item["EAKMNGHGNCD"]
        valks[i]["Stats"]["HpGrowth"] = item["AAOBINJJDIB"]

        valks[i]["Stats"]["BaseImpact"] = item["EOBPGJBFODL"]
        valks[i]["Stats"]["BaseAnomalyMastery"] = item["NNFPCCOFADM"]
        valks[i]["Stats"]["BaseAnomalyProficiency"] = item["LLFEMNOFJGG"]

def load_avatar_level_advance_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarLevelAdvanceTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["PEPPKLMFFBD"]:
        valk_id = item["FLDGKKJPIFL"]
        boost_id = item["BENLJGLCDNH"]

        if valk_id not in valks:
            valks[valk_id] = { "Id": valk_id }

        if "HpBoosts" not in valks[valk_id]:
            valks[valk_id]["HpBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["AtkBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["DefBoosts"] = [0, 0, 0, 0, 0, 0]

        valks[valk_id]["HpBoosts"][boost_id-1] = item["EAKMNGHGNCD"]
        valks[valk_id]["AtkBoosts"][boost_id-1] = item["LIEPHCPINBE"]
        valks[valk_id]["DefBoosts"][boost_id-1] = item["FAKHDGOPGKC"]

def load_avatar_ui_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarUITemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["PEPPKLMFFBD"]:
        i = item["GKNMDKNIMHP"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["SigWeaponId"] = item["GGPCCKPOKNC"]

def load_rarity(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/ItemTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["PEPPKLMFFBD"]:
        i = item["GKNMDKNIMHP"]

        if i in valks:
            valks[i]["Rarity"] = item["ELGACLKAKMD"]


def load_avatar_talent_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarTalentTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["PEPPKLMFFBD"]:
        i = item["FLDGKKJPIFL"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "Cons" not in valks[i]:
            valks[i]["Cons"] = [None, None, None, None, None, None]

        valks[i]["Cons"][item["PJPOKNKLGBI"]-1] = {
            "Name": translation_json[item["JLOMOLNACOB"]] if item["JLOMOLNACOB"] in translation_json else item["JLOMOLNACOB"],
            "Effect": translation_json[item["OGGDKAGJMID"]] if item["OGGDKAGJMID"] in translation_json else item["OGGDKAGJMID"],
#           "FlavorText": translation_json[item["FJPJFFGNBGB"]] if item["FJPJFFGNBGB"] in translation_json else item["FJPJFFGNBGB"],
        }

def load_avatar_passive_skill_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarPassiveSkillTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["PEPPKLMFFBD"]:
        i = item["FLDGKKJPIFL"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillInfo" not in valks[i]:
            valks[i]["CoreSkillInfo"] = {}
            valks[i]["CoreSkillInfo"]["FirstCoreStat"] = item["PJAFLHMAJAG"][0]["PHBMNGICCEH"]
            valks[i]["CoreSkillInfo"]["FirstCoreStatValues"] = [None, None, None, None, None, None]
            valks[i]["CoreSkillInfo"]["SecondCoreStat"] = item["PJAFLHMAJAG"][1]["PHBMNGICCEH"]
            valks[i]["CoreSkillInfo"]["SecondCoreStatValues"] = [None, None, None, None, None, None]

        for stat in item["PJAFLHMAJAG"]:
            if stat["PHBMNGICCEH"] == valks[i]["CoreSkillInfo"]["FirstCoreStat"]:
                valks[i]["CoreSkillInfo"]["FirstCoreStatValues"][item["JAHFDAHIABB"]-1] = stat["ECIJMEMMFLN"]

            if stat["PHBMNGICCEH"] == valks[i]["CoreSkillInfo"]["SecondCoreStat"]:
                valks[i]["CoreSkillInfo"]["SecondCoreStatValues"][item["JAHFDAHIABB"]-1] = stat["ECIJMEMMFLN"]

        if item["MLMGMLENEFO"] == 7:
            for material in item["FICFEIKELBO"]:
                if material["ECIJMEMMFLN"] == 30:
                    valks[i]["CoreSkillInfo"]["PurpleCoreMat"] = material["NKFGFANNKDH"]

                elif material["ECIJMEMMFLN"] == 4:
                    valks[i]["CoreSkillInfo"]["GoldenCoreMat"] = material["NKFGFANNKDH"]

def load_avatar_skill_level_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarSkillLevelTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["PEPPKLMFFBD"]:
        i = item["FLDGKKJPIFL"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillLevels" not in valks[i]:
            valks[i]["CoreSkillLevels"] = {}
            valks[i]["CoreSkillLevels"]["Name"] = None
            valks[i]["CoreSkillLevels"]["Descriptions"] = [None, None, None, None, None, None, None]

        if item["PNFIALEIOFE"] == 5:
            valks[i]["CoreSkillLevels"]["Name"] = []
            valks[i]["CoreSkillLevels"]["Descriptions"][item["NOCFNAPKPMN"]-1] = []

            for name in item["GJDPAIDFKGN"]:
                valks[i]["CoreSkillLevels"]["Name"] += [translation_json[name] if name in translation_json else name]

            for name in item["ADHDMLFPPDI"]:
                valks[i]["CoreSkillLevels"]["Descriptions"][item["NOCFNAPKPMN"]-1] += [translation_json[name] if name in translation_json else name]


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
