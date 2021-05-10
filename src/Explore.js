import React from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import SearchBar from './SearchBar';
import "./explore.css";
import AOS from "aos";
import Tilt from 'react-tilt'


class Explore extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { 
      names: [],
      descriptions: [],
      philosophies: [],

      displayCards: false, 
      displayArrow: true

      user: '',
      email: '',
      userId: '',
      firstName: '',

    };
  }



  componentDidMount(){
    AOS.init({
      duration: 2000,
    })

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
          userId: (JSON.parse(sessionStorage.getItem('user'))._id.$oid)
        });

        console.log("name");
        console.log(JSON.parse(sessionStorage.getItem('user')).firstName);

      }
  }

  displayPhilosophies = () => {
    return this.state.philosophies.map((phil) => {
      return (

//           <div key={phil.philosophy} data-aos="zoom-in" className = "philosophy-card" >
//             <div className = "philosophy-card-image">
//               <a>
//                 <img alt={phil.philosophy} src={phil.imageUrl} />
//               </a>
//             </div>
//             <div className = "philosophy-card-descr">
//               <Link 

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


  displayArrow = () => {
    return (
      <button className="down-button" onClick={this.displayCards.bind(null, true)}>
        <div class="arrow">
            Click for more philosophies
            <span></span>
            <span></span>
            <span></span>
        </div>
      </button>
    )
  }

  displayCards = (bool) => {
    this.setState({
      displayCards: true
    });
    this.setState({
      displayArrow: false
    });
  }


  render() {
    return (	
      <div className = "explore-page">
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>
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
            {this.state.displayArrow && (this.displayArrow())}
            {this.state.displayCards && (this.displayPhilosophies())}
          </div>
          </div>
          </div>
        </div>


      </div>
                
      );
  }
  
}

export default withRouter(Explore);