import React from 'react';
import Philosophy from './Philosophy';
import { Link, withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Explore extends React.Component {
  state = {
    randomTrait: "",
  };

  render() {
    return (	
      <div id="container">
        <h3>Explore Philosophies</h3>
        <div className = "philosophies">
          <div className = "philosophy-card">
            <div className = "philosophy-card-image">
              <a href="#">
                <img src = "https://via.placeholder.com/250"/>
              </a>
            </div>
            <div className = "philosophy-card-descr">
              <Link to={{
                pathname: '/philosophy',
                aboutProps: {
                  name: "Romanticism",
                  description: "Lovely things",
                  quote: "Please fall in love",
                  quotee: "William the Shakespeare"
                }
              }}><h4>Romanticism</h4></Link>
              <p className="philosophy-tags">#Nature #Expression</p>
            </div>
          </div>

          <div className = "philosophy-card">
            <div className = "philosophy-card-image">
              <a href="#">
                <img src = "https://via.placeholder.com/250" />
              </a>
            </div>
            <div className = "philosophy-card-descr">
              <Link to={{
              pathname: '/philosophy',
              aboutProps: {
                name: "Stoicism",
                description: "Don't complain",
                quote: "Be Strong",
                quotee: "Marcus Aurelius"
              }
            }}><h4>Stoicism</h4></Link>
              <p className="philosophy-tags">#Nature #Expression</p>
            </div>
          </div>

          <div className = "philosophy-card">
            <div className = "philosophy-card-image">
              <a href="#">
                <img src = "https://via.placeholder.com/250" />
              </a>
            </div>
            <div className = "philosophy-card-descr">
              <Link to={{
              pathname: '/philosophy',
              aboutProps: {
                name: "Stoicism",
                description: "Don't complain",
                quote: "Be Strong",
                quotee: "Marcus Aurelius"
              }
            }}><h4>Stoicism</h4></Link>
              <p className="philosophy-tags">#Nature #Expression</p>
            </div>
          </div>

          <div className = "philosophy-card">
            <div className = "philosophy-card-image">
              <a href="#">
                <img src = "https://via.placeholder.com/250" />
              </a>
            </div>
            <div className = "philosophy-card-descr">
              <Link to={{
              pathname: '/philosophy',
              aboutProps: {
                name: "Stoicism",
                description: "Don't complain",
                quote: "Be Strong",
                quotee: "Marcus Aurelius"
              }
            }}><h4>Stoicism</h4></Link>
              <p className="philosophy-tags">#Nature #Expression</p>
            </div>
          </div>

          <div className = "philosophy-card">
            <div className = "philosophy-card-image">
              <a href="#">
                <img src = "https://via.placeholder.com/250" />
              </a>
            </div>
            <div className = "philosophy-card-descr">
              <Link to={{
              pathname: '/philosophy',
              aboutProps: {
                name: "Stoicism",
                description: "Don't complain",
                quote: "Be Strong",
                quotee: "Marcus Aurelius"
              }
            }}><h4>Stoicism</h4></Link>
              <p className="philosophy-tags">#Nature #Expression</p>
            </div>
          </div>          
        
  
    
      </div>
    </div>
        
      );
  }
  
}

export default withRouter(Explore);