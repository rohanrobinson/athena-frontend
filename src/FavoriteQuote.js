import axios from "axios";
import React, { useEffect, useState } from "react";
import "./FavoriteQuote.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import backendUrl from './backendUrl';

const FavoriteQuote = ({ quoteId }) => {
  const history = useHistory();
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [sentiment, setSentiment] = useState();

  useEffect(() => {
    axios.get(`${backendUrl}/api/quote/${quoteId}`)
      .then ((response) => {
        // success
        // console.log("quote:");
        setQuote(response.data.quote);
        setAuthor(response.data.author);
        setSentiment(response.data.sentimentName);
      })
      .catch((err) => {
        // error
        console.log(err)
      });
  }, []);

  const removeQuote = (event) => {
    console.log("remove quote");
    console.log(quoteId);
    console.log("user:");
    console.log(JSON.parse(sessionStorage.getItem('user'))._id.$oid);

    // remove quote from liked
    const config = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    };
    const body = {
      removeQuote: quoteId,
      sentiment: sentiment
    };
    console.log(body);
    axios.put(`${backendUrl}/api/auth/removeQuote/${JSON.parse(sessionStorage.getItem('user'))._id.$oid}`, body, config)
    .then((res) => {
      // success, get new user object
      console.log(res);
      axios.get(`${backendUrl}/api/auth/get/${JSON.parse(sessionStorage.getItem('user'))._id.$oid}`, config)
        .then((response) => {
          // success
          console.log(response);
          sessionStorage.setItem('user', JSON.stringify(response.data));
          history.go(0);
        })
        .catch((error) => {
          // error
          console.log(error);
        });
    })
    .catch((err) => {
      // error
      console.log(err);
    });
  }

  return (
    <div className="favQuoteCont">
        <h5>"{quote}"</h5>
        <p>-{author}</p>
        <FontAwesomeIcon icon={faTrash} className="trash_icon" onClick={removeQuote} />
    </div>
  )
}
export default FavoriteQuote;
