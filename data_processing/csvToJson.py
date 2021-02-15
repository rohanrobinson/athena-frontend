import csv
import json
 
# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):
     
    # create a dictionary
    data = []

    csvfile = open(csvFilePath, 'r')
    reader = csv.reader(csvfile)

    for row in reader:
        print(row[0])
        print(row[1])
        dictionary = {}
        dictionary["quote"] = row[0]
        dictionary["writer"] = row[1]
        data.append(dictionary)
     

    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
 
# Call the make_json function
make_json('cleaned_sad_quotes.csv', 'sad_quotes.json')
make_json('cleaned_anger_quotes.csv', 'anger_quotes.json')
make_json('cleaned_happy_quotes.csv', 'happy_quotes.json')
make_json('cleaned_fear_quotes.csv', 'fear_quotes.json')