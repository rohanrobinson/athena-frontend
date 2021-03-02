import React from 'react';
import axios from 'axios';

class CreateAccount extends React.Component {
  state = {
    username: '',
    password: '',
    quoteSelected: ''
  };

  createAccount = e => {
    e.preventDefault();
    // fetch('http://localhost:5000/api/login', {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     username: this.state.username,
    //     password: this.state.password
    //
    //   })
    // })
    //   .then(response => response.json())
    //   .then(json => {
    //     const accessToken = json.access_token;
    //     this.props.onLogin(accessToken);
    //   })
    //   .catch(error => {
    //     this.props.onLoginError();
    //   });
    
    var radios = document.getElementsByClassName('quote');
    var favoriteQuote = '';
    for( let i = 0; i < radios.length; i++ ) {
        
        if (radios[i].checked) {
          favoriteQuote = radios[i].value;
        }
  }

    const userSurveyObject = {
      email: this.state.username,
      password: this.state.password,
      savedQuotes: [favoriteQuote],
    }

    axios.post(`https://athena-back-end.herokuapp.com/api/auth/signup`, userSurveyObject )
      .then(res => {
        console.log(res);
        console.log(res.data);
        // we will need to save the token globally somewhere
      })

      // console.log(userSurveyObject);
  };

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

  


  render() {
    return (
    <div className="container">
    <h2>Account Creation</h2>
    <div className="log-form">
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          placeholder="Password"
        />       
        <button type="submit" onClick={this.createAccount}>Create Account</button>
      </form>
      </div>
      </div>
    );
  }
}

export default CreateAccount;