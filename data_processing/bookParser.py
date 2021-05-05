
# Input: book txt file
# Output: dataset of quotes 

# https://manybooks.net/
# install pip install pdfminer.six
# install pip install PyPDF2

#parsers for multi-line books.

# Input: User input
# Output: whether input is a quote or not

import glob
import os
import sys
import re
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from io import BytesIO
from PyPDF2 import PdfFileWriter, PdfFileReader
from transformers import pipeline, TFAutoModelForTokenClassification, AutoTokenizer
import tensorflow as tf
#new BERT model
model = TFAutoModelForTokenClassification.from_pretrained("dbmdz/bert-large-cased-finetuned-conll03-english")
tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")
label_list = [
     "O",       # Outside of a named entity
     "B-MISC",  # Beginning of a miscellaneous entity right after another miscellaneous entity
     "I-MISC",  # Miscellaneous entity
     "B-PER",   # Beginning of a person's name right after another person's name
     "I-PER",   # Person's name
     "B-ORG",   # Beginning of an organisation right after another organisation
     "I-ORG",   # Organisation
     "B-LOC",   # Beginning of a location right after another location
     "I-LOC"    # Location
]


#incorporating The Natural Language Toolkit (NLTK) - open-source Python library for NLP. 
from nltk.corpus import wordnet
from nltk.tag import CRFTagger
import pycrfsuite # pip install python-crfsuite


summarizer = pipeline("summarization")

'''
Instructions for installing ntlk
 python3.8
 >>> import nltk
 >>> nltk.download('wordnet')
'''

#PART A: Initial multi-page PDF to txt conversions from https://github.com/ahmedkhemiri95/PDFs-TextExtract

#Solution based in two functions:
#1.pdf remove : Remove existed pdf documents(result for your last split operation)
#2.pdf splitter : Split your main pdf document into group of documents.

def merger(output_path, input_paths):
    pdf_writer = PdfFileWriter()
    for path in input_paths:
        pdf_reader = PdfFileReader(path)
        for page in range(pdf_reader.getNumPages()):
            pdf_writer.addPage(pdf_reader.getPage(page))
    with open(output_path, 'wb') as fh:
        pdf_writer.write(fh)

def pdf_remove(length, fname):
 for i in range(length): 
        os.remove("pdf/split/{}".format(fname[i])) #Remove existed pdf documents in folder.
        print("Deleted: pdf/split/{}".format(fname[i]))

def pdf_splitter(path, fname):
    fname = os.path.splitext(os.path.basename(path))[0]
    pdf = PdfFileReader(path)
    for page in range(pdf.getNumPages()):
        pdf_writer = PdfFileWriter()
        pdf_writer.addPage(pdf.getPage(page))
 
        output_filename = 'pdf/split/{}.pdf'.format(page+1)
 
        with open(output_filename, 'wb') as out:
            pdf_writer.write(out)
 
        print('Created: pdf/split/{}'.format(output_filename))

def clear_text(title):
   open(title+".txt", "w").close()
   
#writelines function
def writelines(self, lines):
    self._checkClosed()
    for line in lines:
       self.write(line)

#PDF to text Function. 
def pdf_to_text(path):
    manager = PDFResourceManager()
    retstr = BytesIO()
    layout = LAParams(all_texts=True)
    device = TextConverter(manager, retstr, laparams=layout)
    filepath = open(path, 'rb')
    interpreter = PDFPageInterpreter(manager, device)

    for page in PDFPage.get_pages(filepath, check_extractable=True):
        interpreter.process_page(page)

    text = retstr.getvalue()
    filepath.close()
    device.close()
    retstr.close()
    return text

def pdfToTxt(title):
    path = 'pdf/'+title+'.pdf' #specifiy your main pdf document path. i.e 'pdf/Macbeth.pdf'
    fname = os.listdir('/Users/isaiahmartin/Documents/CS98/athena21W/data_processing/pdf/split') #fname: List contain pdf documents names in folder
    length = len(fname) #Retrieve List fname Length.
    
    #call pdf remove function
    pdf_remove(length, fname) 
    #call pdf splitter function
    pdf_splitter(path, fname) 
    clear_text(title)
    fname = os.listdir('/Users/isaiahmartin/Documents/CS98/athena21W/data_processing/pdf/split') #fname : List contain pdf documents names.
    print("\n\n\t")
    print(fname)
    #fname: must be sorted.
    fname.sort(key=lambda f: int(re.sub('\D', '', f)))
    length = len(fname) 

    for i in range(length): #Repeat each operation for each document.
        text_output = pdf_to_text(('pdf/split/{}').format(fname[i])) #Extract text with PDF_to_text Function call
        text1_output = text_output.decode("utf-8")     #Decode result from bytes to text
        #print(text1_output)
        
        #Save extracted text to TEXT_FILE    
        with open(title+".txt", "a", encoding="utf-8") as text_file:
            text_file.writelines(text1_output)


# PART B: Unique parsing of output txt file 

# Start with Macbeth.txt 
def MacbethParser(filename):
    count=1
    sentence = []
    activeLine = False
    Characters = []
    quoteMap = {}
    for line in open(filename, 'r'):
        count+=1
        word = ""
        character = ""
        lastCharacter = character
        lastSentence = ""
        quoteMap[lastCharacter] = []
        for char in line:
            if char == '\t':
                #print(word)
                if word == "ACT":
                    activeLine = True
                if activeLine:
                    sentence.append(word)
                    if word == '':
                        sentence = []
                    if word.isupper():
                        character+=word
                    if lastCharacter != '':
                        sentenceGroup = []
                        if sentence not in sentenceGroup:
                            sentenceGroup.append(sentence)
                            if len(sentenceGroup[0]) > 1:
                                lastSentence = ' '.join(sentence)
                                #Delete previously constructed sentence if it is a subset of the current one.
                                if len(quoteMap[lastCharacter]) > 1:
                                    prevEntry = str(quoteMap[lastCharacter][0][-1])
                                    Arr = quoteMap[lastCharacter][0]
                                    if prevEntry in lastSentence:
                                        del quoteMap[lastCharacter][0][-1]
                                    Arr.append(lastSentence)
                                    quoteMap[lastCharacter] = (Arr, prevEntry)
                                    
                                else:
                                    quoteMap[lastCharacter] = ([lastSentence], None)
                word = ""
            elif char == "." and activeLine:
                if word.isupper():
                    character+=" "+ word
                unwantedCaps = ['', word, '\x0cSCENE', 'ACT', 'SCENE', 'A', 'I', "I'", 'ACT I','ACT II',' COMMERCIALLY','WITH PERMISSION','SCENE I', 'ALL', '\x0cSCENE II', 'ACT ISCENE I', 'ACT ISCENE IA', '\x0cSCENE IIA', '\x0cSCENE III', '\x0cSCENE IV', '\x0cSCENE V', '\x0cSCENE IIIA', ' ALL', ' I', 'ACT IISCENE I']
                if character not in unwantedCaps:
                    if character not in quoteMap:
                        quoteMap[character] = []
                    Characters.append(character)
                    lastCharacter = character
                    character=""
                word = ""
            else: 
                word+=char
    for character in list(quoteMap):
        if quoteMap[character] == []:
            del quoteMap[character]
        elif len(quoteMap[character][0]) == 1:
            del quoteMap[character]
    return quoteMap, count

def ParserA(filename): # Custom Parser for selection A - manybooks.net
    count=1
    sentence = []
    quoteMarker = False
    quoteList = []
    for line in open(filename, 'r'):
        count+=1
        word = ""
        lastWord = ""
        for char in line:
            if char == '\t':
                #print("WORD: "+word)
                lastWord = word
                word = ""
                #print("LAST WORD: "+lastWord)
                if len(lastWord) > 1 and (lastWord[0] == '“' or lastWord[0] == '"' or lastWord[0] == ' "\ ') and not quoteMarker:
                    quoteMarker = True
                    #print("QUOTE: "+lastWord[1:].lstrip())
                if quoteMarker:
                    sentence.append(lastWord)
                    lastSentence = ' '.join(sentence)    #OKAY TIGHTEN UP....
                    #print("LAST SENT: "+str(sentence)) 
                    if len(lastWord) > 1:
                        if len(lastSentence) > 110 or (lastWord[-1] == '”' or lastWord[-1] == '"' or lastWord[-1] == '“'): #or len(lastSentence) > 30:
                            quoteMarker = False
                            if lastSentence not in ["“Project Gutenberg”", "“Plain Vanilla ASCII”", "“Information about donations      the Project Gutenberg Literary Archive - You provide a full refund of any money", "“Defects,”"]:
                                quoteList.append(lastSentence)
                            sentence = [] 
            else: 
                word+=char
    #print(quoteList)
    return quoteList, count

def ParserB(filename): #Parser for selection B - Project Gutenburg Books
    count=1
    sentence = []
    quoteMarker = False
    quoteList = []
    for line in open(filename, 'r'):
        count+=1
        word = ""
        lastWord = ""
        for char in line:
            if char == ' ':
                #print("WORD: "+word)
                lastWord = word
                word = ""
                #print("LAST WORD: "+lastWord)
                if len(lastWord) > 1 and (lastWord[0] == '“' or lastWord[0] == '"' or lastWord[0] == ' "\ ') and not quoteMarker:
                    quoteMarker = True
                    #print("QUOTE: "+lastWord[1:].lstrip())
                if quoteMarker:
                    sentence.append(lastWord)
                    lastSentence = ' '.join(sentence)    #OKAY TIGHTEN UP....
                    #print("LAST SENT: "+str(sentence)) 
                    if len(lastWord) > 1:
                        if len(lastSentence) > 140 or (lastWord[-1] == '”' or lastWord[-1] == '"' or lastWord[-1] == '“'): 
                            quoteMarker = False
                            if lastSentence not in ['"Project Gutenberg"', '"Plain Vanilla ASCII"', '"Information about donations to the Project   Literary Archive * You provide a full refund of any money paid by', '"Defects,"']:
                                quoteList.append(lastSentence)
                            sentence = [] 
            else: 
                word+=char
    
    return quoteList, count
# PART C: Sorting through lines and determining if it is a motivational quote or not
def validQuote(quote):
    ct = CRFTagger()
    #Quote Length constraints - Feature A
    if len(quote) < 80 or len(quote) > 140: #Valid Quote must be more than 80 characters
        return False

    #Name Entity Recognition constraints - Feature B: no names of persons (I-PER)
    tokens = tokenizer.tokenize(tokenizer.decode(tokenizer.encode(quote)))
    inputs = tokenizer.encode(quote, return_tensors="tf")

    # We will be sustituting in new BERT model: ref line 27
    outputs = model(inputs)[0]
    predictions = tf.argmax(outputs, axis=2)
    nerList = [(token, label_list[prediction]) for token, prediction in zip(tokens, predictions[0].numpy())]
    for obj in nerList:
        #print(obj)
        if obj[1] == 'I-PER':
            return False

    # Summarization - Feature C/D
    #summary = summarizer(quote, max_length=len(quote), min_length=20, do_sample=False)[0]['summary_text']
    '''
    #NTK POS Constraints https://www.nltk.org/book/ch05.html - Feature C/D
    NounCount = 0
    VerbCount = 0
    AdjCount = 0
    DetCount = 0
    wordList = []
    if quote[-1] == '"':
        wordList = quote[1:-1].split(" ")
    else: 
        wordList = quote[1:].split(" ")
    train_data = [[('University','Noun'), ('is','Verb'), ('a','Det'), ('good','Adj'), ('place','Noun')],
    [('dog','Noun'),('eat','Verb'),('meat','Noun')]]
    ct.train(train_data,'model.crf.tagger')
    tagList = (ct.tag(wordList))
    for elementTag in tagList:
        if elementTag[1] == 'Noun': #noun 
            NounCount+=1
        elif elementTag[1] == 'Verb': #verb
            VerbCount+=1
        elif elementTag[1] == 'Adj': #adjective
            AdjCount+=1
        elif elementTag[1] == 'Det': #determiner/article
            DetCount += 1
    POSratio = (VerbCount + NounCount) / ((AdjCount + DetCount) + 1) #proportionally, more verbs and nouns then adj's and det's
    #print(POSratio)
    '''
    return True


# PART D: Culmination of Parts A-C
def bookParse(title, selection, author):
    if selection == "A": # "A" manybooks.net
        quoteList, count = ParserA(title+".txt")
        quoteCount = 0
        validQuotes = []
        inValidQuotes = []
        validQuoteID = 0
        inValidQuoteID = 0

        for quote in quoteList:
            quoteCount+=1
            if(validQuote(quote)):
                validQuoteID+=1
                validQuotes.append(
                    {
                        "quoteID": validQuoteID, 
                        "quote": quote,
                        "author": author
                    }
                )
            else:
                inValidQuoteID+=1
                inValidQuotes.append(quote)

        print("\n\tParserA ~ Parsed through "+str(count)+" lines of "+title)
        print("\tAuthor: "+author)
        print("\t"+str(quoteCount)+" Potential Quotes")
        print("\tValid Quotes: "+str(len(validQuotes)))
        print("\tValid to Reg Ratio: "+str(len(validQuotes)/quoteCount))
        print(str(validQuotes))

        return (validQuotes, inValidQuotes)
    else: #B - project Gutenburg
        quoteList, count = ParserB(title+".txt")
        quoteCount = 0
        validQuotes = []
        inValidQuotes = []
        validQuoteID = 0
        inValidQuoteID = 0
        
        for quote in quoteList:
            quoteCount+=1
            #print("\t*\t"+quote)
            if(validQuote(quote)):
                validQuoteID+=1
                validQuotes.append(
                    {
                        "quoteID": validQuoteID, 
                        "quote": quote,
                        "author": author
                    }
                )
            else:
                inValidQuoteID+=1
                inValidQuotes.append(quote)

        print("\n\tParserB ~ Parsed through "+str(count)+" lines of "+title)
        print("\tAuthor: "+author)
        print("\t"+str(quoteCount)+" Potential Quotes")
        print("\tValid Quotes: "+str(len(validQuotes)))
        print("\tValid to Reg Ratio: "+str(len(validQuotes)/quoteCount))
        print(str(validQuotes))

        return (validQuotes, inValidQuotes)
# TypeA ManyBooks        
#bookParse("Pride-and-Prejudice", "A", "Jane Austen")

#TypeB Project Gutenburg 
#bookParse("Gatsby", "B", "F. Scott Fitzgerald")
#bookParse("ScarletLetter", "B", "Nathaniel Hawthorne")
#bookParse("AliceAndWonderland", "B", "Lewis Carroll")
#bookParse("OliverTwist", "B", "Charles Dickens")


