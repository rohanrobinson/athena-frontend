import React from "react";
import { Link, withRouter } from "react-router-dom";

const h1Style = {
  marginBottom: '-10px'
};

const pStyle = {
  marginLeft: '70px',
  marginRight: '70px'
}

const referralStyle = {

  color: 'var(--primary-col-var)',
	textDecoration: 'none',
	transition: '.5s',

  "&:hover": {
    background: "#efefef"
  },
}


function Home() {
  return (
  <div>
    <div id="container">
      <h1 style={h1Style}>Athena</h1>
      <h2>Get Advice. Gain Wisdom</h2>
      <p style={pStyle}>Athena uses Machine Learning to provide you with inspirational quotes and philosophies that best suit your needs and personality</p>
      <div id="login-form">
        <form>
          <input type="text" class="data-input" id="username" placeholder="username or email" />
          <input type="password" class="data-input" id="password" placeholder="password" />
          <button type="submit">Log In</button>
        </form>
      </div>
      <div id="signup-link">
        <p>
          Don't have an account? 
          <Link class="nav-link" to="/contact">
                  Sign up
          </Link>
        </p>
      </div>
    </div >
  </div>
  );
}

export default withRouter(Home);