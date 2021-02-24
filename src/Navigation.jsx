import React from "react";
import { Link, withRouter } from "react-router-dom";
import SearchBar from './SearchBar'
import axios from 'axios';

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
  }
  render() {
    //if(this.state.user){
    if(sessionStorage.getItem("token")){
      return (
        <div className="navigation">
          <nav class="navbar navbar-expand navbar-dark bg-primary">
            <div class="container">
              <Link class="navbar-brand" to="/">
                Athena
              </Link>

              <div>
                <ul class="navbar-nav ml-auto">
                  <li>
                    <SearchBar />              
                  </li>
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
                  <li class="nav-link">
                    <a class="log-out" onClick={()=>this.logout()}>Log Out</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )
    }
    else {
      return (
        <div className="navigation">
          <nav class="navbar navbar-expand navbar-dark bg-primary">
            <div class="container">
              <Link class="navbar-brand" to="/">
                Athena
              </Link>

              <div>
                <ul class="navbar-nav ml-auto">
                  <li>
                    <SearchBar />              
                  </li>
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
                    <Link class="nav-link" to="/createAccount">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }
  }
}

export default withRouter(Navigation);