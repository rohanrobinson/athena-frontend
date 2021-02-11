#make sure to download isear.csv from https://raw.githubusercontent.com/sinmaniphel/py_isear_dataset/master/isear.csv
import csv

# Current Tasks
# - Find an autocorrect/spellchecker R&D. Avoid cloud services...
# - Move processed dictionary to dataset 
# - Apply ML model to current user input. 

def ISEARparser(filename, inputSampleLimit):
    count = 0
    inputSampleCollection = {}
    inputSampleCollection["joy"] = []
    inputSampleCollection["fear"] = []
    inputSampleCollection["anger"] = []
    inputSampleCollection["sadness"] = []
    '''
    inputSampleCollection["disgust"] = []
    inputSampleCollection["shame"] = []
    inputSampleCollection["guilt"] = []'''
    with open(filename, newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in spamreader:
            if count > 0:
                inputSampleObj = {}
                print("\n\tline: "+str(count))
                attributes = row[0]
                attrList = attributes.split("|")
                inputSampleObj["InputSampleID"] = count
                inputSampleObj["Score"] = 'n/a'
                emotion = attrList[:-1][-4]
                if emotion in ["joy", "fear", "anger", "sadness"]:
                    inputSampleObj["InputSample"] = (attrList[-1] + " " + (' '.join(row[1:])) )[:-3].replace(chr(225), "")
                    inputSampleCollection[emotion].append(inputSampleObj)
                    print("InputSample Object: "+str(inputSampleObj))
                    count+=1
            if count==0:
                count+=1
            if count == inputSampleLimit:
                break
        print("\n\Input Sample Collection of "+str(count)+" inputs:\n"+str(inputSampleCollection))
        print(count)
    return inputSampleCollection

collection = ISEARparser('isear.csv', 5000)
'''
ID|CITY|COUN|SUBJ|SEX|AGE|RELI|PRAC|FOCC|MOCC|FIEL|EMOT|WHEN|LONG|INTS|ERGO|TROPHO|TEMPER|EXPRES|
MOVE|EXP1|EXP2|EXP10|PARAL|CON|EXPC|PLEA|PLAN|FAIR|CAUS|COPING|MORL|SELF|RELA|VERBAL|NEUTRO|Field1|
Field3|Field2|MYKEY|SIT|STATE|
'''

