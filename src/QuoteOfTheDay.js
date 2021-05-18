import axios from "axios";
import React, { useEffect, useState } from "react";
import "./QuoteOfTheDay.css";
import backendUrl from './backendUrl';

const QuoteOfTheDay = () => {
    const [author, setAuthor] = useState();
    const [quote, setQuote] = useState();
    const [quotesList, setQuotesList] = useState();

  useEffect(() => {
    axios.get(`${backendUrl}/api/sentiment/name/neutral`)
        .then((response) => {
            // success
            var qList = [];
            response.data.quotes.forEach((q) => {
                qList.push(q[0])
            });
            setQuotesList(qList);
            var today = new Date();
            var ddmm = (String(today.getDate()).padStart(2, '0') + String(today.getMonth() + 1).padStart(2, '0'));
            console.log(ddmm);
            const seedrandom = require('seedrandom');
            const rng = seedrandom(ddmm);
            console.log(rng());
            const j = Math.floor(rng()*qList.length);
            axios.get(`${backendUrl}/api/quote/${qList[j]}`)
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

  const getQuote= (event) => {
    event.preventDefault();
    const j = Math.floor(Math.random()*quotesList.length);
    axios.get(`${backendUrl}/api/quote/${quotesList[j]}`)
        .then((res) => {
            // success
            setQuote(res.data.quote);
            setAuthor(res.data.author);
        })
        .catch((err) => {
            // error
            console.log(err);
        });
  }

  return (
    <div id="quoteOfDay-page">
        <div id="qotd_cont">
            <p id="qotd_quote">{quote}</p>
            <p id="qotd_author">- {author}</p>
            {/* <button id="qotd_button" onClick={getQuote}>Next</button>*/}
        </div>
    </div>
  )
}
export default QuoteOfTheDay;
