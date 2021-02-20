#make sure to download isear.csv from https://raw.githubusercontent.com/sinmaniphel/py_isear_dataset/master/isear.csv
import csv
import random
# AI/ML Goals by 2/17/2021
# R & D
# - Find an autocorrect/spellchecker R&D.  ....... 
# Baseline
# - Work w/ backend team to store default quotes from webscraper.
# - Apply ML model to current user input. 
# - - Should be able to take input and categorize it according to sentiment... <Modified tone analyzer>
# - - Measuring IBM Tone Analyzer Accuracy on train data

def ISEARparser(filename, inputSampleLimit, k):
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
        visited_rows = []
        while count < inputSampleLimit: #no more than 70 percent of csv file
            for row in spamreader:
                randSelection = random.uniform(0, 1) # randSelection outputs random float btwn 0 and 1.
                if count >= 0 and randSelection > k and spamreader.line_num not in visited_rows:
                    visited_rows.append(spamreader.line_num)
                    inputSampleObj = {}
                    #print("\n\tline: "+str(count))
                    attributes = row[0]
                    attrList = attributes.split("|")
                    inputSampleObj["InputSampleID"] = count
                    inputSampleObj["Score"] = 'n/a'
                    emotion = attrList[:-1][-4]
                    if emotion in ["joy", "fear", "anger", "sadness"]:
                        inputSampleObj["InputSample"] = (attrList[-1] + " " + (' '.join(row[1:])) )[:-3].replace(chr(225), "")
                        inputSampleCollection[emotion].append(inputSampleObj)
                        count+=1
                    if count >= inputSampleLimit:
                        break
        print("last line number reached in isear.csv was: "+str(spamreader.line_num)+"\n")
        #print("\n\Input Sample Collection of "+str(count)+" inputs:\n"+str(inputSampleCollection))
        #print(count)
    return inputSampleCollection

#print(ISEARparser('isear.csv', 100, 0.5))

'''
ID|CITY|COUN|SUBJ|SEX|AGE|RELI|PRAC|FOCC|MOCC|FIEL|EMOT|WHEN|LONG|INTS|ERGO|TROPHO|TEMPER|EXPRES|
MOVE|EXP1|EXP2|EXP10|PARAL|CON|EXPC|PLEA|PLAN|FAIR|CAUS|COPING|MORL|SELF|RELA|VERBAL|NEUTRO|Field1|
Field3|Field2|MYKEY|SIT|STATE|
'''

