import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

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

  axios.post(`https://athena-back-end.herokuapp.com/api/auth/login`, loginObject )
      .then(res => {
        console.log("here");
        console.log(res);
        //console.log(res.data);
        //console.log(res.data.token);
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('user', res.data.user);
        console.log(sessionStorage.getItem('user'));
        // console.log(sessionStorage.getItem('token'));
        this.props.history.go(0);
        // we will need to save the token globally somewhere
      })
      .catch((error) => {
        alert('Incorrect username or password.');
        console.log(error);
      });

  console.log(loginObject);
};
render() {
  return (
  <div>
    <div id="container">
      <h1 >Athena</h1>
      <h2>Get Advice. Gain Wisdom</h2>
      <p >Athena uses Machine Learning to provide you with inspirational quotes and philosophies that best suit your needs and personality</p>
      { sessionStorage.getItem('token')===null || sessionStorage.getItem('token')==='' ? (
        <>
        <div id="login-form">
        <form>
          <input type="text" className="data-input" id="username" placeholder="username or email" value={this.state.username}
          onChange={this.handleUsernameChange} name="username" />
          <input type="password" className="data-input" id="password" placeholder="password" value={this.state.password}
          onChange={this.handlePasswordChange} name="password" />
          <button type="submit" onClick={this.handleLogin}>Log In</button>
        </form>
      </div>
      <div id="signup-link">
        <p>
          Don't have an account?
          <Link className="nav-link" to="/contact">
                  Sign up
          </Link>
        </p>
      </div>
      </>
      ):(
        <>
        </>
      )}
      
    </div >
  </div>
  );
}
}
export default withRouter(Home);
