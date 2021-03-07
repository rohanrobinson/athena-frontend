import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const CreateAccount = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const createAccount = (event) => {
    event.preventDefault();
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
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert("Account created. You can now log in.");
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  const updateUsername = (event) => {
    setUsername(event.target.value);
  }

  const updatePassword = (event) => {
    setPassword(event.target.value);
  }

  return (
    <div>
        <form>
        
        Email:
        <br />
        <input
          type="text"
          name="username"
          value={username}
          onChange={updateUsername}
          placeholder="example@gmail.com"
        />
        <br />

        Password:
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={updatePassword}
        />
        <br />
        {/* <b>Pick your favorite of the quotes listed here!</b> <br />
        <div className="quotes">
          <input type="radio" name="quote1" value="Waste no more time arguing what a good man should be. Be One" className="quote" /> Waste no more time arguing what a good man should be. Be One < br />  < br />
          <input type="radio" name="quote2" value="The words of truth are always paradoxical" className="quote" /> The words of truth are always paradoxical  < br />  < br />
          <input type="radio" name="quote3" value="It is not so much our friends help that helps us, as the confidence of their help" className="quote" /> It is not so much our friends help that helps us, as the confidence of their help  < br />  < br />
          <input type="radio" name="quote4" value="I finally figured out the only reason to be alive is to enjoy it" className="quote" /> I finally figured out the only reason to be alive is to enjoy it  < br />  < br />
          <input type="radio" name="quote5" value="All our knowledge begins with the senses, proceeds then to the understanding, and ends with reason. There is nothing higher than reason." className="quote" /> All our knowledge begins with the senses, proceeds then to the understanding, and ends with reason. There is nothing higher than reason.  < br />  < br />
          <input type="radio" name="quote6" value="Boredom is simply romanticism with a morning-after thirst." className="quote" /> Boredom is simply romanticism with a morning-after thirst.  < br />  < br />
        </div> */}
        
        <button onClick={createAccount}>Create Account</button>
      </form>
    </div>
  )
}
export default CreateAccount;
