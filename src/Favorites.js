import axios from "axios";
import React, { useEffect, useState } from "react";
// import axios from 'axios';
import { useHistory } from "react-router-dom";
import FavoriteQuote from "./FavoriteQuote";
import "./Favorites.css";
import QuoteOfTheDay from "./QuoteOfTheDay";
import backendUrl from './backendUrl';

const Favorites = () => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === '') {
      console.log('login')
    } else {
      setUser(JSON.parse(sessionStorage.getItem('user')));
      setEmail(JSON.parse(sessionStorage.getItem('user')).email);
      setUserId(JSON.parse(sessionStorage.getItem('user'))._id.$oid);
      
      const config = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      };

      var quotes = [];

      axios.get(`${backendUrl}/api/auth/get/${JSON.parse(sessionStorage.getItem('user'))._id.$oid}`, config)
      .then((res) => {
        // success
        quotes = res.data.savedQuotes;
        setSavedQuotes(quotes);
        setloaded(true);
      })
      .catch((err) => {
        // error
        console.log(err);
      });
    }
  }, []);

  return (
    <div className="explore-page">
      { (user===null || user==='') ? (
        <>
          <p>Favorites</p>
          <p>Login to view</p>
          <QuoteOfTheDay />
        </>
      ):(
        <>
          <div>
            { loaded ? (
              <>
              <div className="inspiration">
                <div className="left-hand">
                <div className="right-hand">
                <div className="inspiration-content">
                  <h1>QUOTE OF THE DAY</h1>
                  <QuoteOfTheDay/>
                </div>
                </div>
                </div>
              </div>
              <div className = "discover">
                <div className = "discover-content">
                  <h1>MY FAVORITES</h1>
                </div>
                <div className="quotesCont">
                  {savedQuotes.map((quote) => (
                    <FavoriteQuote key={quote} quoteId={quote}/>
                  ))}
                </div>
              </div>
              </>
            ):(
              <>
              <p>Login to view.</p>
              <QuoteOfTheDay />
              </>
            )}
            
          </div>
        </>
      )
      }
    </div>
  )
}
export default Favorites;
