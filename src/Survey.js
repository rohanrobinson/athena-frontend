import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./Survey.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Survey = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState("");
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
    // question 1
    switch(questions[0].ans) {
      case 'nothing, there is no point':
        philosophies.push("nihilism");
        break;
      case 'to be humble and to help others':
        philosophies.push("taoism");
        break;
      case 'to maximize pleasure':
        philosophies.push("hedonism");
        break;
      default:
        break;
    }
    // question 2
    switch(questions[1].ans) {
      case 'meditation':
        philosophies.push("buddhism");
        break;
      case 'logic':
        philosophies.push("rationalism");
        break;
      case 'discipline':
        philosophies.push("stoicism");
        break;
      default:
        break;
    }
    // question 5
    if (questions[4].ans > 5) {
      philosophies.push("existentialism");
    }
    // question 6
    if (questions[5].ans > 5) {
      philosophies.push("marxism");
    }


    const config = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    };
    const body = {
      surveyResults: {
        questions: questions,
        philosophies: philosophies,
      }
    };
    console.log(body);
    axios.put(`https://athena-back-end.herokuapp.com/api/auth/update/${JSON.parse(sessionStorage.getItem('user'))._id.$oid}`, body, config)
      .then((response) => {
        // success
        console.log("success");
        console.log(response);
        setValidated(false);
        history.push('/results');
      })
      .catch((error) => {
        // error
        console.log(error);
      });
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
          <input type="text" onChange={updateAnswer} value={selected} className="input_ques"/>
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
    else {
      return (
        <p>error</p>
      )
    }
    
  }

  return (
    <div>
      { loggedIn ? (
        <>
          <div id="out_cont">
          <div id="survey_cont">
            <p className="survey_title">Complete the survey to find your suggested philosophies.</p>
            <div id="question_cont">
              <div className="button_cont">
                {currentQuestionIndex === 0 ? (
                  <>
                  </>
                ):(

                  <button id="back_button" onClick={handleBack}>Back</button>

                  <button onClick={handleBack}><FontAwesomeIcon icon={faArrowLeft}/></button>

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
                  <button id="nxt_button" onClick={handleNext}><FontAwesomeIcon icon={faArrowRight}/></button>
                )}
              </div>
            </div>
            
            {validated ? (
              <button id="submit_survey" onClick={submitSurvey}>Submit</button>
            ):(
              <>
              </>
            )}
          </div>
        </div>
        </>
      ):(
        <>
          <p>Please Log In</p>
        </>
      )}
    </div>
  )
}
export default Survey;
