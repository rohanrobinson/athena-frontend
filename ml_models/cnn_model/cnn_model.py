import pandas as pd
import numpy as np

# text preprocessing
from nltk.tokenize import word_tokenize
import re

# preparing input to our model
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences

from keras.models import load_model

import time

def sentimentExtractor(userInput):

    # Max input length (max number of words) 
    max_seq_len = 500

    class_names = ['joy', 'fear', 'anger', 'sadness', 'neutral']

    data_train = pd.read_csv('data/data_train.csv', encoding='utf-8')
    data_test = pd.read_csv('data/data_test.csv', encoding='utf-8')
    data = data_train.append(data_test, ignore_index=True)

    def clean_text(data):
        # remove hashtags and @usernames
        data = re.sub(r"(#[\d\w\.]+)", '', data)
        data = re.sub(r"(@[\d\w\.]+)", '', data)
        
        # tokenization using nltk
        data = word_tokenize(data)
        
        return data

    texts = [' '.join(clean_text(text)) for text in data.Text]

    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(texts)

    predictor = load_model('models/cnn_w2v.h5')

    inputToModel = [userInput]

    seq = tokenizer.texts_to_sequences(inputToModel)
    padded = pad_sequences(seq, maxlen=max_seq_len)

    start_time = time.time()
    pred = predictor.predict(padded)

    print('Message: ' + str(userInput))
    print('predicted: {} ({:.2f} seconds)'.format(class_names[np.argmax(pred)], (time.time() - start_time)))

    return class_names[np.argmax(pred)]

print(sentimentExtractor("delivery was hour late and my pizza was cold!"))