import React from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

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
      <div id="container">
        <h3>Explore Philosophies</h3>
        <div className = "philosophies">
          {this.displayPhilosophies()}
        </div>
    
    </div>
        
      );
  }
  
}

export default withRouter(Explore);