import React from "react";
import { Link, withRouter } from "react-router-dom";
import SearchBar from './SearchBar'

function Navigation(props) {
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
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/explore">
                  Explore
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/quotesSaved">
                  My Favorites
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/contact" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/createAccount">
                  Sign Up
                </Link>
              </li>
              <li class="nav-link">
                <a class="log-out" onClick={()=>alert("You have been succesfully logged out!")}>Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);