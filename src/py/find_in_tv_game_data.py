import json
import os


def look_in_json(json_to_look, what_to_look_for):
    flag = False

    if type(json_to_look) is list:
        for item in json_to_look:
            flag |= look_in_json(item, what_to_look_for)

    elif type(json_to_look) is dict:
        for item in json_to_look:
            flag |= look_in_json(json_to_look[item], what_to_look_for)

            if item in what_to_look_for:
                # print(f"Key: {item}, item: {json_to_look[item]}")
                flag = True

    elif json_to_look in what_to_look_for:
        # print(f"Text: {json_to_look}")
        flag = True

    return flag


zenless_data_path = os.environ["ZENLESS_DATA_PATH"]

places_to_look = ["FileCfg", "Data", "TextMap"]
what_to_look_for = ["3600", 3600]

for directory in places_to_look:
    for json_file_path in os.listdir(f"{zenless_data_path}/{directory}"):
        with open(f"{zenless_data_path}/{directory}/{json_file_path}", "r", encoding="utf-8") as json_file:
            json_to_look = json.load(json_file)

            if look_in_json(json_to_look, what_to_look_for):
                print(f"Found in {directory}/{json_file_path}")
