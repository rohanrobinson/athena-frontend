import sys 
import json
from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from isear_parsing import *
from customML import *

'''
https://cloud.ibm.com/apidocs/tone-analyzer?code=python#related-information
anger, fear, joy, and sadness (emotional tones); analytical, confident, and tentative (language tones)
'''

authenticator = IAMAuthenticator('DeYGwsjlnrsV1nxnCOTAgNAYbdxJPb-jsZeVq1H2H-9F')
tone_analyzer = ToneAnalyzerV3(
    version='2017-09-21',
    authenticator=authenticator
)

tone_analyzer.set_service_url('https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/63297e0c-284d-428f-9832-d9c3e57e8673/v3/tone?version=2017-09-21')

def addTrainingSamples(TrainingData, sentimentList, entry, emotion):
    predictedSentiment = {'Score': 0, 'Sentiment': "N/A"}
    TrainingSample = {}
    if sentimentList == []: #if empty sentiment list, skip it
        return
    for SentimentObj in sentimentList:
        if SentimentObj['tone_name'].lower() in ['joy', 'fear', 'anger', 'disgust']: #apply weights to emotion tones
            SentimentObj['score'] += 1.0
        score = SentimentObj['score']
        if predictedSentiment['Score'] < score:
            predictedSentiment['Score'] = score
            predictedSentiment['Sentiment'] = SentimentObj['tone_name']
    TrainingSample = {
            "ID": str(entry['InputSampleID']), 
            "Sample": entry['InputSample'],
            "Expected": emotion, 
            "Predicted": predictedSentiment['Sentiment'].lower()
            }
    TrainingData.append(TrainingSample)

#compiling training data for all four sentiments
def ISEARTrainingData(filename, keyList, sampleNum, sampleNumLimit):
    if sampleNum > sampleNumLimit:
        sampleNum = sampleNumLimit
    collection = ISEARparser('isear.csv', sampleNum)
    TrainingData = []
    for emotion in keyList:
        emotionSet = collection[emotion]
        for entry in emotionSet:
            tone_analysis = tone_analyzer.tone(
                {'text': entry['InputSample']},
                content_type='application/json'
            ).get_result()
            sentimentList = tone_analysis["document_tone"]["tones"]
            addTrainingSamples(TrainingData, sentimentList, entry, emotion)
    return TrainingData

def IBM_Accuracy():
    TrainingData = ISEARTrainingData("isear.csv", ['joy', 'fear', 'anger', 'sadness'], 100, 4000)
    actualData = []
    predictedData = []
    for sample in TrainingData:
        actualData.append(sample['Expected'])
        predictedData.append(sample['Predicted'])
    print("GaussianBayes")
    print(evaluateGaussianBayes(actualData, predictedData, actualData))
    print("MultinomialBayes")
    print(evaluateMultinomialNaiveBayes(actualData, predictedData, actualData))

IBM_Accuracy()

# --- Older Code Versions --#
# save the script as hello.py 
#collection = ISEARparser('isear.csv', 100)
# prints collection
#print(collection)

#prints only joy entries
#print(collection["joy"])

#parses through joy entries and prints them along with their expected and predicted outputs
#joyEntries = collection["joy"]
'''
ptr=""
for entry in joyEntries:
    ptr += "\n\t ------ Sample ID: "+str(entry['InputSampleID'])
    ptr += "\n\tinput sample: "+ entry['InputSample']
    ptr += "\n\tExpected Input Sample Output: " + "joy" 
    ptr += "\n\tPredicted Sample Output: "+"N/A"
print(ptr)
'''
#integrating IBM watson tone analyzer into training data for joy
'''
TrainingData = []
for entry in joyEntries:
    TrainingSample = {}
    tone_analysis = tone_analyzer.tone(
        {'text': entry['InputSample']},
        content_type='application/json'
    ).get_result()
    #List of Sentiments [{'score': 0.725047, 'tone_id': 'joy', 'tone_name': 'Joy'}]
    sentimentList = tone_analysis["document_tone"]["tones"]
    predictedSentiment = {'Score': 0, 'Sentiment': "N/A"}
    addTrainingSamples(TrainingData, sentimentList)
print(TrainingData)
'''
#ISEARTrainingData("isear.csv", ['joy', 'fear', 'anger', 'sadness'], 100, 4000)
