import json
import os


def load_initial_info(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBaseTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["JIJNDLLPCHO"]:
        i = item["DKDDFEIAMIF"]

        valks[i] = {}
        valks[i]["Id"] = item["DKDDFEIAMIF"]
        valks[i]["Name"] = translation_json[item["DEPJKIPACJK"]]
        valks[i]["FullName"] = translation_json[item["JGEPCLEOCJP"]]
        valks[i]["Specialty"] = item["IDPMCJCCDMO"]
#       valks[i]["Gender"] = item["CJOHMMHHPIF"]
        valks[i]["Faction"] = item["HIJMKHADACA"]

        valks[i]["Element"] = item["MCPCLMHBFIN"]
        valks[i]["DamageType"] = item["KPMFACAKMLA"]

def load_avatar_battle_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBattleTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["JIJNDLLPCHO"]:
        i = item["DKDDFEIAMIF"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["Stats"] = {}

        valks[i]["Stats"]["BaseAtk"] = item["DBEGKGCLDKL"]
        valks[i]["Stats"]["AtkGrowth"] = item["GGEIBFDBCGN"]
        valks[i]["Stats"]["BaseDef"] = item["ECHCGODFDDO"]
        valks[i]["Stats"]["DefGrowth"] = item["EKOGNGFFBNH"]
        valks[i]["Stats"]["BaseHp"] = item["EJFCCNOMOJI"]
        valks[i]["Stats"]["HpGrowth"] = item["KKOJGFEIGHJ"]

        valks[i]["Stats"]["BaseImpact"] = item["DOCAICKDHBF"]
        valks[i]["Stats"]["BaseAnomalyMastery"] = item["DIKGBODOALA"]
        valks[i]["Stats"]["BaseAnomalyProficiency"] = item["EOBHPFNJKCF"]

def load_avatar_level_advance_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarLevelAdvanceTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["JIJNDLLPCHO"]:
        valk_id = item["JAOENONJEBK"]
        boost_id = item["KEIJLDEILIC"]

        if valk_id not in valks:
            valks[valk_id] = { "Id": valk_id }

        if "HpBoosts" not in valks[valk_id]:
            valks[valk_id]["HpBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["AtkBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["DefBoosts"] = [0, 0, 0, 0, 0, 0]

        valks[valk_id]["HpBoosts"][boost_id-1] = item["EJFCCNOMOJI"]
        valks[valk_id]["AtkBoosts"][boost_id-1] = item["DBEGKGCLDKL"]
        valks[valk_id]["DefBoosts"][boost_id-1] = item["ECHCGODFDDO"]

def load_avatar_ui_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarUITemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["JIJNDLLPCHO"]:
        i = item["DKDDFEIAMIF"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["SigWeaponId"] = item["FLJJGFAAFKL"]

def load_rarity(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/ItemTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["JIJNDLLPCHO"]:
        i = item["DKDDFEIAMIF"]

        if i in valks:
            valks[i]["Rarity"] = item["BDHLPDHICAC"]


def load_avatar_talent_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarTalentTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["JIJNDLLPCHO"]:
        i = item["JAOENONJEBK"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "Cons" not in valks[i]:
            valks[i]["Cons"] = [None, None, None, None, None, None]

        valks[i]["Cons"][item["HOPBMBBLEEK"]-1] = {
            "Name": translation_json[item["PPJFHLKGHFD"]] if item["PPJFHLKGHFD"] in translation_json else item["PPJFHLKGHFD"],
            "Effect": translation_json[item["NPMCBCBGPBK"]] if item["NPMCBCBGPBK"] in translation_json else item["NPMCBCBGPBK"],
#           "FlavorText": translation_json[item["FKFLJNJIHPJ"]] if item["FKFLJNJIHPJ"] in translation_json else item["FKFLJNJIHPJ"],
        }

def load_avatar_passive_skill_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarPassiveSkillTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["JIJNDLLPCHO"]:
        i = item["JAOENONJEBK"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillInfo" not in valks[i]:
            valks[i]["CoreSkillInfo"] = {}
            valks[i]["CoreSkillInfo"]["FirstCoreStat"] = item["CNLADAKJDDM"][0]["JGOKKOMPHKB"]
            valks[i]["CoreSkillInfo"]["FirstCoreStatValues"] = [None, None, None, None, None, None]
            valks[i]["CoreSkillInfo"]["SecondCoreStat"] = item["CNLADAKJDDM"][1]["JGOKKOMPHKB"]
            valks[i]["CoreSkillInfo"]["SecondCoreStatValues"] = [None, None, None, None, None, None]

        for stat in item["CNLADAKJDDM"]:
            if stat["JGOKKOMPHKB"] == valks[i]["CoreSkillInfo"]["FirstCoreStat"]:
                valks[i]["CoreSkillInfo"]["FirstCoreStatValues"][item["MPLJOLKKHME"]-1] = stat["BIIEPGAOLEG"]

            if stat["JGOKKOMPHKB"] == valks[i]["CoreSkillInfo"]["SecondCoreStat"]:
                valks[i]["CoreSkillInfo"]["SecondCoreStatValues"][item["MPLJOLKKHME"]-1] = stat["BIIEPGAOLEG"]

        if item["HBDEDFJCANJ"] == 7:
            for material in item["MGALBFODABL"]:
                if material["BIIEPGAOLEG"] == 30:
                    valks[i]["CoreSkillInfo"]["PurpleCoreMat"] = material["PAFLDEAPMFJ"]

                elif material["BIIEPGAOLEG"] == 4:
                    valks[i]["CoreSkillInfo"]["GoldenCoreMat"] = material["PAFLDEAPMFJ"]

def load_avatar_skill_level_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarSkillLevelTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["JIJNDLLPCHO"]:
        i = item["JAOENONJEBK"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillLevels" not in valks[i]:
            valks[i]["CoreSkillLevels"] = {}
            valks[i]["CoreSkillLevels"]["Name"] = None
            valks[i]["CoreSkillLevels"]["Descriptions"] = [None, None, None, None, None, None, None]

        if item["NFKJNMDBBIJ"] == 5:
            valks[i]["CoreSkillLevels"]["Name"] = []
            valks[i]["CoreSkillLevels"]["Descriptions"][item["OPGICKHIDMG"]-1] = []

            for name in item["LGGNAPFKENG"]:
                valks[i]["CoreSkillLevels"]["Name"] += [translation_json[name] if name in translation_json else name]

            for name in item["NFJLMOEHCBI"]:
                valks[i]["CoreSkillLevels"]["Descriptions"][item["OPGICKHIDMG"]-1] += [translation_json[name] if name in translation_json else name]


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
