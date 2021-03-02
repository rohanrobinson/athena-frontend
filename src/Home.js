import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import "./home.css";

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

  axios.post(`https://athena-back-end.herokuapp.com/api/auth/login`, loginObject )
      .then(res => {
        console.log("here");
        console.log(res);
        //console.log(res.data);
        //console.log(res.data.token);
        sessionStorage.setItem('token', res.data.token);
        console.log(sessionStorage.getItem('token'));
        // we will need to save the token globally somewhere
      })

  console.log(loginObject);
};
render() {
  return (
    <div className="wrapper">
      <div className="container">
        <h1>WELCOME</h1>
        <h2>Athena uses Machine Learning to provide you with inspirational quotes and philosophies that best suit your needs and personality</h2>
        
        <form className="log-form">
          <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange}/>
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
          <button type="submit" id="login-button" onClick={this.handleLogin}>Login</button>
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
