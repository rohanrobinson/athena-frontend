import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./createAccount.css"
const CreateAccount = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
      firstName: firstName,
      lastName:lastName,
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
              history.push('/survey');
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

  const updateFirstName= (event) => {
    setFirstName(event.target.value);
  }

  const updateLastName = (event) => {
    setLastName(event.target.value);
  }

  return (
    <div className="createAccountPage">
      <div className="container">
        <form className="log-form">
        <h1>Create an Account</h1>
        <br/>
        <h2>First Name</h2>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={updateFirstName}
          />
          <h2>Last Name</h2>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={updateLastName}
          />
        <h2>Email</h2>
          <input
            type="text"
            name="username"
            value={username}
            onChange={updateUsername}
            placeholder="example@gmail.com"
          />

          <h2>Password</h2>
          <input
            type="password"
            name="password"
            value={password}
            onChange={updatePassword}
          />

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
