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
      <form onSubmit={this.handleSubmit}>
        
        Email:
        <br />
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          placeholder="example@gmail.com"
        />
        <br />

        Password:
        <br />
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <br />
        <b>Pick your favorite of the quotes listed here!</b> <br />
        <div className="quotes">
          <input type="radio" name="quote1" value="Waste no more time arguing what a good man should be. Be One" className="quote" /> Waste no more time arguing what a good man should be. Be One < br />  < br />
          <input type="radio" name="quote2" value="The words of truth are always paradoxical" className="quote" /> The words of truth are always paradoxical  < br />  < br />
          <input type="radio" name="quote3" value="It is not so much our friends help that helps us, as the confidence of their help" className="quote" /> It is not so much our friends help that helps us, as the confidence of their help  < br />  < br />
          <input type="radio" name="quote4" value="I finally figured out the only reason to be alive is to enjoy it" className="quote" /> I finally figured out the only reason to be alive is to enjoy it  < br />  < br />
          <input type="radio" name="quote5" value="All our knowledge begins with the senses, proceeds then to the understanding, and ends with reason. There is nothing higher than reason." className="quote" /> All our knowledge begins with the senses, proceeds then to the understanding, and ends with reason. There is nothing higher than reason.  < br />  < br />
          <input type="radio" name="quote6" value="Boredom is simply romanticism with a morning-after thirst." className="quote" /> Boredom is simply romanticism with a morning-after thirst.  < br />  < br />
        </div>
        
        <button onClick={this.createAccount}>Create Account</button>
      </form>
    );
  }
}

export default CreateAccount;