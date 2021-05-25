#make sure to download isear.csv from https://raw.githubusercontent.com/sinmaniphel/py_isear_dataset/master/isear.csv
import csv
import random
import os
from sklearn.model_selection import train_test_split
from sklearn import svm, metrics
import numpy as np
# pip install -U scikit-learn

# SVM tutorial https://www.datacamp.com/community/tutorials/svm-classification-scikit-learn-python

# via readme.txt
# 1. emmood  	Lists sentences with unmerged affect labels for two annotators (A and B). 
# The label set for both Primary emotion (1em) and Mood were: 
# Angry (A), Disgusted (D), Fearful (F), Happy (H), Neutral (N), 
# Sad (Sa for 1em, abbrev. to S for Mood), 
# Pos.Surprised (Su+ for 1em, abbrev. to + for Mood), 
# and Neg.Surprised (Su- for 1em, abbrev. to - for Mood)
# File suffix: .emmood
# Format: SentID:SentID	1emLabelA:1emLabelB	MoodLabelA:MoodLabelB	Sent
# Example: 0:0     N:N     N:N     Once upon a time there was a village shop.

def customMLModel(inputSampleCollection, sentenceInput):
    joyScore = 0
    angerScore = 0
    fearScore = 0
    sadnessScore = 0
    for word in sentenceInput: 
        for sample in inputSampleCollection["joy"]:
            if word in sample["sentence"]:
                joyScore+=1
        for sample in inputSampleCollection["anger"]:
            if word in sample["sentence"]:
                angerScore+=1
        for sample in inputSampleCollection["fear"]:
            if word in sample["sentence"]:
                fearScore+=1
        for sample in inputSampleCollection["sadness"]:
            if word in sample["sentence"]:
                sadnessScore+=1
    maxScore = max(joyScore, angerScore, fearScore, sadnessScore)
    if(maxScore == None):
        maxScore = joyScore
    #print(joyScore)
    #print(angerScore)
    #print(fearScore)
    #print(sadnessScore)
    if maxScore == joyScore:
        return "joy" #0.3
    if maxScore == angerScore:
        return "anger" #0.5#
    if maxScore == fearScore:
        return "fear" #0.4
    if maxScore == sadnessScore:
        return "sadness" #0.7

def hcAndersonparser(directory_str, inputSampleLimit, k):
    
    inputSampleCollection = {}
    inputSampleCollection["joy"] = [] #H
    inputSampleCollection["fear"] = [] #F
    inputSampleCollection["anger"] = [] #A
    inputSampleCollection["sadness"] = [] #S

    directory = os.fsencode(directory_str)
    for file in os.listdir(directory):
     line_count = 0
     filename = os.fsdecode(file)
     if filename.endswith(".txt"): 
        filename = "hcAnderson/"+filename
        print("\n\t Parsing file: "+str(filename)+"\n")
        for line in open(filename,'r'):
            inputSampleObj = {}
            print("Line: "+line)
            line_count_offset = 4 
            if (len(str(line_count)) == 2):
                line_count_offset = 6
            elif (len(str(line_count)) == 3): # in case of hundreds ?
                line_count_offset = 8
            emotionSeg = line[line_count_offset:line_count_offset+3]
            moodSeg = line[line_count_offset+4:line_count_offset+7]
            sentence = line[line_count_offset+8:]
            if line[line_count_offset+3] != '\t' and (line[line_count_offset+4] == '-' or line[line_count_offset+4] == '+'):
                print("SM 1")
                emotionSeg = line[line_count_offset:line_count_offset+5]
                moodSeg = line[line_count_offset+5:line_count_offset+8]
                sentence = line[line_count_offset+9:]
            if(line[line_count_offset+4] == "\t"):
                print("SM 2")
                emotionSeg = line[line_count_offset:line_count_offset+4]
                moodSeg = line[line_count_offset+5:line_count_offset+8]
                sentence = line[line_count_offset+9:]
                emotionLabelAB = ((emotionSeg.split(':'))[0], (emotionSeg.split(':'))[1])
            if(line[line_count_offset+5] == "\t"):
                print("SM 3")
                emotionSeg = line[line_count_offset:line_count_offset+5]
                moodSeg = line[line_count_offset+6:line_count_offset+9]
                sentence = line[line_count_offset+10:]
                emotionLabelAB = ((emotionSeg.split(':'))[0], (emotionSeg.split(':'))[1])

            if(line[line_count_offset+2] == '+' or line[line_count_offset+2] == '-') and (line[line_count_offset+5] != "\t"):
                print("SM 4")
                emotionSeg = line[line_count_offset: line_count_offset + 7]
                moodSeg = line[line_count_offset + 7: line_count_offset + 10]
                sentence = line[line_count_offset+10:]
                emotionLabelAB = ((emotionSeg.split(':'))[0], (emotionSeg.split(':'))[1])
                print(emotionSeg)
                print(moodSeg)
                if((line[line_count_offset + 6] == '-') or line[line_count_offset+4] == '+') and (line[line_count_offset + 5] != "\t"):
                    print("SM 5")
                    emotionSeg = line[line_count_offset : line_count_offset+ 7]
                    moodSeg = line[line_count_offset + 8: line_count_offset + 11]
                    sentence = line[line_count_offset + 12:]
                    emotionLabelAB = ((emotionSeg.split(':'))[0], (emotionSeg.split(':'))[1])
                if(len(emotionLabelAB[1]) == 2):
                    print("SM 6")
                    emotionSeg = line[line_count_offset:line_count_offset + 6]
                    moodSeg - line[line_count_offset + 7: line_count_offset + 10]
                    sentence = line[line_count_offset + 11:]
            emotionLabelAB = ((emotionSeg.split(':'))[0], (emotionSeg.split(':'))[1])

            if(len(emotionLabelAB[0]) == 2):
                print("SM 8")
                if emotionLabelAB[1] == "" or line[line_count_offset+4] == "\t":
                    print("SM 9")
                    emotionSeg = line[line_count_offset:line_count_offset + 4]
                    moodSeg = line[line_count_offset + 5: line_count_offset + 8]
                    sentence = line[line_count_offset+9:]
                    emotionLabelAB = ((emotionSeg.split(':'))[0], (emotionSeg.split(':'))[1])
                if(line[line_count_offset + 5] == '+' or line[line_count_offset + 5] == '-') and line[line_count_offset+4] != "\t":
                    print("SM 10")
                    emotionSeg = line[line_count_offset:line_count_offset + 6]
                    moodSeg = line[line_count_offset + 7: line_count_offset + 10]
                    sentence = line[line_count_offset + 11:]
                    emotionLabelAB = ((emotionSeg.split(':'))[0], (emotionSeg.split(':'))[1])
            print(emotionSeg)
            print(moodSeg)
            moodLabelAB = ((moodSeg.split(':'))[0], (moodSeg.split(':'))[1])

            if moodLabelAB[0] == "N":
                if moodLabelAB[1] == "S" and len(inputSampleCollection["sadness"]) < 190:
                    inputSampleCollection["sadness"].append({
                        "sentence": sentence,
                        "emotionList": emotionLabelAB,
                        "moodList": moodLabelAB,
                    })
                if moodLabelAB[1] == "A" and len(inputSampleCollection["anger"]) < 190:
                    inputSampleCollection["anger"].append({
                        "sentence": sentence,
                        "emotionList": emotionLabelAB,
                        "moodList": moodLabelAB,
                    })
                if moodLabelAB[1] == "H" and len(inputSampleCollection["joy"]) < 190:
                    inputSampleCollection["joy"].append({
                        "sentence": sentence,
                        "emotionList": emotionLabelAB,
                        "moodList": moodLabelAB,
                    })
                if moodLabelAB[1] == "F" and len(inputSampleCollection["fear"]) < 190:
                    inputSampleCollection["fear"].append({
                        "sentence": sentence,
                        "emotionList": emotionLabelAB,
                        "moodList": moodLabelAB,
                    })
            else:
                if moodLabelAB[0] == "S" and len(inputSampleCollection["sadness"]) < 190:
                    inputSampleCollection["sadness"].append({
                        "sentence": sentence,
                        "emotionList": emotionLabelAB,
                        "moodList": moodLabelAB,
                    })
                if moodLabelAB[0] == "A" and len(inputSampleCollection["anger"]) < 190:
                    inputSampleCollection["anger"].append({
                        "sentence": sentence,
                        "emotionList": emotionLabelAB,
                        "moodList": moodLabelAB,
                    })
                if moodLabelAB[0] == "H" and len(inputSampleCollection["joy"]) < 190:
                    inputSampleCollection["joy"].append({
                        "sentence": sentence,
                        "emotionList": emotionLabelAB,
                        "moodList": moodLabelAB,
                    })
                if moodLabelAB[0] == "F" and len(inputSampleCollection["fear"]) < 190:
                    inputSampleCollection["fear"].append({
                        "sentence": sentence,
                        "emotionList": emotionLabelAB,
                        "moodList": moodLabelAB,
                    })
            print(str(emotionLabelAB)+"\n"+str(moodLabelAB)+"\n"+str(sentence))
            line_count+=1
        #print("\n\Input Sample Collection of "+str(count)+" inputs:\n"+str(inputSampleCollection))
        #print(count)
    return inputSampleCollection
    

inputSampleCollection = hcAndersonparser('hcAnderson', 100, 0.5)
print(len(inputSampleCollection["joy"]))
print(len(inputSampleCollection["anger"]))
print(len(inputSampleCollection["fear"]))
print(len(inputSampleCollection["sadness"]))

modelData = []
sentimentData = []
for key in ["joy", "anger", "fear", "sadness"]:
    for dataSample in inputSampleCollection[key]:
        sentence = dataSample["sentence"]
        print("Sentence: "+ sentence)
        modelData.append(customMLModel(inputSampleCollection, sentence))
        print("Result: "+ customMLModel(inputSampleCollection, sentence))
        sentimentData.append(len(key)/10)
        break 
print(modelData)
#print(sentimentData)

# Split dataset into training set and test set
x_train, x_test, y_train, y_test = train_test_split(modelData, sentimentData, test_size=0.3,random_state=109) # 70% training and 30% test

#Create a svm Classifier
clf = svm.SVC(kernel='linear') # Linear Kernel

#print(len(x_train))
#print(len(y_train))

'''
#Train the model using the training sets
clf.fit(np.array(x_train).reshape(-1, 1), np.array(y_train).reshape(-1,1))

#Predict the response for test dataset
y_pred = clf.predict(x_test)

# Model Accuracy: how often is the classifier correct?
print("Accuracy:",metrics.accuracy_score(y_test, y_pred))
'''
'''
ID|CITY|COUN|SUBJ|SEX|AGE|RELI|PRAC|FOCC|MOCC|FIEL|EMOT|WHEN|LONG|INTS|ERGO|TROPHO|TEMPER|EXPRES|
MOVE|EXP1|EXP2|EXP10|PARAL|CON|EXPC|PLEA|PLAN|FAIR|CAUS|COPING|MORL|SELF|RELA|VERBAL|NEUTRO|Field1|
Field3|Field2|MYKEY|SIT|STATE|

- Quotes related to philosophies that may not be pertain to sentiments
- 
'''

