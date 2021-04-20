from transformers import DistilBertTokenizer, TFDistilBertModel, AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer
import pyarrow as pa
from datasets import DatasetDict, Dataset
from BertData import GetQuoteData

## Put Training Data into Proper Pandas format for bert-test.py 
## Original Source: https://github.com/huggingface/notebooks/blob/master/examples/text_classification.ipynb

# Use Google Collab in case slow runtime...
model_checkpoint = 'distilbert-base-uncased'
tokenizer = AutoTokenizer.from_pretrained(model_checkpoint, use_fast=True)

#------- Insert New Training Data from Task A here -------

trainingDict = GetQuoteData('quotes_dataset.csv', 100, 200, 50)
splitNum = int(.50  * len(trainingDict))
train_set = Dataset.from_dict({"data": trainingDict[:splitNum]})
test_set = Dataset.from_dict({"data": trainingDict[splitNum:]})

'''
{
    "idx": idx,
    "label": int("motivational" in split_quote or "inspirational" in split_quote or "inspirational-quotes" in split_quote), 
    "quote": quote, 
}
'''

dataset = DatasetDict({'train':train_set,
                       'val':test_set})


def preprocess_function(examples):
    return tokenizer(examples["data"][0]["quote"], truncation=True)

print(preprocess_function(dataset['train']))

encoded_dataset = dataset.map(preprocess_function, batched=True, batch_size=26)

num_labels = 2 if task.startswith("mnli") else 1 if task=="stsb" else 2

model = AutoModelForSequenceClassification.from_pretrained(model_checkpoint, num_labels=num_labels)


metric_name = "f1" if task == "stsb" else "matthews_correlation" if task == "cola" else "accuracy"

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


def compute_metrics(eval_pred):
    predictions, labels = eval_pred
    if task != "stsb":
        predictions = np.argmax(predictions, axis=1)
    else:
        predictions = predictions[:, 0]
    return metric.compute(predictions=predictions, references=labels)

validation_key = "validation_mismatched" if task == "mnli-mm" else "validation_matched" if task == "mnli" else "validation"
trainer = Trainer(
    model,
    args,
    train_dataset=encoded_dataset["train"],
    eval_dataset=encoded_dataset[validation_key],
    tokenizer=tokenizer,
    compute_metrics=compute_metrics
)

trainer.train()


'''
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
model = TFDistilBertModel.from_pretrained("distilbert-base-uncased")
text = "Replace me by any text you'd like."
encoded_input = tokenizer(text, return_tensors='tf')
output = model(encoded_input)
'''