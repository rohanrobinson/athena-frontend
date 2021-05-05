from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import torch
import torch.nn.functional as F
from bookParser import bookParse
import numpy as np 

def pred(argMaxValue):
    return int(not argMaxValue) #That is, if 1th index return 0, if 0th index return 1 -- intepreting output

tokenizer = DistilBertTokenizer.from_pretrained("tokenizer")
model = DistilBertForSequenceClassification.from_pretrained("model")

sampleList = ["We are very happy to show you the 🤗 Transformers library.", 
    "Sample quote 2", 
    "You miss 100 percent of the shots you don't take"]
'''
(validQuotes, invalidQuotes) = bookParse("Gatsby", "B", "F. Scott Fitzgerald")
quoteArr = []
for obj in validQuotes:
    quoteArr.append(obj["quote"])

print("Potentially Valid Quotes from Gatsby: "+str(quoteArr))
'''
batch = tokenizer(
    sampleList,#quoteArr,
    padding=True,
    truncation=True,
    max_length=512,
    return_tensors="pt"
)

for key, value in batch.items():
     print(f"{key}: {value}")

print("\n"+str(batch)+"\n")

outputs = model(**batch)

print("Outputs: "+ str(outputs))
predictions = F.softmax(outputs[0], dim=-1)
print("Predictions: "+str(predictions))
for predObj in predictions.tolist():
    print(pred(np.argmax(predObj)))

# NEXT STEPS due this Thursday

    # Customize metrics to reflect F1 Score and Accuracy   xxxxxx - scales 82% accuracy // 0.9 F1 Score xxxxxxx

    # Finding other sources vs. TAGs to optimize accuracy  (29k baseline)  with inspiration tags??? Okay then
        # Expand Training Data
        # motivational/inspirational - valid quotes  
        # jargon - invalid quotes   

    # Apply again on quotes once accuracy is up to par

    # take quotes from authors mapped to a philosphy 