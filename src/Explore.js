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
      loaded: false,

      displayCards: false, 
      displayArrow: true,

      user: '',
      email: '',
      userId: '',
      firstName: '',
      philosophyPercentages: '',

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
          this.setState({
            philosophies: response.data,
            loaded: true
           });
      })
      .catch((error) => {
        // error
        console.log(error);
      });
    
    // const config = {
    //   headers: {
    //     Authorization: 'Bearer ' + sessionStorage.getItem('token')
    //   }
    // };
    // axios.get(`https://athena-back-end.herokuapp.com/api/auth/get/${JSON.parse(sessionStorage.getItem('user'))._id.$oid}`, config)
    //   .then((res) => {
    //     console.log("result");
    //     console.log(res.data);
    //     sessionStorage.setItem('user', res.data); 
    //     // this.setState({
    //     //   user: res.data,
    //     //   firstName: res.data.firstName,
    //     //   email: res.data.email,
    //     //   userId: res.data._id.$oid,
    //     //   philosophyPercentages: res.data.surveyResults.philosophyPercentages
    //     // });
    //     console.log('done');
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    
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

  displayPhilosophies = () => {
    var phils = this.state.philosophies;
    if (this.state.philosophyPercentages) {
      var ps = [];
      var temp = this.state.philosophies;
      for (var i=0; i < temp.length; i++) {
        var name = temp[i].philosophy;
        if (name === "logical positivism") {
          name = 'logicalPositivism';
        }
        const percent = this.state.philosophyPercentages[name];
        ps.push([name, percent, temp[i]])
      }
      ps.sort(function(first, second, third) {
        return second[1] - first[1];
      });

      phils = ps.map((data) => {
        return data[2];
      });
    }

    return phils.map((phil) => {
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
              {this.state.philosophyPercentages ? (
                <>
                 <p className="philosophy-tags">{phil.philosophy === 'logical positivism' ? (Math.round(this.state.philosophyPercentages['logicalPositivism'])):(Math.round(this.state.philosophyPercentages[phil.philosophy]))}% match</p>
                </>
              ):(
                <>
                </>
              )}            </div>
            </Link>
          </div>
        </Tilt>
        )
    });
  }

  displayTopPhilosophies = () => {
    console.log("percents");
    console.log(this.state.philosophyPercentages);
    var phils = this.state.philosophies.slice(0,3)
    if (this.state.philosophyPercentages) {
      var ps = [];
      var temp = this.state.philosophies;
      for (var i=0; i < temp.length; i++) {
        var name = temp[i].philosophy;
        if (name === "logical positivism") {
          name = 'logicalPositivism';
        }
        const percent = this.state.philosophyPercentages[name];
        ps.push([name, percent, temp[i]])
      }
      ps.sort(function(first, second, third) {
        return second[1] - first[1];
      });

      phils = ps.slice(0, 3).map((data) => {
        return data[2];
      });
    }
    return phils.map((phil) => {
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
              {this.state.philosophyPercentages ? (
                <>
                 <p className="philosophy-tags">{phil.philosophy === 'logical positivism' ? (Math.round(this.state.philosophyPercentages['logicalPositivism'])):(Math.round(this.state.philosophyPercentages[phil.philosophy]))}% match</p>
                </>
              ):(
                <>
                </>
              )}
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

  collapse = (event) => {
    event.preventDefault();
    this.setState({
      displayArrow: true,
      displayCards: false
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
            <h2>Your Selected Philosophies:</h2>
          </div>
          <div className = "discover-philosophies">
            {this.state.displayCards ? (this.displayPhilosophies()):(this.displayTopPhilosophies())}
          </div>
          <div className = "discover-philosophies">
            {this.state.displayArrow && (this.displayArrow())}
          </div>
          <div className = "discover-philosophies">
            {!this.state.displayArrow && (<button id="collapse_button" onClick={this.collapse}>Collapse</button>)}
          </div>
          </div>
          </div>
        </div>


      </div>
                
      );
  }
  
}

export default withRouter(Explore);