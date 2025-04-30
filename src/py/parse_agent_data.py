import json
import os


def load_initial_info(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBaseTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["MCOOHPLIKCF"]:
        i = item["NHNBEFBOCMH"]

        valks[i] = {}
        valks[i]["Id"] = item["NHNBEFBOCMH"]
        valks[i]["Name"] = translation_json[item["MLGCKOOKMHN"]] if item["MLGCKOOKMHN"] in translation_json else item["MLGCKOOKMHN"]
        valks[i]["FullName"] = translation_json[item["FNLCLFHMFLO"]] if item["FNLCLFHMFLO"] in translation_json else item["FNLCLFHMFLO"]
#       valks[i]["Gender"] = item["HIHGDPAEMOF"]
        valks[i]["Faction"] = item["HNMDAJNCHNF"]

def load_avatar_battle_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBattleTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["MCOOHPLIKCF"]:
        i = item["NHNBEFBOCMH"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["Specialty"] = item["AMPFEKLHKLP"]
        valks[i]["Element"] = item["DEEPEOEHMNG"]
        valks[i]["DamageType"] = item["ACKBPFLIBIE"]

        valks[i]["Stats"] = {}

        valks[i]["Stats"]["BaseAtk"] = item["OJEJACEDIIL"]
        valks[i]["Stats"]["AtkGrowth"] = item["KAFCGCEJHMM"]
        valks[i]["Stats"]["BaseDef"] = item["CKMNFGAOPGL"]
        valks[i]["Stats"]["DefGrowth"] = item["CAKKCNCIAPF"]
        valks[i]["Stats"]["BaseHp"] = item["KMCFEFHEAOI"]
        valks[i]["Stats"]["HpGrowth"] = item["CLGABDPKLDI"]

        valks[i]["Stats"]["BaseImpact"] = item["OMFPODODKOF"]
        valks[i]["Stats"]["BaseAnomalyMastery"] = item["HILDPEOAHGP"]
        valks[i]["Stats"]["BaseAnomalyProficiency"] = item["CCAEMPABCLN"]

def load_avatar_level_advance_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarLevelAdvanceTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["MCOOHPLIKCF"]:
        valk_id = item["CLODPIMNGGD"]
        boost_id = item["BOBCEHHKEFA"]

        if valk_id not in valks:
            valks[valk_id] = { "Id": valk_id }

        if "HpBoosts" not in valks[valk_id]:
            valks[valk_id]["HpBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["AtkBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["DefBoosts"] = [0, 0, 0, 0, 0, 0]

        valks[valk_id]["HpBoosts"][boost_id-1] = item["KMCFEFHEAOI"]
        valks[valk_id]["AtkBoosts"][boost_id-1] = item["OJEJACEDIIL"]
        valks[valk_id]["DefBoosts"][boost_id-1] = item["CKMNFGAOPGL"]

def load_avatar_ui_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarUITemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["MCOOHPLIKCF"]:
        i = item["NHNBEFBOCMH"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["SigWeaponId"] = item["DMCHJGLBBAH"]

def load_rarity(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/ItemTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["MCOOHPLIKCF"]:
        i = item["NHNBEFBOCMH"]

        if i in valks:
            valks[i]["Rarity"] = item["GLPEPLDOFOK"]


def load_avatar_talent_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarTalentTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["MCOOHPLIKCF"]:
        i = item["CLODPIMNGGD"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "Cons" not in valks[i]:
            valks[i]["Cons"] = [None, None, None, None, None, None]

        valks[i]["Cons"][item["GGODPNKOIKJ"]-1] = {
            "Name": translation_json[item["GPGHAMJGDFA"]] if item["GPGHAMJGDFA"] in translation_json else item["GPGHAMJGDFA"],
            "Effect": translation_json[item["NFLMLKJIJHJ"]] if item["NFLMLKJIJHJ"] in translation_json else item["NFLMLKJIJHJ"],
#           "FlavorText": translation_json[item["LJBJMIJHHHB"]] if item["LJBJMIJHHHB"] in translation_json else item["LJBJMIJHHHB"],
        }

def load_avatar_passive_skill_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarPassiveSkillTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["MCOOHPLIKCF"]:
        i = item["CLODPIMNGGD"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillInfo" not in valks[i]:
            valks[i]["CoreSkillInfo"] = {}
            valks[i]["CoreSkillInfo"]["FirstCoreStat"] = item["BCKIFOFJOOJ"][0]["EMNFIAMJHLN"]
            valks[i]["CoreSkillInfo"]["FirstCoreStatValues"] = [None, None, None, None, None, None]
            valks[i]["CoreSkillInfo"]["SecondCoreStat"] = item["BCKIFOFJOOJ"][1]["EMNFIAMJHLN"]
            valks[i]["CoreSkillInfo"]["SecondCoreStatValues"] = [None, None, None, None, None, None]

        for stat in item["BCKIFOFJOOJ"]:
            if stat["EMNFIAMJHLN"] == valks[i]["CoreSkillInfo"]["FirstCoreStat"]:
                valks[i]["CoreSkillInfo"]["FirstCoreStatValues"][item["OKHKDPBLPGN"]-1] = stat["DDPHPKDKLKC"]

            if stat["EMNFIAMJHLN"] == valks[i]["CoreSkillInfo"]["SecondCoreStat"]:
                valks[i]["CoreSkillInfo"]["SecondCoreStatValues"][item["OKHKDPBLPGN"]-1] = stat["DDPHPKDKLKC"]

        if item["PAININPIKKE"] == 7:
            for material in item["CFBIELMLGLL"]:
                if material["DDPHPKDKLKC"] == 30:
                    valks[i]["CoreSkillInfo"]["PurpleCoreMat"] = material["NNHJEGNOAIG"]

                elif material["DDPHPKDKLKC"] == 4:
                    valks[i]["CoreSkillInfo"]["GoldenCoreMat"] = material["NNHJEGNOAIG"]

def load_avatar_skill_level_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarSkillLevelTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["MCOOHPLIKCF"]:
        i = item["CLODPIMNGGD"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillLevels" not in valks[i]:
            valks[i]["CoreSkillLevels"] = {}
            valks[i]["CoreSkillLevels"]["Name"] = None
            valks[i]["CoreSkillLevels"]["Descriptions"] = [None, None, None, None, None, None, None]

        if item["BBHOCMPOHGF"] == 5:
            valks[i]["CoreSkillLevels"]["Name"] = []
            valks[i]["CoreSkillLevels"]["Descriptions"][item["IBFCCFKDHIJ"]-1] = []

            for name in item["JHCAIEAAMHA"]:
                valks[i]["CoreSkillLevels"]["Name"] += [translation_json[name] if name in translation_json else name]

            for name in item["ADHNAMECKCI"]:
                valks[i]["CoreSkillLevels"]["Descriptions"][item["IBFCCFKDHIJ"]-1] += [translation_json[name] if name in translation_json else name]


zenless_data_path = os.environ["ZENLESS_DATA_PATH"]

with open(f"{zenless_data_path}/TextMap/TextMap_ENTemplateTb.json", "r", encoding="utf-8") as j_file:
    trans_json = json.load(j_file)

with open(f"{zenless_data_path}/TextMap/TextMap_ENOverwriteTemplateTb.json", "r", encoding="utf-8") as j_file:
    trans_json.update(json.load(j_file))

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
