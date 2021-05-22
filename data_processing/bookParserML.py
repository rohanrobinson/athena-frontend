from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import torch
import torch.nn.functional as F
from bookParser import bookParse
from extractSentences import readForQuotes
import numpy as np 

tokenizer = DistilBertTokenizer.from_pretrained("tokenizer")
model = DistilBertForSequenceClassification.from_pretrained("model")

'''
Sample Input: 
sampleList = ["We are very happy to show you the 🤗 Transformers library.", 
    "Sample quote 2", 
    "You miss 100 percent of the shots you don't take"]
'''
# If file too large use split -b 100kb filename.txt 
# Run History
# quoteArr = readForQuotes('Aristotle.txt', 'Aristotle') - run 1
# quoteArr = readForQuotes('ScarletLetter.txt', 'Nathaniel Hawthorne') - run 2
# quoteArr = readForQuotes('Apology.txt', 'Plato') - run 3
# quoteArr = readForQuotes('TheRepublic1.txt', 'Plato') - run 4 #Plato The Republic 570 pgs
# quoteArr = readForQuotes('TheRepublic2.txt', 'Plato') - run 5
# quoteArr = readForQuotes('TheRepublic3.txt', 'Plato') - run 6
# quoteArr = readForQuotes('TheRepublic4.txt', 'Plato') - run 7
#quoteArr = readForQuotes('TheRepublic5.txt', 'Plato') - run 8
# quoteArr = readForQuotes('TheRepublic6.txt', 'Plato') - run 9
#quoteArr = readForQuotes('TheRepublic7.txt', 'Plato') - run 10
#quoteArr = readForQuotes('TheRepublic8.txt', 'Plato') - run 11
#quoteArr = readForQuotes('TheRepublic9.txt', 'Plato') - run 12
#quoteArr = readForQuotes('TheRepublic10.txt', 'Plato') - run 13
#quoteArr = readForQuotes('TheRepublic11.txt', 'Plato') - run 14
#quoteArr = readForQuotes('TheRepublic12.txt', 'Plato') - run 15
#quoteArr = readForQuotes('TheRepublic13.txt', 'Plato') - run 16
#quoteArr = readForQuotes('ThePrince.txt', 'Nicolo Machiavelli') - run 17
#quoteArr = readForQuotes('Leviathan1.txt', 'Thomas Hobbes') - run 18 #Leviathan 306 pgs
#quoteArr = readForQuotes('Leviathan2.txt', 'Thomas Hobbes')- run 19
#quoteArr = readForQuotes('Leviathan3.txt', 'Thomas Hobbes') - run 20
#quoteArr = readForQuotes('Leviathan4.txt', 'Thomas Hobbes') - run 21
#quoteArr = readForQuotes('Leviathan5.txt', 'Thomas Hobbes')- run 22
#quoteArr = readForQuotes('AdventuresOfTomSawyer1.txt', 'Mark Twain') - run 23
#quoteArr = readForQuotes('AdventuresOfTomSawyer2.txt', 'Mark Twain') - run 24
#---- Additional Runs
#quoteArr = readForQuotes('AliceAndWonderland.txt', 'Lewis Carroll') - run 25
#quoteArr = readForQuotes('BeyondGoodAndEvil1.txt', 'Friedrich Wilhelm Nietzsche') - run 26
quoteArr = readForQuotes('BeyondGoodAndEvil2.txt', 'Friedrich Wilhelm Nietzsche')

batch = tokenizer(
    quoteArr,#quoteArr,
    padding=True,
    truncation=True,
    max_length=512,
    return_tensors="pt"
)

#for key, value in batch.items():
#     print(f"{key}: {value}")

#print("\n"+str(batch)+"\n")

outputs = model(**batch)

ValidQuotes = []

#print("Outputs: "+ str(outputs))
predictions = F.softmax(outputs[0], dim=-1).tolist()
print("Predictions: "+str(predictions))
for i in range(len(predictions)):
    if(np.argmax(predictions[i])):
        ValidQuotes.append(quoteArr[i])
#print(ValidQuotes)
for validObj in ValidQuotes:
    print(validObj+",")
print(str(len(ValidQuotes))+ "/"+ str(len(quoteArr)) + "="+ str(len(ValidQuotes)/len(quoteArr)))

# Tuesday Update
    # Currently 91% accuracy and 0.91 F1 score on 7,000 samples (80/20 train/test split) 4.5 hrs to run
    # Dataset
        # motivational/inspirational - valid quotes    
        # 40% non-motivational/inspiration + 60% jargon - invalid quotes   
        #getNumJargon('cv-unique-has-end-punct-sentences.csv', 5, 3) #Size is 100k https://www.kaggle.com/mfekadu/sentences

    # Applied model on quotes from Aristole using Chase's extractSentences method
        # Returned subset of deemed valid quotes selected 54 out of 683 ~ 7.9%
        # Good Quotes from subset: 
            # 'Nor, again, that of a bad man passing from adversity to prosperity: for nothing can be more alien to the spirit of Tragedy; it possesses no single tragic quality; it neither satisfies the moral sense nor calls forth pity or fear.'
            # "In addition to which, we urge that the irrational sometimes does not violate reason; just as 'it is probable that a thing may happen contrary to probability.'"
            # "Thus the reason why men enjoy seeing a likeness is, that in contemplating it they find themselves learning or inferring, and saying perhaps, 'Ah, that is he.'""
            # 'If the more refined art is the higher, and the more refined in every case is that which appeals to the better sort of audience, the art which imitates anything and everything is manifestly most unrefined.'
    
    #Expanding model to 10,000 samples (still on .80 / 20 train test split)

    # Manually pulling quotes in from subset // Project Gutenberg txt's 

# 90 - 10 split for training and test (potentially)