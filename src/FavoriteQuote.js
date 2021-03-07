import axios from "axios";
import React, { useEffect, useState } from "react";
import "./FavoriteQuote.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";


const FavoriteQuote = ({ quoteId }) => {
  const history = useHistory();
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
      removeQuote: quoteId
    };
    console.log(body);
    axios.put(`https://athena-back-end.herokuapp.com/api/auth/removeQuote/${JSON.parse(sessionStorage.getItem('user'))._id.$oid}`, body, config)
    .then((res) => {
      // success, get new user object
      console.log(res);
      axios.get(`https://athena-back-end.herokuapp.com/api/auth/get/${JSON.parse(sessionStorage.getItem('user'))._id.$oid}`, config)
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
        <h5>{quote}</h5>
        <p>{author}</p>
        <FontAwesomeIcon icon={faTrash} className="trash_icon" onClick={removeQuote} />
    </div>
  )
}
export default FavoriteQuote;
