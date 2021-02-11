# attempt parse safi tweet training set
import re
#deEmoji method adapted from removing emoji's from a string in python 
#ref: https://stackoverflow.com/questions/33404752/removing-emojis-from-a-string-in-python

# Main Question: *proper spell check * 

#spellcheck 
#other sentiments

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
    quoteCollection = {}
    quoteCollection["anger"] = []
    quoteCollection["fear"] = []
    quoteCollection["joy"] = []
    quoteCollection["sadness"] = []
    count = 0
    for filename in filenameList:
        for line in open(filename,'r'):
            count+=1
            quoteObj = {}
            print("Line: "+line)
            quoteObj["QuoteID"] = count
            quoteObj["Score"] = line[-6:-1]
            quoteObj["Quote"] = deEmojify(removeTwitterness(line[6:-12]).strip())
            emotion = filename.split('-')[0]
            quoteCollection[emotion].append(quoteObj)
    print(quoteCollection)
    return quoteCollection

filenameList = ['anger-training-set.txt', 'fear-training-set.txt', 'joy-training-set.txt', 'sadness-training-set.txt']
parseTrainingData(filenameList)
