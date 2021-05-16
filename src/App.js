import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Navigation, Home, CreateAccount, QuotesSaved, Explore, Philosophy, SearchResult, Favorites, Results, AboutUs, Survey, SurveyInfo } from "./index";



function App() {
  return (
    <div className="App">
      <Router>
       
        <Switch>
          <Route path="/login"  exact>
            <Navigation />
            <Home/>
          </Route>
          
          <Route path="/quotesSaved" exact component={() => <QuotesSaved />} />

          <Route path="/createAccount" exact>
            <Navigation />
            <CreateAccount />
          </Route>

          <Route path="/explore" exact >
            <Navigation />
            <Explore />
          </Route>
          
          <Route path="/aboutus" exact  >
            <Navigation />
            <AboutUs />
          </Route>

          <Route path="/philosophy" component={Philosophy} />
          <Route path="/search" component={SearchResult} />

          <Route path="/favorites">
            <Navigation />
            <Favorites />
          </Route>
          
          {/* The Survey Component gets Rendered First */}
          <Route path="/" exact component={Survey} />  

          <Route path="/surveyInfo"component={SurveyInfo} />

          <Route path="/results" component={Results} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
