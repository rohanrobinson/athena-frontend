import csv
#from bookParser import bookParse
import datasets #pip install datasets
import random
import pandas as pd
from IPython.display import display, HTML
from datasets import list_datasets, load_dataset, list_metrics, load_metric


def quoteObj(quote, split_quote, idx):
    return({
        "idx": idx,
        "label": int("motivational" in split_quote or "inspirational" in split_quote or "inspirational-quotes" in split_quote), 
        "sentence": quote, 
    }, 
    int("motivational" in split_quote or "inspirational" in split_quote or "inspirational-quotes" in split_quote))

#Moving to single source: (Quotes-500k Dataset)
# Applies tagging to extracted quotes - 1: motivational in tag; 0: otherwise
def GetQuoteData(filename, quoteNum, maxLen, minLen):
    idx = 1
    quoteList = []
    posCount = 0
    negCount = 0
    with open(filename, newline='') as csvfile:
        quotereader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in quotereader:
            split_quote = (' '.join(row))
            prevChar = ""
            if len(split_quote) > maxLen or len(split_quote) < minLen:
                pass
            else:
                quote = '"'
                if split_quote[0] == '"':
                    split_quote = split_quote[1:]
                for char in split_quote:
                    quote+=char
                    if (prevChar == "," or prevChar == ":") and char == '"' and len(quote) > minLen:
                        quote = quote[:-2] + '"'
                        quoteObject, result = quoteObj(quote, split_quote, idx)
                        if result and posCount < quoteNum//2:
                            idx+=1
                            posCount+=1
                            quoteList.append(quoteObject)
                        elif negCount < quoteNum//2:
                            idx+=1
                            negCount+=1
                            quoteList.append(quoteObject)
                        break
                    elif char == '"' and len(quote) > minLen:
                        quoteObject, result = quoteObj(quote, split_quote, idx)
                        if result and posCount < quoteNum//2:
                            idx+=1
                            posCount+=1
                            quoteList.append(quoteObject)
                        elif negCount < quoteNum//2:
                            idx+=1
                            negCount+=1
                            quoteList.append(quoteObject)
                        break
                    elif (prevChar == "," or prevChar == "?" or prevChar == "!" or prevChar == ":" or prevChar == ".") and char != " ":
                        break
                    prevChar = char
            
            if posCount == quoteNum//2 and negCount == quoteNum//2:
                break
            
    return quoteList

trainData = GetQuoteData('quotes_dataset.csv', 100, 200, 50)
#print(trainData)
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