import axios from "axios";
import React, { useEffect, useState } from "react";
import "./FavoriteQuote.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const FavoriteQuote = ({ quoteId }) => {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  useEffect(() => {
    axios.get(`https://athena-back-end.herokuapp.com/api/quote/${quoteId}`)
      .then ((response) => {
        // success
        // console.log("quote:");
        setQuote(response.data.quote);
        setAuthor(response.data.author);
      })
      .catch((err) => {
        // error
        console.log(err)
      });
  }, []);

  return (
    <div className="favQuoteCont">
        <h5>{quote}</h5>
        <p>{author}</p>
        <FontAwesomeIcon icon={faTrash}  className="trashIcon"/>
    </div>
  )
}
export default FavoriteQuote;
