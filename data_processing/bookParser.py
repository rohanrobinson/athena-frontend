
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

#incorporating The Natural Language Toolkit (NLTK) - open-source Python library for NLP. 
from nltk.corpus import wordnet
from nltk.tag import CRFTagger
import pycrfsuite # pip install python-crfsuite

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

def PnPParser(filename): # Custom Parser for Pride and Prejudice
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

def GatsbyParser(filename):
    # Gatsby parser.......
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
                print("WORD: "+word)
                lastWord = word
                word = ""
                print("LAST WORD: "+lastWord)
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
                            if lastSentence not in ['"Project Gutenberg"', '"Plain Vanilla ASCII"', '"Information about donations to the Project   Literary Archive * You provide a full refund of any money paid by', '"Defects,"']:
                                quoteList.append(lastSentence)
                            sentence = [] 
            else: 
                word+=char
    
    return quoteList, count
# PART C: Sorting through lines and determining if it is a motivational quote or not
def validQuote(quote):
    ct = CRFTagger()
    if len(quote) < 20: #Valid Quote must be more than 20 characters
        return False
    # Valid Quote must also have 2 nouns, 1 verb, 2 adjectives, 1 determiner
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
    for elementTag in tagList: # NTLK POS https://www.nltk.org/book/ch05.html
        if elementTag[1] == 'Noun': #noun 
            NounCount+=1
        elif elementTag[1] == 'Verb': #verb
            VerbCount+=1
        elif elementTag[1] == 'Adj': #adjective
            AdjCount+=1
        elif elementTag[1] == 'Det': #determiner/article
            DetCount += 1
    return NounCount > 2 and VerbCount > 1 and AdjCount > 2 and DetCount > 1

# PART D: Culmination of Parts A-C
def bookParse(title):
    '''
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
    '''
    if title == "Macbeth":
        quoteMap, count = MacbethParser(title+".txt")
        quoteCount = 0
        characterCount = 0
        validQuotes = []
        validQuoteID = 0
        for key in quoteMap.keys():
            print("\tCharacter: "+str(key))
            #print(quoteMap[key])
            arr, prev = quoteMap[key]
            #print(arr)
            quoteCount+=len(arr)
            characterCount+=1
            for quote in arr:
                print("\t*\t"+quote)
                if(validQuote(quote)):
                    validQuoteID+=1
                    validQuotes.append(
                        {
                            "quoteID": validQuoteID, 
                            "quote": quote,
                            "character": key,
                            "author": "William Shakespeare",
                        }
                    )
        print("\n\tParsed through "+str(count)+" lines of "+title)
        print("\tAuthor: William Shakespeare")
        print("\t"+str(characterCount)+" Characters")
        print("\t"+str(quoteCount)+" Potential Quotes")
        print("\tValid Quotes: "+str(len(validQuotes)))
        print(str(validQuotes))
    elif title == "Pride-and-Prejudice":
        quoteList, count = PnPParser(title+".txt")
        quoteCount = 0
        characterCount = 'N/A'
        validQuotes = []
        validQuoteID = 0
        
        for quote in quoteList:
            quoteCount+=1
            print("\t*\t"+quote)
            if(validQuote(quote)):
                validQuoteID+=1
                validQuotes.append(
                    {
                        "quoteID": validQuoteID, 
                        "quote": quote,
                        "character": "N/A",
                        "author": "Jane Austen"
                    }
                )
        print("\n\tParsed through "+str(count)+" lines of "+title)
        print("\tAuthor: Jane Austen")
        print("\t"+str(characterCount)+" Characters")
        print("\t"+str(quoteCount)+" Potential Quotes")
        print("\tValid Quotes: "+str(len(validQuotes)))
        print(str(validQuotes))
    else:
        quoteList, count = GatsbyParser(title+".txt")
        quoteCount = 0
        characterCount = 'N/A'
        validQuotes = []
        validQuoteID = 0
        
        for quote in quoteList:
            quoteCount+=1
            print("\t*\t"+quote)
            if(validQuote(quote)):
                validQuoteID+=1
                validQuotes.append(
                    {
                        "quoteID": validQuoteID, 
                        "quote": quote,
                        "character": "N/A",
                        "author": "F. Scott Fitzgerald"
                    }
                )
        print("\n\tParsed through "+str(count)+" lines of "+title)
        print("\tAuthor: F. Scott Fitzgerald")
        print("\t"+str(characterCount)+" Characters")
        print("\t"+str(quoteCount)+" Potential Quotes")
        print("\tValid Quotes: "+str(len(validQuotes)))
        print(str(validQuotes))
        
#bookParse("Macbeth")
#bookParse("Pride-and-Prejudice")
bookParse("Gatsby")

'''
Hugging Face library for transformer models - vectorization
https://huggingface.co/transformers/
Think about it in terms of words vs book
Ex: Man words in vector space for words closest to it
Vector space lookup for what you want and what you have
Sentence as - user input 
Quotes from user input // back burner  

ML model this wknd!!!!!
- Finetune book parser (accurately determine what is a valid quote) 200 more quotes
- Custom machine learning model
'''