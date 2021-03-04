import React from "react";
import { Link, withRouter } from "react-router-dom";
import SearchBar from './SearchBar'
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
    //if(this.state.user){
    if(sessionStorage.getItem("token")){
      return (
        <div className="navigation">
          <nav className="navbar navbar-expand navbar-dark bg-primary">
            <div className="container">
              <Link className="navbar-brand" to="/">
                Athena
              </Link>

              <div>
                <ul className="navbar-nav ml-auto">
                  <li>
                    <SearchBar />              
                  </li>
                  <li
                    className={`nav-item  ${
                      this.props.location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/explore">
                      Explore
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item  ${
                      this.props.location.pathname === "/about" ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/favorites">
                      My Favorites
                    </Link>
                  </li>
                  <li
                    className={`nav-item  ${
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
              </div>
            </div>
          </nav>
        </div>
      )
    }
    else {
      return (
        <div className="navigation">
          <nav className="navbar navbar-expand navbar-dark bg-primary">
            <div className="container">
              <Link className="navbar-brand" to="/">
                Athena
              </Link>

              <div>
                <ul className="navbar-nav ml-auto">
                  <li>
                    <SearchBar />              
                  </li>
                  <li
                    className={`nav-item  ${
                      this.props.location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/explore">
                      Explore
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item  ${
                      this.props.location.pathname === "/about" ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/favorites">
                      Favorites
                    </Link>
                  </li>
                  <li
                    className={`nav-item  ${
                      this.props.location.pathname === "/contact" ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/createAccount">
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