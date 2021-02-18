import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

class Home extends React.Component {
  state = {
    username: '',
    password: '',
  };
  // const h1Style = {
  //   marginBottom: '-10px'
  // };
  // const pStyle = {
  //   marginLeft: '70px',
  //   marginRight: '70px'
  // }
  // const referralStyle = {
  //   color: 'var(--primary-col-var)',
  //   textDecoration: 'none',
  //   transition: '.5s',
  //   "&:hover": {
  //     background: "#EFEFEF"
  //   },
  // }
handleUsernameChange = e => {
  this.setState({
    username: e.target.value
  });
};
handlePasswordChange = e => {
  this.setState({
    password: e.target.value
  });
};
handleLogin = e => {
  e.preventDefault();
  const loginObject = {
    email: this.state.username,
    password: this.state.password,
  }

  axios.post(`http://localhost:5000/api/auth/login`, loginObject )
      .then(res => {
        console.log("here");
        console.log(res);
        console.log(res.data);
        // we will need to save the token globally somewhere
      })

  console.log(loginObject);
};
render() {
  return (
  <div>
    <div id="container">
      <h1 >Athena</h1>
      <h2>Get Advice. Gain Wisdom</h2>
      <p >Athena uses Machine Learning to provide you with inspirational quotes and philosophies that best suit your needs and personality</p>
      <div id="login-form">
        <form>
          <input type="text" class="data-input" id="username" placeholder="username or email" value={this.state.username}
          onChange={this.handleUsernameChange} name="username" />
          <input type="password" class="data-input" id="password" placeholder="password" value={this.state.password}
          onChange={this.handlePasswordChange} name="password" />
          <button type="submit" onClick={this.handleLogin}>Log In</button>
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
}
export default withRouter(Home);
