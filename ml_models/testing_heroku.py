import requests 
import json
import time

URL = "https://athena-back-end.herokuapp.com/api/sentiment/test"

PARAMS = {'sentence': "i am testing this"} 
while(True):
    print(requests.post(url = URL, json = PARAMS))
    time.sleep(60)









