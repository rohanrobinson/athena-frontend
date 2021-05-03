import React from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import SearchBar from './SearchBar';
import "./explore.css";
import Tilt from 'react-tilt'

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
        <Tilt className="Tilt" options={{ max : 25 }}>
          <div key={phil.philosophy} className = "philosophy-card">
                        <Link 
                to={{
                  pathname: '/philosophy',
                  aboutProps: {
                    phil: phil
                }
              }}>
            <div className = "philosophy-card-image">
              <a>
                <img alt={phil.philosophy} src={phil.imageUrl} />
              </a>
            </div>
            <div className = "philosophy-card-descr">

                <h4>{phil.philosophy[0].toUpperCase() + phil.philosophy.slice(1)}</h4>
              <p className="philosophy-tags">100% match</p>
            </div>
            </Link>
          </div>
        </Tilt>
        )
    });
  }

  render() {
    return (	
      <div className = "explore-page">
        <div className="inspiration">
          <div className="left-hand">
          <div className="right-hand">
          <div className="inspiration-content">
            <h1>GET INSPIRATION</h1>
            <h2>Describe how you're feeling and we'll match you with quotes to provide you with inspiration</h2>
            <SearchBar/>
          </div>
          </div>
          </div>
        </div>
        <div className="discover">
          <div className="left-poly">
          <div className="right-poly">
          <div className="discover-content">
            <h1>DISCOVER PHILOSOPHIES</h1>
            <h2>Learn about new philosophies and browse through related quotes</h2>
          </div>
          <div className = "discover-philosophies">
            {this.displayPhilosophies()}
          </div>
          </div>
          </div>

  
        </div>
      </div>
                
      );
  }
  
}

export default withRouter(Explore);