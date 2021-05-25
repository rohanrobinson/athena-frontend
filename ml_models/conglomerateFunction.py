from collections import Counter


def test(userInput):
    return "happy"

listOfFunctions = [test]

def sentimentExtractor(userInput, listOfFunctions):
    emotions = []
    for function in listOfFunctions:
        emotions.append(function(userInput).lower())
    
    c = Counter(emotions)
    return c.most_common(1)[0][0]


#/Users/derekbai/Documents/Classes/CS98/cnn_word2vec_testing/nlp-text-emotion
