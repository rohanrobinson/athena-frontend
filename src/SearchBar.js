import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./searchBar.css";

const SearchBar = () => {
  const history = useHistory();
  const [sentence, setSentence] = useState('');
  
  const handleSubmit = (event) => {
    if(event.key === 'Enter') {
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
                  }
                  }
                );
                console.log(sentence);
                console.log(sentence);
                history.go(0);
              })
              .catch((err) => {
                // error
                alert(err);
                console.log(err)
              });
          })
        .catch((error) => {
          // error
          alert(error);
          console.log(error);
        });
    }
  }

  const updateSentence = (event) => {
    setSentence(event.target.value);
  }

  return (
    <div className = "search-bar-div">
      <form className="example">
        <div className = "button-area">
          <input type="text" 
            placeholder="I'm feeling..."
            onChange={updateSentence}
            value={sentence}
            onKeyPress={handleSubmit}
            />
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  )
}
export default SearchBar;
