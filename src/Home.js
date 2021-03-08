import React from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import "./home.css"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      incorrect: false,
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
  this.setState({ isLoading: true });
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
        this.setState({ isLoading: false });
        this.props.history.push('/explore/');
        // we will need to save the token globally somewhere
      })
      .catch((error) => {
        // alert('Incorrect username or password.');
        console.log(error);
        this.setState({ isLoading: false, incorrect: true });
      });

  console.log(loginObject);
};
render() {
  return (
    <div className="wrapper">
      <div className="container">
        <h1>WELCOME</h1>
        <h2>Athena uses Machine Learning to provide you with inspirational quotes and philosophies that best suit your needs and personality</h2>
        <form className="log-form">
          <input type="text" placeholder="Email" value={this.state.username} onChange={this.handleUsernameChange}/>
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
          { this.state.incorrect ? (
            <>
            <p id="incorrect_login">Incorrect email or password.</p>
            </>
          ):(
            <>
            </>
          )}
          
          <button type="submit" id="login-button" onClick={this.handleLogin}>Login</button>
          { this.state.isLoading ? (
            <>
            <div id="loader_cont">
              <div class="loader"></div>
            </div>
            </>
          ):(
            <>
            </>
          )}
          
        </form>
        
      </div>
      
      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
}
export default withRouter(Home);
