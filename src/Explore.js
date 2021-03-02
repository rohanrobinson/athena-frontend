import React from 'react';
import Philosophy from './Philosophy';
import { Link, withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import "./explore.css";

class Explore extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { names: [], descriptions: [], };

     // this.handleClick = this.handleClick.bind(this);
  }



  componentDidMount(){
    axios.get(`https://athena-back-end.herokuapp.com/api/allphilosophies` )
      .then((response) => {
          const names = [];
          const descriptions = [];
          const data = response.data

          for (var i = 0 ; i < data.length; i++) {
              names.push(data[i].philosophy);
              descriptions.push(data[i].description);
          }
          this.setState({ names: names, descriptions: descriptions });
          console.log(this.state);
    });

  }




  render() {
    return (
    <div className = "explore-page">
      <div className="inspiration">
        <div className="inspiration-content">
          <h1>GET INSPIRATION</h1>
          <h2>Describe how you're feeling and we'll match you with quotes to provide you with inspiration</h2>
          <form className="example" action="/action_page.php">
            <div className="button-area">
              <input type="text" placeholder="I'm feeling..." name="search2"/>
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
      </div>
      <div className="discover">
        <div className="discover-content">
          <h1>DISCOVER PHILOSOPHIES</h1>
          <h2>Learn about new philosophies and browse through related quotes</h2>
        </div>
          {/* <button onClick={this.handleClick}>Get Philosophy Data</button> */}
          <div className = "discover-philosophies">
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
                    name: this.state.names[0],
                    description: this.state.descriptions[0],
                    quote: "Taoist quote",
                    quotee: "Taoist quotee"
                  }
                }}><h4>{this.state.names[0]}</h4></Link>
                <p className="philosophy-tags"></p>
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
                  name: this.state.names[1],
                  description: this.state.descriptions[1] ,
                  quote: "Stoic quote",
                  quotee: "Stoic quotee"
                }
              }}><h4>{this.state.names[1]}</h4></Link>
                <p className="philosophy-tags"></p>
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
                  name: this.state.names[2],
                  description: this.state.descriptions[2],
                  quote: "Realist quote",
                  quotee: "Realist quotee"
                }
              }}><h4>{this.state.names[2]}</h4></Link>
                <p className="philosophy-tags"></p>
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
                  name: this.state.names[3],
                  description: this.state.descriptions[3],
                  quote: "Actualist quote",
                  quotee: "Actualist quotee"
                }
              }}><h4>{this.state.names[3]}</h4></Link>
                <p className="philosophy-tags"></p>
              </div>
            </div>

            {/* <div className = "philosophy-card">
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
            </div>           */}
        </div>
      </div>
    </div>
        
      );
  }
  
}

export default withRouter(Explore);