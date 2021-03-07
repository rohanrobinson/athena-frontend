import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./searchBar.css";

const SearchBar = () => {
  const history = useHistory();
  const [sentence, setSentence] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (event) => {
    if(event.key === 'Enter') {
      setIsLoading(true);
      var quotes = [];
      const data = {
        sentence: sentence,
      }
      axios.post(`https://athena-back-end.herokuapp.com/api/sentiment/sentence`, data)
        .then(res => {
            // success
            quotes = res.data.quotes;
            const l = res.data.quotes.length;
            const j = Math.floor(Math.random()*l);
            axios.get(`https://athena-back-end.herokuapp.com/api/quote/${res.data.quotes[j]}`)
              .then ((response) => {
                // success
                console.log("quote:");
                console.log(response.data.quote);
                history.push({
                  pathname: '/search',
                  state: {
                    sentence: sentence,
                    quotes: JSON.stringify(quotes),
                    quote: response.data.quote,
                    author: response.data.author || "unknown",
                    quoteId: response.data._id.$oid,
                  }
                  }
                );
                console.log(sentence);
                console.log(sentence);
                setIsLoading(false);
                history.go(0);
              })
              .catch((err) => {
                // error
                alert(err);
                console.log(err);
                setIsLoading(false);
              });
          })
        .catch((error) => {
          // error
          alert(error);
          console.log(error);
          setIsLoading(false);
        });
    }
  }

  const handleSearch = (event) => {
    var quotes = [];
      setIsLoading(true);
      const data = {
        sentence: sentence,
      }
      axios.post(`https://athena-back-end.herokuapp.com/api/sentiment/sentence`, data)
        .then(res => {
            // success
            quotes = res.data.quotes;
            const l = res.data.quotes.length;
            const j = Math.floor(Math.random()*l);
            axios.get(`https://athena-back-end.herokuapp.com/api/quote/${res.data.quotes[j]}`)
              .then ((response) => {
                // success
                console.log("quote:");
                console.log(response.data.quote);
                history.push({
                  pathname: '/search',
                  state: {
                    sentence: sentence,
                    quotes: JSON.stringify(quotes),
                    quote: response.data.quote,
                    author: response.data.author || "unknown",
                    quoteId: response.data._id.$oid,
                  }
                  }
                );
                console.log(sentence);
                console.log(sentence);
                setIsLoading(false);
                history.go(0);
              })
              .catch((err) => {
                // error
                alert(err);
                console.log(err);
                setIsLoading(false);
              });
          })
        .catch((error) => {
          // error
          alert(error);
          console.log(error);
          setIsLoading(false);
        });
  }

  const updateSentence = (event) => {
    setSentence(event.target.value);
  }

  return (
    <div className = "search-bar-div">
      <div className = "button-area">
        <input className = "searchInput"
          type="text" 
          placeholder="I'm feeling..."
          onChange={updateSentence}
          value={sentence}
          onKeyPress={handleSubmit}
          />
        <button type="submit" onClick={handleSearch}>Search</button>
      </div>
      { isLoading ? (
        <>
          <div class="loader"></div>
        </>
      ):(
        <>
        </>
      )}
    </div>
  )
}
export default SearchBar;
