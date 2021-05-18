from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer
import pyarrow as pa
from datasets import DatasetDict, Dataset, load_metric
from BertData import GetQuoteData
import pandas as pd
import numpy as np

## Original Source: https://github.com/huggingface/notebooks/blob/master/examples/text_classification.ipynb
## pip3 install torch torchvision

# Use Google Collab in case slow runtime...
task = "cola"
actual_task = "mnli" if task == "mnli-mm" else task
model_checkpoint = 'distilbert-base-uncased'
tokenizer = AutoTokenizer.from_pretrained(model_checkpoint, use_fast=True)
batch_size = 16
metric = load_metric('bookParserMetric')#, actual_task)

def preprocess_function(examples):
    return tokenizer(examples["sentence"], truncation=True)

def compute_metrics(eval_pred):
    predictions, labels = eval_pred
    if task != "stsb":
        predictions = np.argmax(predictions, axis=1) 
    else:
        predictions = predictions[:, 0]
    return metric.compute(predictions=predictions, references=labels)

# Find a good sample amount. Trained on as many samples as possible...

def BertModel():
    trainingArr = GetQuoteData('quotes_dataset.csv', 10000, 60) #43000 samples for test and train
    splitNum = int(.80  * len(trainingArr)) #greater train distribution
    # Let's make a larger dictionary...
    trainSet = trainingArr[:splitNum]
    testSet = trainingArr[splitNum:]
    pdDict = {
        'train': Dataset.from_pandas(pd.DataFrame(trainSet)),
        'test': Dataset.from_pandas(pd.DataFrame(testSet))
    }

    dataset = pdDict #Dataset.from_pandas(pd.DataFrame(pdDict)) Uncomment to convert dataset to Dataset type, otherwise generic dictionary

    #print(dataset)
    '''
    {
        "idx": idx,
        "label": int("motivational" in split_quote or "inspirational" in split_quote or "inspirational-quotes" in split_quote), 
        "sentence": quote, 
    }
    '''

    #print(preprocess_function(dataset['train']))

    #Line that I want to run properly

    encoded_dataset = {'train': dataset['train'].map(preprocess_function, batched=True, batch_size=batch_size),
        'test': dataset['test'].map(preprocess_function, batched=True, batch_size=batch_size)}

    num_labels = 2 if task.startswith("mnli") else 1 if task=="stsb" else 2

    model = AutoModelForSequenceClassification.from_pretrained(model_checkpoint, num_labels=num_labels)

    metric_name = "accuracy"

    args = TrainingArguments(
        "test-glue",
        evaluation_strategy = "epoch",
        learning_rate=2e-5,
        per_device_train_batch_size= batch_size,
        per_device_eval_batch_size= batch_size,
        num_train_epochs=5,
        weight_decay=0.01,
        load_best_model_at_end=True,
        metric_for_best_model=metric_name,
    )

    trainer = Trainer(
        model,
        args,
        train_dataset=encoded_dataset["train"],
        eval_dataset=encoded_dataset["test"],
        tokenizer=tokenizer,
        compute_metrics=compute_metrics
    )

    trainer.train()
    trainer.evaluate()
    #saving the model
    tokenizer.save_pretrained("tokenizer")
    model.save_pretrained("model")
    #return model

BertModel()