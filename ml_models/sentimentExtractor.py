from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from textblob import TextBlob

# returns joy, fear, anger, sadness
def extractSentiment(userInput):

    # create IBM Tone Analyzer object
    # fill with API key
    authenticator = IAMAuthenticator('---')
    
    tone_analyzer = ToneAnalyzerV3(
        version='2017-09-21',
        authenticator=authenticator
    )

    # fill with URL
    tone_analyzer.set_service_url('---')

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

