import React from "react";
import { Link, withRouter } from "react-router-dom";
import SearchBar from './SearchBar';
import "./navigation.css";
// import axios from 'axios';

class Navigation extends React.Component {
  state = {};


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

  logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.setItem('user', '');
  }
  render() {
    if(sessionStorage.getItem("token")){
      return (
        <div className="navigation">
          <nav>
              <div class="navbar-brand" to="/">
                Athena
              </div>
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
                    <Link class="nav-link" to="/quotesSaved">
                      My Favorites
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
                  <Link  className="nav-link" onClick={()=>this.logout()} to="/">
                    Log Out
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