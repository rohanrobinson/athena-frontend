import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

export { default as Navigation } from "./Navigation";
export { default as Home } from "./Home.js";
export { default as CreateAccount } from "./CreateAccount";
export { default as Explore } from "./Explore";
export { default as QuotesSaved } from "./QuotesSaved";
export { default as Philosophy } from "./Philosophy.js";
export { default as SearchResult } from "./SearchResult.js";
export { default as SearchBar } from "./SearchBar.js";
export { default as Favorites } from "./Favorites.js";

export { default as Survey } from "./Survey.js";
export { default as Results } from "./Results.js";

export { default as SurveyInfo } from './SurveyInfo';

export { default as AboutUs } from "./AboutUs.js";



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
