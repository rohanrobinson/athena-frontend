import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Contact, TodoPage } from "./index";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/todo" exact component={() => <TodoPage />} />
        </Switch>
        {/* <Footer /> no need for a footer (as of 2/9/21) */}
      </Router>
    </div>
  );
}

export default App;
