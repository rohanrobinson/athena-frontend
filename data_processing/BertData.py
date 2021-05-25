import csv
#from bookParser import bookParse
import datasets #pip install datasets
from random import shuffle
import pandas as pd
from IPython.display import display, HTML
from datasets import list_datasets, load_dataset, list_metrics, load_metric
import sys

csv.field_size_limit(sys.maxsize)

def getNumJargon(filename, limit, startingIdx):
    count = 0
    quoteObjArr = []
    with open(filename, newline='') as csvfile:
        quotereader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in quotereader:
            split_quote = (' '.join(row))
            # Get rid of initial number and comma; ie: [3,]Hippety Hopper returns in McKimsons Pop Im Pop.
            i=0
            char = split_quote[i]
            while char != ',':
                i+=1
                char = split_quote[i]
            split_quote = split_quote[i+1:]
            #print(split_quote)
            quoteObjArr.append(
                ({
                    "idx": startingIdx,
                    "label": 0,
                    "sentence": split_quote, 
                }))
            count+=1
            startingIdx+=1
            if count == limit:
                break
    return quoteObjArr

#print(getNumJargon('cv-unique-has-end-punct-sentences.csv', 5, 3)) #Size is 100k https://www.kaggle.com/mfekadu/sentences

def quoteObj(quote, split_quote, idx):
    ValidTags = ["inspirational", "philosophy", "inspirational-quotes", "inspiration", "motivational", "life-lessons", "motivation", "motivational-quotes", "wisdom-quotes"]
    return({
        "idx": idx,
        "label": int(any(tag in split_quote for tag in ValidTags)),
        "sentence": quote, 
    }, 
    int(any(tag in split_quote for tag in ValidTags)))

#Moving to single source: (Quotes-500k Dataset)
# Applies tagging to extracted quotes - 1: motivational in tag; 0: otherwise
def GetQuoteData(filename, quoteNum, jargonPercentage):
    idx = 1
    quoteList = []
    posCount = 0
    negCount = 0
    posCountLimit = int(quoteNum//2)
    negCountLimit = int(quoteNum//2) - int(quoteNum//2 * (jargonPercentage/100))
    jargonCountLimit = int(quoteNum//2 * (jargonPercentage/100))
    with open(filename, newline='') as csvfile:
        quotereader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in quotereader:
            split_quote = (' '.join(row))
            prevChar = ""
            quote = '"'
            if split_quote[0] == '"':
                split_quote = split_quote[1:]
            for char in split_quote:
                quote+=char
                if (prevChar == "," or prevChar == ":") and char == '"':
                    quote = quote[:-2] + '"'
                    quoteObject, result = quoteObj(quote, split_quote, idx)
                    if result and posCount < posCountLimit:
                        idx+=1
                        posCount+=1
                        quoteList.append(quoteObject)
                    elif negCount < negCountLimit:
                        idx+=1
                        negCount+=1
                        quoteList.append(quoteObject)
                    break
                elif char == '"': #and len(quote) > minLen:
                    quoteObject, result = quoteObj(quote, split_quote, idx)
                    if result and posCount < posCountLimit:
                        idx+=1
                        posCount+=1
                        quoteList.append(quoteObject)
                    elif negCount < negCountLimit:
                        idx+=1
                        negCount+=1
                        quoteList.append(quoteObject)
                    break
                elif (prevChar == "," or prevChar == "?" or prevChar == "!" or prevChar == ":" or prevChar == ".") and char != " ":
                    break
                prevChar = char
        quoteList.extend(getNumJargon('cv-unique-has-end-punct-sentences.csv', jargonCountLimit, idx))
    shuffle(quoteList)
    #print("POSCOUNT: "+str(posCount))
    #print("NEGCOUNT: "+str(negCount))
    return quoteList

#trainData = GetQuoteData('quotes_dataset.csv', 7000, 60)
#print(trainData)
#print(len(trainData))
'''
df = pd.DataFrame(dataset[picks])
for column, typ in dataset.features.items():
    if isinstance(typ, datasets.ClassLabel):
        df[column] = df[column].transform(lambda i: typ.names[i])
display(HTML(df.to_html()))
'''

#Next Task: 
## Put Training Data into Proper Pandas format for bert-test.py 
## Original Source: https://github.com/huggingface/notebooks/blob/master/examples/text_classification.ipynb

# Deprecated: Previous Method used for getting Training Data by getting inValid quotes from bookParse and valid quotes from GetQuote (Quotes-500k Dataset)
def GetTrainingData(quoteNum):
    #quoteNum = 864
    maxLen = 200
    minLen = 50
    quoteList = GetQuoteData('quotes_dataset.csv', quoteNum, maxLen, minLen)
    #for m in quoteList:
    #    print(m)


    inValidQuotes = bookParse("Gatsby", "B", "F. Scott Fitzgerald")[1]
    #print(inValidQuotes)
    #print(len(inValidQuotes)) - 864 from Gatsby

    #combine valid and invalid quote datasets for training data
    X_train = []
    print("number of motivational/valid quotes: "+ str(len(quoteList)))
    for quote in quoteList:
        X_train.append(
            {
                "quote": quote,
                "isMotivational": 1
            }
        )
    print("number of non-motivational/InValid quotes: "+ str(len(inValidQuotes)))
    for invalidQuote in inValidQuotes:
        X_train.append(
            {
                "quote": invalidQuote,
                "isMotivational": 0
            }
        )
    print("Training Data:\n"+str(X_train))
    print("Length of Training Data: "+str(len(X_train))+" and expected len: ("+str(quoteNum)+" * 2) = "+str(quoteNum*2))
    return X_train