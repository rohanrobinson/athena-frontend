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
      handleSearch();
    }
  }

  const handleSearch = () => {
    setIsLoading(true);
    const data = {
      sentence: sentence,
    }
    axios.post(`https://athena-back-end.herokuapp.com/api/sentiment/sentence/getten`, data)
      .then(res => {
          // success
          history.push({
            pathname: '/search',
            state: {
              sentence: sentence,
              data: res.data,
            }
            }
          );
          console.log(res.data);
          setIsLoading(false);
          history.go(0);
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
        <div class="loading-icon">
          <div class = "loadingText">
              Our machine learning algorithm is perusing thousands of books to find quotes for you...
          </div>
          <div class="book">
              <div class="inner">
                <div class="left"></div>
                <div class="middle"></div>
                <div class="right"></div>
              </div>
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
          </div><a class="dribbble" href="https://dribbble.com/shots/7199149-Book-Loader" target="_blank"></a>
        </div>
        </>
      ):(
        <>
        </>
      )}
    </div>
  )
}
export default SearchBar;
