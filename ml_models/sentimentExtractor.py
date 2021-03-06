from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from textblob import TextBlob

# returns joy, fear, anger, sadness
def extractSentiment(userInput):

    # create IBM Tone Analyzer object
    # fill with API key
    authenticator = IAMAuthenticator('1JP8Q-BE_S90GcwBOmyo6WcJ1lbrSO8JbjE77wdsV8X1')
    
    tone_analyzer = ToneAnalyzerV3(
        version='2017-09-21',
        authenticator=authenticator
    )

    # fill with URL
    tone_analyzer.set_service_url('https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/7d7cac99-0e1b-4e25-b5ad-975d20330124')

    # extracting list of sentiments from IBM Tone Analzyer
    tone_analysis = tone_analyzer.tone({'text': userInput}, content_type='application/json').get_result()
    sentimentList = tone_analysis["document_tone"]["tones"]
    print(sentimentList)

    # contains list of sentiments in sentimentList if it is joy, fear, anger, or sadness
    cleanedSentimentList = []
    for sentiment in sentimentList:
        if(sentiment['tone_name'].lower() in ['joy', 'fear', 'anger', 'sadness']):
            cleanedSentimentList.append(sentiment['tone_name'])


    predictedSentiment = {'Score': 0, 'Sentiment': "N/A"}

    # IBM Tone Analyzer failed to find tones
    # Return joy if positive statement, sadness if negative statement
    if cleanedSentimentList == []:
        print("textblob")
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


print(extractSentiment("When I pass an examination which I did not think I did well."))