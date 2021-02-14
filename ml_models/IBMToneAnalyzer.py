import sys 
import json
from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
  
# save the script as hello.py 

authenticator = IAMAuthenticator('')
tone_analyzer = ToneAnalyzerV3(
    version='2017-09-21',
    authenticator=authenticator
)

tone_analyzer.set_service_url('')

text = 'i feel neutral'

tone_analysis = tone_analyzer.tone(
    {'text': text},
    content_type='application/json'
).get_result()

for tone in tone_analysis['document_tone']['tones']:
    print(tone)


# print joy, fear, anger, sadness, or nothing


