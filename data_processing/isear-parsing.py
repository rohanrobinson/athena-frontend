#make sure to download isear.csv from https://raw.githubusercontent.com/sinmaniphel/py_isear_dataset/master/isear.csv
import csv


#Completely finish getting and cleaning datasets....

#remove weird a character x
#consistent attributes x

def ISEARparser(filename, quoteLimit):
    count = 0
    quoteCollection = {}
    quoteCollection["joy"] = []
    quoteCollection["fear"] = []
    quoteCollection["anger"] = []
    quoteCollection["sadness"] = []
    '''
    quoteCollection["disgust"] = []
    quoteCollection["shame"] = []
    quoteCollection["guilt"] = []'''
    with open(filename, newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in spamreader:
            if count > 0:
                quoteObj = {}
                print("\n\tline: "+str(count))
                attributes = row[0]
                attrList = attributes.split("|")
                quoteObj["QuoteID"] = count
                quoteObj["Score"] = 'n/a'
                emotion = attrList[:-1][-4]
                if emotion in ["joy", "fear", "anger", "sadness"]:
                    quoteObj["Quote"] = (attrList[-1] + " " + (' '.join(row[1:])) )[:-3].replace(chr(225), "")
                    quoteCollection[emotion].append(quoteObj)
                    print("Quote Object: "+str(quoteObj))
                    count+=1
            if count==0:
                count+=1
            if count == quoteLimit:
                break
        print("\n\tQuote Collection of "+str(count)+" quotes:\n"+str(quoteCollection))
        print(count)
    return quoteCollection

collection = ISEARparser('isear.csv', 5000)
'''
ID|CITY|COUN|SUBJ|SEX|AGE|RELI|PRAC|FOCC|MOCC|FIEL|EMOT|WHEN|LONG|INTS|ERGO|TROPHO|TEMPER|EXPRES|
MOVE|EXP1|EXP2|EXP10|PARAL|CON|EXPC|PLEA|PLAN|FAIR|CAUS|COPING|MORL|SELF|RELA|VERBAL|NEUTRO|Field1|
Field3|Field2|MYKEY|SIT|STATE|
'''

