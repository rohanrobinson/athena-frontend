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
      user: '',
      email: '',
      userId: '',
      firstName: '',
      philosophyPercentages: '',
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
    
      if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === '') {
        console.log('login')
      } 
      else {
        this.setState({
          user: (JSON.parse(sessionStorage.getItem('user'))),
          firstName: (JSON.parse(sessionStorage.getItem('user')).firstName),
          email: (JSON.parse(sessionStorage.getItem('user')).email),
          userId: (JSON.parse(sessionStorage.getItem('user'))._id.$oid),
          philosophyPercentages: (JSON.parse(sessionStorage.getItem('user')).surveyResults.philosophyPercentages)
        });

        console.log("name");
        console.log(JSON.parse(sessionStorage.getItem('user')).firstName);

      }
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
              <p className="philosophy-tags">{phil.philosophy === 'logical positivism' ? (Math.round(this.state.philosophyPercentages['logicalPositivism'])):(Math.round(this.state.philosophyPercentages[phil.philosophy]))}% match</p>
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
            { this.state.firstName === "" || this.state.firstName === undefined ? (
              <>
              <h1>Welcome to Athena</h1>
              </>
            ):(
              <>
              <h1>Welcome, {this.state.firstName}</h1>
              </>
            )}
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