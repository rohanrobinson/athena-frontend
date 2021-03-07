import React from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import SearchBar from './SearchBar'
import "./explore.css";

class Explore extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { 
      names: [],
      descriptions: [],
      philosophies: [],
    };
  }



  componentDidMount(){
    axios.get(`https://athena-back-end.herokuapp.com/api/allphilosophies` )
      .then((response) => {
          // success
          console.log("here");
          console.log(response);
          this.setState({philosophies: response.data });
      })
      .catch((error) => {
        // error
        console.log(error);
      });
  }

  displayPhilosophies () {
    return this.state.philosophies.map((phil) => {
      return (
          <div key={phil.philosophy} className = "philosophy-card">
            <div className = "philosophy-card-image">
              <a>
                <img alt="taoism" src={phil.imageUrl}/>
              </a>
            </div>
            <div className = "philosophy-card-descr">
              <Link 
                to={{
                  pathname: '/philosophy',
                  aboutProps: {
                    phil: phil
                }
              }}>
                <h4>{phil.philosophy}</h4></Link>
              <p className="philosophy-tags"></p>
            </div>
          </div>
        )
    });
  }



  render() {
    return (	
      <div className = "explore-page">
        <div className="inspiration">
          <div className="inspiration-content">
            <h1>GET INSPIRATION</h1>
            <h2>Describe how you're feeling and we'll match you with quotes to provide you with inspiration</h2>
            <SearchBar/>
          </div>
        </div>
        <div className="discover">
          <div className="discover-content">
            <h1>DISCOVER PHILOSOPHIES</h1>
            <h2>Learn about new philosophies and browse through related quotes</h2>
          </div>
          <div className = "discover-philosophies">
            {this.displayPhilosophies()}
          </div>
        </div>
      </div>
                
      );
  }
  
}

export default withRouter(Explore);