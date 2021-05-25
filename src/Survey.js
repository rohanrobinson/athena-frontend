import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link, withRouter } from "react-router-dom";
import "./Survey.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import backendUrl from './backendUrl';

const Survey = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [validated, setValidated] = useState(false);

  const originalQuestions = [
    {
      type: "mult",
      q: "What is the point of life?",
      a: "nothing, there is no point", // nihilism
      b: "to be humble and to help others", //taoism
      c: "to maximize pleasure", // hedonism
      ans: ""
    },
    {
      type: "mult",
      q: "What do you value most?",
      a: "meditation", //buddhism
      b: "logic", // rationalism
      c: "discipline", // stoicism
      ans: ""
    },
    {
      type: "input",
      q: "What philosophies are you familiar with?",
      ans: ""
    },
    {
      type: "input",
      q: "What are you looking to get out of Athena?",
      ans: ""
    },
    {
      type: "slider", //existentialism
      q:  "Use the slider to show how much you agree with the following: 1 (I strongly disagree) - 10 (I strongly agree)",
      quote: "I realize today that nothing in the world is more distasteful to a man than to take the path that leads to himself.",
      ans: ""
    },
    {
      type: "slider", // marxism
      q:  "Use the slider to show how much you agree with the following (1 (I strongly disagree) - 10 (I strongly agree))",
      quote: "The philosophers have only interpreted the world, in various ways. The point, however, is to change it.",
      ans: ""
    },
    {
      type: "user-info", 
      info: "What is your First Name?",
      ans: ""
    },
    {
      type: "user-info", 
      info: "What is your Last Name?",
      ans: ""
    },
    {
      type: "user-info",
      info: "What email address would be best for you?",
      ans: ""
    },
    {
      type: "user-info", 
      info: "Create a password. Make it good!", 
      ans: ""
    }


  ];

  const [questions, setQuestions] = useState(originalQuestions);

  useEffect(() => {
    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === '') {
      // not logged in
      console.log('not logged in');
      setLoggedIn(false);
    } else {
      // logged in
      setLoggedIn(true);
      setUser(JSON.parse(sessionStorage.getItem('user')));
      setEmail(JSON.parse(sessionStorage.getItem('user')).email);
      setUserId(JSON.parse(sessionStorage.getItem('user'))._id.$oid);
    }
  }, []);

  const handleNext = (event) => {
    if (currentQuestionIndex === questions.length - 1) {
      setCurrentQuestionIndex(0);
      setSelected(questions[0].ans);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelected(questions[currentQuestionIndex + 1].ans);
    }
  }

  const handleBack = (event) => {
    setSelected("");
    if (currentQuestionIndex === 0) {
      setCurrentQuestionIndex(questions.length - 1);
      setSelected(questions[questions.length - 1].ans);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelected(questions[currentQuestionIndex - 1].ans);
    }
  }

  const submitSurvey = (event) => {
    event.preventDefault();
    console.log("submit");
    console.log(questions);
    
    // grade the survey
    var philosophies = [];




    var philosophyPercentages = {
      nihilism: Math.random()*50,
      taoism: Math.random()*50,
      hedonism: Math.random()*50,
      buddhism: Math.random()*50,
      rationalism: Math.random()*50,
      stoicism: Math.random()*50,
      existentialism: Math.random()*50,
      marxism: Math.random()*50,
      logicalPositivism: Math.random()*50,
      relativism: Math.random()*50,
    }
    // question 1
    switch(questions[0].ans) {
      case 'nothing, there is no point':
        philosophies.push("nihilism");
        philosophyPercentages.nihilism = Math.random()*50+50
        break;
      case 'to be humble and to help others':
        philosophies.push("taoism");
        philosophyPercentages.taoism = Math.random()*50+50
        break;
      case 'to maximize pleasure':
        philosophies.push("hedonism");
        philosophyPercentages.hedonism = Math.random()*50+50
        break;
      default:
        break;
    }
    // question 2
    switch(questions[1].ans) {
      case 'meditation':
        philosophies.push("buddhism");
        philosophyPercentages.buddhism = Math.random()*50+50
        break;
      case 'logic':
        philosophies.push("rationalism");
        philosophyPercentages.rationalism = Math.random()*50+50
        break;
      case 'discipline':
        philosophies.push("stoicism");
        philosophyPercentages.stoicism = Math.random()*50+50
        break;
      default:
        break;
    }
    // question 5
    if (questions[4].ans > 5) {
      philosophies.push("existentialism");
      philosophyPercentages.existentialism = Math.random()*50+50
    }
    // question 6
    if (questions[5].ans > 5) {
      philosophies.push("marxism");
      philosophyPercentages.marxism = Math.random()*50+50
    }

    //get user personal name, and login information (questionss 7 through 10)
    var firstName = questions[6].ans;
    var lastName = questions[7].ans;
    var email = questions[8].ans;
    var password = questions[9].ans;

    const config = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    };
    


    const body = {
      surveyResults: {
        questions: questions,
        philosophies: philosophies,
        philosophyPercentages: philosophyPercentages,
      }
    };

    const userSurveyObject = {
      email: email,
      password: password,
      firstName: firstName,
      lastName:lastName,
      savedQuotes: [],
      surveyResults: {
        questions: questions,
        philosophies: philosophies,
        philosophyPercentages: philosophyPercentages,
      }
    }

    console.log(body);
    axios.post(`https://athena-back-end.herokuapp.com/api/auth/signup`, userSurveyObject )
    .then(resp => {
      // success
      const loginObject = {
        email: email,
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
            setValidated(false);
            history.push('/results');
            // history.push('/survey');
            // axios.put(`https://athena-back-end.herokuapp.com/api/auth/update/${JSON.parse(sessionStorage.getItem('user'))._id.$oid}`, body, config)
            //         .then((response) => {
            //           // success
            //           console.log("success");
            //           console.log(response);
            //           setValidated(false);
            //           history.push('/results');
            //         })
            //         .catch((error) => {
            //           // error
            //           console.log(error);
            //         });
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

    // need to adjust for user's without an account
    // axios.put(`https://athena-back-end.herokuapp.com/api/auth/update/${JSON.parse(sessionStorage.getItem('user'))._id.$oid}`, body, config)
    //   .then((response) => {
    //     // success
    //     console.log("success");
    //     console.log(response);
    //     setValidated(false);
    //     history.push('/results');
    //   })
    //   .catch((error) => {
    //     // error
    //     console.log(error);
    //   });
  };

  const updateAnswer = (event) => {
    var temp = questions;
    if (questions[currentQuestionIndex].type === "mult") {
      setSelected(event.target.value);
      temp[currentQuestionIndex].ans = event.target.value;
      setQuestions(temp);
    }
    if (questions[currentQuestionIndex].type === "input") {
      setSelected(event.target.value);
      temp[currentQuestionIndex].ans = event.target.value;
      setQuestions(temp);
    }
    if (questions[currentQuestionIndex].type === "user-info") {
      setSelected(event.target.value);
      temp[currentQuestionIndex].ans = event.target.value;
      setQuestions(temp);
    }

    if (questions[currentQuestionIndex].type === "slider") {
      setSelected(event.target.value);
      temp[currentQuestionIndex].ans = event.target.value;
      setQuestions(temp);
    }
    var sub = true;
    for (var i=0; i < temp.length; i++) {
      if (temp[i].ans === "") {
        sub = false;
      }
    }
    setValidated(sub);
  }

  const displayQuestion = () => {
    const name = Date.now();
    if (questions[currentQuestionIndex].type === "mult"){
      return (
        <div key={selected} id="mult_choice">
          <p>{questions[currentQuestionIndex].q}</p>
          <div className="mult_choice_opt">
            <input onChange={updateAnswer} type="radio" value={questions[currentQuestionIndex].a} name={name} checked={ questions[currentQuestionIndex].a === selected }/> {questions[currentQuestionIndex].a}
          </div>
          <div className="mult_choice_opt">
            <input onChange={updateAnswer} type="radio" value={questions[currentQuestionIndex].b} name={name} checked={ questions[currentQuestionIndex].b === selected }/> {questions[currentQuestionIndex].b}
          </div>
          <div className="mult_choice_opt">
          <input onChange={updateAnswer} type="radio" value={questions[currentQuestionIndex].c} name={name} checked={ questions[currentQuestionIndex].c === selected }/> {questions[currentQuestionIndex].c}
          </div>
        </div>
      )
    }
    else if (questions[currentQuestionIndex].type === "input"){
      return (
        <div>
          <p>{questions[currentQuestionIndex].q}</p>
          <input type="text" onChange={updateAnswer} value={selected} placeholder="Enter response..." className="input_ques"/>
        </div>
      )
    }

    else if (questions[currentQuestionIndex].type === "slider") {
      return (
        <div>
          <p>{questions[currentQuestionIndex].q}</p> 
          <p>{questions[currentQuestionIndex].quote}</p>
          1<input type="range" min="1" max="10" onChange={updateAnswer} value={selected}/>10 <br />
          <output>{selected}</output>
        </div>
      )
    }
    else if (questions[currentQuestionIndex].type === "user-info"){
      return (
        <div>
          <h2 className="user-info-header">{questions[currentQuestionIndex].info}</h2>
          <input
            className="input_ques"
            type="text"
            placeholder="Enter response..."
            value={selected}
            onChange={updateAnswer}
          />
        </div>
      )
    }
    else {
      return (
        <p>error</p>
      )
    }
    
  }

  return (
    <div>
      

          <div id="out_cont">
          <div id="survey_cont">
          <div id="navigation_div">
              <Link className="navigation_link" id="skip_link" to="/createAccount">
                  <span className="navigation_span">Skip Survey</span>
              </Link> 

              &nbsp; &nbsp; &nbsp; &nbsp;
              <Link className="navigation_link" id="login_link" to="/login">
                  <span className="navigation_span">Log In</span>
              </Link> 
            </div>

            <p className="survey_title">Welcome to Athena!</p>
            <p className="survey_title">Complete the survey to find your suggested philosophies.</p>
            <div id="question_cont">
              <div className="button_cont">
                {currentQuestionIndex === 0 ? (
                  <>
                  </>
                ):(

                <>
                  
                  <div className="arrow-div" onClick={handleBack}>
                  <svg viewBox="0 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g id="prev" transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)">
                      <polygon class="arrow" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
                      <polygon class="arrow-fixed" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
                      <path d="M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
                    </g>
                  </svg>
                  </div>
                </>
                )}
              </div>
              <div id="ques">
                { displayQuestion() }
              </div>
              <div className="button_cont">
                {currentQuestionIndex === questions.length - 1 ? (
                  <>
                  </>
                ):(
                <>
                  <div className="arrow-div" onClick={handleNext}>
                   <svg viewBox="-1 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g>
                      <polygon class="arrow" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
                      <polygon class="arrow-fixed" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
                      <path d="M-4.58892184e-16,0.56157424 L-4.58892184e-16,16.1929159 L9.708,8.33860465 L-1.64313008e-15,0.56157424 L-4.58892184e-16,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
                    </g>
                  </svg>
                  </div>
                  </>
                )}
              </div>
            </div>
            
            {validated ? (
              <button id="submit_survey" onClick={submitSurvey}>Submit</button>
            ):
              <></>
            }
          </div>
        </div>
        <div className="transition">
          <div className="transition-bg">
          </div>
        </div>
    </div>
  )
}

export default withRouter(Survey);