import axios from "axios";
import React, { useEffect, useState } from "react";
import "./QuoteOfTheDay.css";

const QuoteOfTheDay = () => {
    const [author, setAuthor] = useState();
    const [quote, setQuote] = useState();

  useEffect(() => {
    axios.get(`https://athena-back-end.herokuapp.com/api/sentiment/name/neutral`)
        .then((response) => {
            // success
            const quotesList = response.data.quotes;
            const j = Math.floor(Math.random()*quotesList.length);
            axios.get(`https://athena-back-end.herokuapp.com/api/quote/${quotesList[j]}`)
                .then((res) => {
                    // success
                    setQuote(res.data.quote);
                    setAuthor(res.data.author);
                })
                .catch((err) => {
                    // error
                    console.log(err);
                });
        })
        .catch((error) => {
            // error
            console.log(error);
        });
  }, []);

  return (
    <div id="quoteOfDay-page">
        <div id="qotd_cont">
            <p id="qotd_title">Quote of the Day</p>
            <p id="qotd_quote">{quote}</p>
            <p id="qotd_author">- {author}</p>
        </div>
    </div>
  )
}
export default QuoteOfTheDay;
