import nltk
nltk.download('punkt')
import nltk.data

def readForQuotes(filename, author, philosophyName="", philosophyId=""):
    tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
    fp = open(filename)
    data = fp.read()
    sentences = tokenizer.tokenize(data)

    quotes = []
    for sentence in sentences:
        temp = sentence.replace("\n", " ")
        temp1 = temp.replace("_", "")
        if len(temp1) < 250 and ('Gutenberg' not in temp1) and ('eBooks' not in temp1):
            # quote = dict()
            # quote['quote'] = temp1
            # quote['author'] = author
            # quote['sentimentName'] = ""
            # quote['sentimentId'] = ""
            # quote['philosophyName'] = philosophyName
            # quote['philosophyId'] = philosophyId
            # quotes.append(quote)
            quotes.append(temp1)
    print(quotes)
    print(len(quotes))
    return quotes

readForQuotes('Aristotle.txt', 'Aristotle')
