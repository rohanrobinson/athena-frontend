import React from "react";
import { Link, withRouter } from "react-router-dom";
import SearchBar from './SearchBar';
import "./navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Menu, Button, MenuItem } from "@material-ui/core"
// import axios from 'axios';

class Navigation extends React.Component {
  state = {
    iconClicked: false
  };


  componentDidMount() {
  const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  };
  //
  //  axios.get(`https://athena-back-end.herokuapp.com/api/auth/get`, config).then(
  //    res => {
  //      this.setState({
  //        user: res.data
  //      });
  //      console.log(res)
  //    }
  //  )
  }

  iconClicked = () => {
    if (this.state.iconClicked === false) {
      this.setState({
        iconClicked: true,
      });
  }
  else if (this.state.iconClicked === true) {
    this.setState({
      iconClicked: false,
    })
  }
}

  logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.setItem('user', '');
  }

  render() {
    if(sessionStorage.getItem("token")){
      return (
        <div className="navigation">
          <nav>
          <Link class="nav-link" to="/explore">
              <div class="navbar-brand" to="/">
                Athena
              </div>
          </Link>
                <ul>
                  <li
                    class={`nav-item  ${
                      this.props.location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/explore">
                      Explore
                      <span class="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li
                    class={`nav-item  ${
                      this.props.location.pathname === "/about" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/favorites">
                      My Favorites
                    </Link>
                  </li>
                  <li
                    class={`nav-item  ${
                      this.props.location.pathname === "/about" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/aboutus">
                      About Us
                    </Link>
                  </li>
                  <li
                    class={`nav-item  ${
                      this.props.location.pathname === "/contact" ? "active" : ""
                    }`}
                  >
                  </li>
                  {/* <li className="nav-link">
                    <a className="log-out" onClick={()=>this.logout()} >Log Out</a>
                  </li> */}

                  <Link class="nav-link">
                    
                    <FontAwesomeIcon icon={faUser} className="user_icon" onClick={() => this.iconClicked()}  />
                    { this.state.iconClicked ? <Link className="nav-link" onClick={() => this.logout()} to="/" >LogOut</Link> : <></> }
                    { this.state.iconClicked ? <Link className="nav-link" to="/surveyInfo" >Survey Info</Link> : <></> }
                  </Link>

                </ul>
          </nav>
        </div>
      )
    }
    else {
      return (
        <div className="navigation">
          <nav>
              <Link class="navbar-brand" to="/">
                Athena
              </Link>
                <ul>
                  <li
                    class={`nav-item  ${
                      this.props.location.pathname === "/contact" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/createAccount">
                      Sign Up
                    </Link>
                  </li>
                </ul>
          </nav>
        </div>
      );
    }
  }
}


export default withRouter(Navigation);