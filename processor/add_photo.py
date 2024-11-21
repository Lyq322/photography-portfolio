import os
import json

photo_path = '../my-app/public/birds'
json_path = '../my-app/public/bird-photos.json'

def sort_by_id(json):
  try:
    return int(json['id'])
  except KeyError:
    return 0

with open(json_path, 'r') as photo_json:
  photo_data = json.load(photo_json)
  for folder in os.listdir(photo_path):
    if folder == '.DS_Store' or folder == 'default.png': 
      continue

    if folder not in photo_data:
      photo_data[folder] = []
    for file in sorted(os.listdir(os.path.join(photo_path, folder))):
      if file == '.DS_Store': 
        continue

      file_id = file[:-4]
      found = False
      last_position = 0
      for photo in photo_data[folder]:
        if photo["id"] == int(file_id):
          found = True
          break
        if photo["position"] > last_position:
          last_position = photo["position"]
      
      if not found:
        if file_id == 0:
          print('added', folder, {
            "date": "",
            "location": "",
            "id": file_id,
            "notes": "",
            "info": "",
            "tags": ["hidden"],
            "position": 1
          })
          photo_data[folder].append({
            "date": "",
            "location": "",
            "id": file_id,
            "notes": "",
            "info": "",
            "tags": ["hidden"],
            "position": 1
          })
        else:
          print('added', folder, {
            "date": "",
            "location": "",
            "id": file_id,
            "notes": "",
            "info": "",
            "tags": [],
            "position": last_position + 1
          })
          photo_data[folder].append({
            "date": "",
            "location": "",
            "id": file_id,
            "notes": "",
            "info": "",
            "tags": [],
            "position": last_position + 1
          })
  out_file = open(json_path, 'w')
  print(photo_data)
  json.dump(photo_data, out_file)