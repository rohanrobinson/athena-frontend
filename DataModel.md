# Data Models

### Potential Quote sources
quotes: https://github.com/dwyl/quotes/blob/master/quotes.json <br>
scraper and quotes: https://github.com/btford/philosobot <br>
quotes: https://type.fit/api/quotes <br>

### Work flow
quotes -> json format -> use ml to classify -> upload to database <br>
write functions to access the database <br>

## User Collection
Consists of individual documents corresponding to individual users. Each document will store user's basic profile information (ie. ObjectId, Username, Age etc.) along with embedded documents containing the user's survey results, preferences and liked/saved quotes.
```
{
    _id: <ObjectId1>, // takes care of email and password
    username: "name123",
    age: "25",
    surveyResults: {
        ...
    },
    preferences: {
        religion: ["Judaism", "Hinduism", "Islam"],
        likedPhilosophies: ["Stoicism", "Hedonism"],
        mlMetrics: {
            ...
        },
        ...
    },
    savedQuotes: [
        {
            quoteId: 409898, // reference to quote document
            note: "this quote made me happy"
        }, 
        {
            quoteId: 60980,
            note: "I like this quote"
        }
    ]
}
```

## Philosophy Collection
Consists of individual documents corresponding to individual philosophies (ie. Platoism, Taoism, Rationalism etc). Each document will store basic information about its philosophy (ie. id, name, description, key figures etc),along with a list of related quotes (stored using ids referencing quote documents) and image(s).
```
{
    _id: 4099018,
    name: "Platoism",
    date: "420 BC",
    description: "This is a philosophy that ...",
    figuresList: ["Plato", "Aristotle"],
    quotes: [20984, 209840, 2089454], // reference to quote documents
    image: "sdvonn.url.com" // reference to ???
}
```


## Sentiment Collection
Consists of individual documents corresponding to individual sentiments (ie. happiness, sadness, jealousy etc). Each document will store its sentiment's name and id, along with a list of related quotes (stored using ids referencing quote documents).
```
{
    _id: "happiness",
    quotes: [40982,20980,2099,20009] \\ reference to quote documents
}
```


## Quotes Collection
Consists of individual documents corresponding to individual quotes. Each document will store basic information about its quote (ie. id, philosophy, author, date etc) along with the actual text of the quote and corresponding sentiment tags.
```
{
    _id: 0980982,
    philosophy: "Platonic",
    philosophyId: 4099018, // reference to philosophy document
    author: "Plato",
    date: "420 BC",
    quote: "Love is a serious mental disease.",
    tags: ["love", "saddness"],
    mlScore: "234"
}
```

