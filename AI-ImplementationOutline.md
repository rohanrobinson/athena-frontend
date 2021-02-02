# Athena AI Implementation Outline

## AI Components:
### 1. Determine sentiment category of user input.


![](AI-ImplementationOutline-Image1.png)   
 
That is, when the user inputs information in the search bar such as:

"I am feeling stressed"

Our Backend is to:
1. Use ML to identify sentiment categories in user input 
2. Search our database for quotes in those sentiment categories
3. Return a data object of quotes to the user 

#### I. Potential ML implementation:
Sentiments: {joy, fear, sadness, disgust, and anger}
	
Train Data: 
* “I am feeling stressed” &rarr; anger 
* “I am having a great day” &rarr; joy
* “I am not in a good mood. I didn’t have the outcome I wanted” &rarr; sadness 
	
Test Data: 
* “My job sucks!” &rarr; joy
* “Our company just went public! Work is good.” &rarr; joy
* “I am upset with Gamestop’s stock” &rarr; sadness 
	
Naive Bayes Classifier to Optimize Model
* Classification based on independent likelihood of features{A,B,C} contributing to a quote matching a sentiment
    * “For example, a machine may be considered to be a car because it is large, has four wheels, and a rectangular shape. The Naive Bayes classifier would consider each of these features to contribute independently to the likelihood that the object is a car, regardless of any correlations between number of wheels, size, or shape” (Deep AI).
* Example: whether user input belongs to the sentiments of joy, fear, sadness, disgust, and anger. The features/predictors used by the classifier could be the frequency of the words present in the sentence, specific keywords, IBM Watson tone analyzer percentage.	

#### II. Searching a Database for Quotes 
Once our user input has been categorized into sentiments. 

“I am feeling angry and sad and stressed”. &rarr; {anger, sadness}

Let us then use these sentiments to search our database.

{anger, sadness} goes to our database 

Potential Database JSON Structure <br>
[	<br>
&nbsp;&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;“Anger”:  [ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{“quoteID”: “1”, “quote”:  “Once I was....”, “author”: “Freud”},<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{“quoteID”: “2”, “quote”: “Now is….”, “author”: “Kant”}, <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{......}<br>
 &nbsp;&nbsp;&nbsp;&nbsp;], <br>
&nbsp;&nbsp;&nbsp;&nbsp;“Sadness”: [<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{quoteID”: “450”, “quote”: “......”, “author”: “.....”}, <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{quoteID”: “451”,  “quote”: “Now is….”, “author”: “Kant”}, <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{......}<br>
&nbsp;&nbsp;&nbsp;&nbsp;], <br>
&nbsp;&nbsp;&nbsp;&nbsp;“Disgust”: [<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{quoteID”: “800”,  “quote”:  “........”, “author”: “........”},<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{......}<br>
&nbsp;&nbsp;&nbsp;&nbsp;], <br>
&nbsp;&nbsp;&nbsp;&nbsp;“Fear”: [<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{quoteID”: “...”, “quote”:  “........”, “author”: “........”},<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{......}<br>
&nbsp;&nbsp;&nbsp;&nbsp;],<br>
&nbsp;&nbsp;&nbsp;&nbsp;“Joy”: [<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{quoteID”: “....”, “quote”:  “........”, “author”: “........”},<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{......}<br>
&nbsp;&nbsp;&nbsp;&nbsp;]<br>
&nbsp;&nbsp;}<br>
]

Quote object {“quoteID”: “2”, “quote”: “Now is….”, “author”: “Kant”} has been selected by <match of quote in categories “anger” and “sadness”>, <feature B>, <feature C>. 

#### III. Returning a Data Object of quotes to the user 

Once a quote object comprised of {“quote”: “.....”, “author”: “......”} is received, we are to add it to a list of quote objects. 

Once our list has reached the size of k quote objects, our list of quote objects will be returned to the front end for display. 

List of k quote objects to be returned. 

[ {“quoteID”: “..”,  “quote”: “.......”, “author”: “......”}, {“quoteID”: “..”, “quote”: “.......”, “author”: “......”},....., {“quoteID”: “..”, “quote”: “.......”, “author”: “......”}, {“quoteID”: “..”, “quote”: “.......”, “author”: “......”}, {.....}]

### 2. Determine sentiment category of quotes.
a. Retrieve quotes from the internet for each sentiment.
* Aggregate List of HTML Pages 
* Use Beautiful Soup HTML Parser to pull out quotes 
* Create quote objects {“quoteID”: “...”, “quote”: “...”, “author”: “....”}
* Categorize quotes into the corresponding list for the sentiment keyword {joy, fear, sadness, disgust, anger} of our JSON dataset. 

b. Train ML/AI models on quotes. 
* Incorporate train dataset into model. 
* Test model on quote objects.

c. Optimize model.
* Naive Bayes Implementation based on features

### 3. Matching user input to useful quotes.
a. Score quotes on level of relevance to topic category? <br>
b. Score user input on level of relevance to topic category?

### Text/Emotion Dataset:
Good Summary:
* https://stackoverflow.com/questions/30703485/data-sets-for-emotion-detection-in-text
 
Others:
* https://www.researchgate.net/figure/Characteristics-of-the-ISEAR-Dataset_tbl1_313407834
* http://web.eecs.umich.edu/~mihalcea/affectivetext/
* (must be filtered) https://data.world/crowdflower/sentiment-analysis-in-text/workspace/file?filename=text_emotion.csv
* https://saifmohammad.com/WebPages/EmotionIntensity-SharedTask.html
* (maybe) https://competitions.codalab.org/competitions/17751#learn_the_details-datasets
* http://www.romanklinger.de/ssec/
* (need to look at more) http://people.rc.rit.edu/~coagla/affectdata/index.html
 
### Quote/Emotion Websites:
* https://www.greatest-quotations.com/search/quotes-sorrow.html
* (Maybe) https://www.goodreads.com/quotes/tag/anxiety
* (Maybe) https://wisdomquotes.com/sad-quotes/
* (Maybe) https://www.brainyquote.com/search_results?q=sorrow+motivation
* (GOOD) tinyurl.com/2htvlkyy
* (for fear) https://www.positivityblog.com/22-inspirational-quotes-on-fear/
 
Maybe, for each topic, simply find articles manually that pertain.
 
### Constraints on the Quotes:
* How to make sure quote is actually advice?
* Make sure that the quote is not from someone not living.
* Make sure that the quote is from a philosopher?
* Query wikipedia to make sure they are a philosopher.
 
### Machine Learning Model Ideas
1. Try simple Naïve Bayes, Clustering, etc. first. 
2. Then try newest machine learning models like XGBoost. Then try neural networks.
https://xgboost.readthedocs.io/en/latest/python/python_intro.html
### Misc. Useful Links:
* https://devblogs.microsoft.com/cse/2015/11/29/emotion-detection-and-recognition-from-text-using-deep-learning/
### Work Partition:
* Both work on combining datasets and cleaning them. 
* Isaiah works on traditional machine learning models. 
* Derek works on neural network.
 
 
 

