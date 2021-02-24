import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, CreateAccount, QuotesSaved, Explore, Philosophy, SearchResult } from "./index";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/quotesSaved" exact component={() => <QuotesSaved />} />
          <Route path="/createAccount" exact component={() => <CreateAccount />} />
          <Route path="/explore" exact component={() => <Explore />} />
          <Route path="/philosophy" component={Philosophy} />
          <Route path="/search" component={SearchResult} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
