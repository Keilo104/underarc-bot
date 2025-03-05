import json
import os


def load_initial_info(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBaseTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["HBEGBJCAGAJ"]:
        i = item["PDJOCPDOOAA"]

        valks[i] = {}
        valks[i]["Id"] = item["PDJOCPDOOAA"]
        valks[i]["Name"] = translation_json[item["KMFMLNCJBEG"]] if item["KMFMLNCJBEG"] in translation_json else item["KMFMLNCJBEG"]
        valks[i]["FullName"] = translation_json[item["MNIHLPPEFNJ"]] if item["MNIHLPPEFNJ"] in translation_json else item["MNIHLPPEFNJ"]
#       valks[i]["Gender"] = item["GIAAGJMPELJ"]
        valks[i]["Faction"] = item["MCPNNKJEOGG"]

def load_avatar_battle_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarBattleTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["HBEGBJCAGAJ"]:
        i = item["PDJOCPDOOAA"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["Specialty"] = item["HPNPPPGKHPJ"]
        valks[i]["Element"] = item["IOOONBLLMDC"]
        valks[i]["DamageType"] = item["IBOCEBFLOLP"]

        valks[i]["Stats"] = {}

        valks[i]["Stats"]["BaseAtk"] = item["LLIKHDBOILH"]
        valks[i]["Stats"]["AtkGrowth"] = item["FPEJPGAPDLH"]
        valks[i]["Stats"]["BaseDef"] = item["KJFJNMEHNHM"]
        valks[i]["Stats"]["DefGrowth"] = item["FHLGLKAHNLB"]
        valks[i]["Stats"]["BaseHp"] = item["FIGGIDEHEKF"]
        valks[i]["Stats"]["HpGrowth"] = item["BECDGBJJDJF"]

        valks[i]["Stats"]["BaseImpact"] = item["MFFEGMOLOPP"]
        valks[i]["Stats"]["BaseAnomalyMastery"] = item["DPNPHFDBDNK"]
        valks[i]["Stats"]["BaseAnomalyProficiency"] = item["PAHFEFJGJLB"]

def load_avatar_level_advance_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarLevelAdvanceTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["HBEGBJCAGAJ"]:
        valk_id = item["HHOLJHONCGL"]
        boost_id = item["ACIPKDPNPLE"]

        if valk_id not in valks:
            valks[valk_id] = { "Id": valk_id }

        if "HpBoosts" not in valks[valk_id]:
            valks[valk_id]["HpBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["AtkBoosts"] = [0, 0, 0, 0, 0, 0]
            valks[valk_id]["DefBoosts"] = [0, 0, 0, 0, 0, 0]

        valks[valk_id]["HpBoosts"][boost_id-1] = item["FIGGIDEHEKF"]
        valks[valk_id]["AtkBoosts"][boost_id-1] = item["LLIKHDBOILH"]
        valks[valk_id]["DefBoosts"][boost_id-1] = item["KJFJNMEHNHM"]

def load_avatar_ui_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarUITemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["HBEGBJCAGAJ"]:
        i = item["PDJOCPDOOAA"]

        if i not in valks:
            valks[i] = { "Id": i }

        valks[i]["SigWeaponId"] = item["EFGDHHENMPE"]

def load_rarity(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/ItemTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["HBEGBJCAGAJ"]:
        i = item["PDJOCPDOOAA"]

        if i in valks:
            valks[i]["Rarity"] = item["APKAKGLCKJD"]


def load_avatar_talent_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarTalentTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["HBEGBJCAGAJ"]:
        i = item["HHOLJHONCGL"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "Cons" not in valks[i]:
            valks[i]["Cons"] = [None, None, None, None, None, None]

        valks[i]["Cons"][item["LIJKFEJKODM"]-1] = {
            "Name": translation_json[item["MHLFMLIJELB"]] if item["MHLFMLIJELB"] in translation_json else item["MHLFMLIJELB"],
            "Effect": translation_json[item["OAICMHLDAHE"]] if item["OAICMHLDAHE"] in translation_json else item["OAICMHLDAHE"],
#           "FlavorText": translation_json[item["JAPKMJGKNOC"]] if item["JAPKMJGKNOC"] in translation_json else item["JAPKMJGKNOC"],
        }

def load_avatar_passive_skill_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarPassiveSkillTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["HBEGBJCAGAJ"]:
        i = item["HHOLJHONCGL"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillInfo" not in valks[i]:
            valks[i]["CoreSkillInfo"] = {}
            valks[i]["CoreSkillInfo"]["FirstCoreStat"] = item["IEJPEDHIGPL"][0]["PDFDEFPOGEK"]
            valks[i]["CoreSkillInfo"]["FirstCoreStatValues"] = [None, None, None, None, None, None]
            valks[i]["CoreSkillInfo"]["SecondCoreStat"] = item["IEJPEDHIGPL"][1]["PDFDEFPOGEK"]
            valks[i]["CoreSkillInfo"]["SecondCoreStatValues"] = [None, None, None, None, None, None]

        for stat in item["IEJPEDHIGPL"]:
            if stat["PDFDEFPOGEK"] == valks[i]["CoreSkillInfo"]["FirstCoreStat"]:
                valks[i]["CoreSkillInfo"]["FirstCoreStatValues"][item["IMMPAGAKNNC"]-1] = stat["CJEPOIEDPDN"]

            if stat["PDFDEFPOGEK"] == valks[i]["CoreSkillInfo"]["SecondCoreStat"]:
                valks[i]["CoreSkillInfo"]["SecondCoreStatValues"][item["IMMPAGAKNNC"]-1] = stat["CJEPOIEDPDN"]

        if item["JHPIIGNKCGN"] == 7:
            for material in item["MLNAIODJCPH"]:
                if material["CJEPOIEDPDN"] == 30:
                    valks[i]["CoreSkillInfo"]["PurpleCoreMat"] = material["NPFMKHODEDF"]

                elif material["CJEPOIEDPDN"] == 4:
                    valks[i]["CoreSkillInfo"]["GoldenCoreMat"] = material["NPFMKHODEDF"]

def load_avatar_skill_level_template(valks, translation_json):
    with open(f"{zenless_data_path}/FileCfg/AvatarSkillLevelTemplateTb.json", "r", encoding="utf-8") as json_file:
        json_to_parse = json.load(json_file)

    for item in json_to_parse["HBEGBJCAGAJ"]:
        i = item["HHOLJHONCGL"]

        if i not in valks:
            valks[i] = { "Id": i }

        if "CoreSkillLevels" not in valks[i]:
            valks[i]["CoreSkillLevels"] = {}
            valks[i]["CoreSkillLevels"]["Name"] = None
            valks[i]["CoreSkillLevels"]["Descriptions"] = [None, None, None, None, None, None, None]

        if item["DBLMCBCMHOK"] == 5:
            valks[i]["CoreSkillLevels"]["Name"] = []
            valks[i]["CoreSkillLevels"]["Descriptions"][item["NMJPLLLGDOG"]-1] = []

            for name in item["KFHDDHJPFLF"]:
                valks[i]["CoreSkillLevels"]["Name"] += [translation_json[name] if name in translation_json else name]

            for name in item["ICAHEFEKMAE"]:
                valks[i]["CoreSkillLevels"]["Descriptions"][item["NMJPLLLGDOG"]-1] += [translation_json[name] if name in translation_json else name]


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
