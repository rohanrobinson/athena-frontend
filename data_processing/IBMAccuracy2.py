import sys 
import json
from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from isear_parsing import *
from customML import *
from textblob import TextBlob

'''
IBM Tone Analyzer Docs: https://cloud.ibm.com/apidocs/tone-analyzer?code=python#related-information
anger, fear, joy, and sadness (emotional tones); analytical, confident, and tentative (language tones)
authenticator - DeYGwsjlnrsV1nxnCOTAgNAYbdxJPb-jsZeVq1H2H-9F
serviceUrl - https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/63297e0c-284d-428f-9832-d9c3e57e8673/v3/tone?version=2017-09-21
'''


# create IBM Tone Analyzer object
# fill with API key
authenticator = IAMAuthenticator('1JP8Q-BE_S90GcwBOmyo6WcJ1lbrSO8JbjE77wdsV8X1')

tone_analyzer = ToneAnalyzerV3(
    version='2017-09-21',
    authenticator=authenticator
)

# fill with URL
tone_analyzer.set_service_url('https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/7d7cac99-0e1b-4e25-b5ad-975d20330124')

# returns joy, fear, anger, sadness
def extractSentiment(userInput):

    # extracting list of sentiments from IBM Tone Analzyer
    tone_analysis = tone_analyzer.tone({'text': userInput}, content_type='application/json').get_result()
    sentimentList = tone_analysis["document_tone"]["tones"]

    # contains list of sentiments in sentimentList if it is joy, fear, anger, or sadness
    cleanedSentimentList = []
    for sentiment in sentimentList:
        if(sentiment['tone_name'].lower() in ['joy', 'fear', 'anger', 'sadness']):
            cleanedSentimentList.append(sentiment['tone_name'])


    predictedSentiment = {'Score': 0, 'Sentiment': "N/A"}

    # IBM Tone Analyzer failed to find tones
    # Return joy if positive statement, sadness if negative statement
    if cleanedSentimentList == []:
        analysis = TextBlob(userInput).sentiment
        if(analysis.polarity <= 0):
            predictedSentiment['Sentiment'] = 'sadness'
        else:
            predictedSentiment['Sentiment'] = 'joy'
        predictedSentiment['Score'] = abs(analysis.polarity)

    # Return the highest scoring sentiment
    else:
        for SentimentObj in sentimentList:
            if SentimentObj['tone_name'].lower() in ['joy', 'fear', 'anger', 'sadness']: #apply weights to emotion tones
                score = SentimentObj['score']
                if predictedSentiment['Score'] < score:
                    predictedSentiment['Score'] = score 
                    predictedSentiment['Sentiment'] = SentimentObj['tone_name']

    return predictedSentiment


analysis = {}
for sentiment in ['joy', 'sadness']:
    analysis[(sentiment, 'correct')] = 0
    analysis[(sentiment, 'wrong')] = 0


collection = ISEARparser('isear.csv', 140)

for s in ['joy', 'sadness']:
    exampleSentences = collection[s]
    for i in exampleSentences:
        sentence = i['InputSample']
        if extractSentiment(sentence)['Sentiment'].lower() == s:
            analysis[(s, 'correct')] += 1
        else:
            analysis[(s, 'wrong')] += 1

print(analysis)
total_right = 0
total_wrong = 0
for s in ['joy', 'sadness']:
    total_right += analysis[(s, 'correct')]
for s in ['joy','sadness']:
    total_wrong += analysis[(s, 'wrong')]

accuracy = total_right/(total_right + total_wrong)
print(accuracy)





