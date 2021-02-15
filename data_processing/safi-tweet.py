# attempt parse safi tweet training set
import re
#deEmoji method adapted from removing emoji's from a string in python 
#ref: https://stackoverflow.com/questions/33404752/removing-emojis-from-a-string-in-python

# AI/ML Goals by 2/17/2021
# R & D
# - Find an autocorrect/spellchecker R&D. 
# Baseline
# - Work w/ backend team to store default quotes from webscraper.
# - Apply ML model to current user input. 
# - - Should be able to take input and categorize it according to sentiment... <Modified tone analyzer>
# - - Measuring IBM Tone Analyzer Accuracy on train data

# LOOOOOK AT THE NOTEBOOOOK!!!!!!!

#***** Quotes in JSon format by end of next wk...

def deEmojify(tweet):
    regrex_pattern = re.compile(pattern = "["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           "]+", flags = re.UNICODE)
    return regrex_pattern.sub(r'',tweet)

def removeTwitterness(tweet):
    userState = False
    hashtagState = False
    rtnTweet = ""
    tweetSize = len(tweet)
    index = 0
    while index < tweetSize:
        if tweet[index] == '@':
            userState = True
        if tweet[index] == '#':
            hashtagState = True
        if userState:
            if tweet[index] == ' ':
                userState = False
        if hashtagState:
            if tweet[index] == ' ':
                hashtagState = False
        if not (userState or hashtagState):
            rtnTweet+= tweet[index]
        index+=1
    return rtnTweet

#print(removeTwitterness("@DPD_UK I asked for my parcel to be delivered to a pick up store not my address #fuming #poorcustomerservice "))
def parseTrainingData(filenameList):
    inputSampleCollection = {}
    inputSampleCollection["anger"] = []
    inputSampleCollection["fear"] = []
    inputSampleCollection["joy"] = []
    inputSampleCollection["sadness"] = []
    count = 0
    for filename in filenameList:
        for line in open(filename,'r'):
            count+=1
            inputSampleObj = {}
            print("Line: "+line)
            inputSampleObj["InputSampleID"] = count
            inputSampleObj["Score"] = line[-6:-1]
            inputSampleObj["InputSample"] = deEmojify(removeTwitterness(line[6:-12]).strip())
            emotion = filename.split('-')[0]
            inputSampleCollection[emotion].append(inputSampleObj)
    print(inputSampleCollection)
    return inputSampleCollection

filenameList = ['anger-training-set.txt', 'fear-training-set.txt', 'joy-training-set.txt', 'sadness-training-set.txt']
parseTrainingData(filenameList)
