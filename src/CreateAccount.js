import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./createAccount.css"

const CreateAccount = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const createAccount = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // var radios = document.getElementsByClassName('quote');
    // var favoriteQuote = '';
    // for( let i = 0; i < radios.length; i++ ) {
    //     if (radios[i].checked) {
    //       favoriteQuote = radios[i].value;
    //     }
    // }

    const userSurveyObject = {
      email: username,
      password: password,
      savedQuotes: [],
      // surveyResults: {
      //   quote: favoriteQuote
      // },
    }

    axios.post(`https://athena-back-end.herokuapp.com/api/auth/signup`, userSurveyObject )
      .then(resp => {
        // success
        const loginObject = {
          email: username,
          password: password,
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
              setIsLoading(false);
              history.push('/explore');
            })
            .catch((error) => {
              // alert('Incorrect username or password.');
              console.log(error);
              this.setState({ isLoading: false, incorrect: true });
              setIsLoading(false);
            });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIncorrect(true);
      });
  }

  const updateUsername = (event) => {
    setUsername(event.target.value);
  }

  const updatePassword = (event) => {
    setPassword(event.target.value);
  }

  return (
    <div className="createAccountPage">
      <div className="container">
        <form className="log-form">
        <h1>Create an Account</h1>
        <br/>
        <h2>Email</h2>
          <input
            type="text"
            name="username"
            value={username}
            onChange={updateUsername}
            placeholder="example@gmail.com"
          />
          <br />

          <h2>Password</h2>
          <input
            type="password"
            name="password"
            value={password}
            onChange={updatePassword}
          />
          {/* <b>Pick your favorite of the quotes listed here!</b> <br />
          <div className="quotes">
            <input type="radio" name="quote1" value="Waste no more time arguing what a good man should be. Be One" className="quote" /> Waste no more time arguing what a good man should be. Be One < br />  < br />
            <input type="radio" name="quote2" value="The words of truth are always paradoxical" className="quote" /> The words of truth are always paradoxical  < br />  < br />
            <input type="radio" name="quote3" value="It is not so much our friends help that helps us, as the confidence of their help" className="quote" /> It is not so much our friends help that helps us, as the confidence of their help  < br />  < br />
            <input type="radio" name="quote4" value="I finally figured out the only reason to be alive is to enjoy it" className="quote" /> I finally figured out the only reason to be alive is to enjoy it  < br />  < br />
            <input type="radio" name="quote5" value="All our knowledge begins with the senses, proceeds then to the understanding, and ends with reason. There is nothing higher than reason." className="quote" /> All our knowledge begins with the senses, proceeds then to the understanding, and ends with reason. There is nothing higher than reason.  < br />  < br />
            <input type="radio" name="quote6" value="Boredom is simply romanticism with a morning-after thirst." className="quote" /> Boredom is simply romanticism with a morning-after thirst.  < br />  < br />
          </div> */}

          { incorrect ? (
            <>
            <p id="bad_signup">Email must be valid and password must be at least 6 characters.</p>
            </>
          ):(
            <>
            </>
          )}

          <button onClick={createAccount}>Create Account</button>
          { isLoading ? (
            <>
            <div id="sign_up_load_cont">
              <div class="loader"></div>
            </div>
            </>
          ):(
            <>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
export default CreateAccount;
