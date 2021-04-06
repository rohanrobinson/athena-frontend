import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./Survey.css";

const Survey = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [validated, setValidated] = useState(false);

  const [questions, setQuestions] = useState([
    {
      type: "mult",
      q: "Are you happy?",
      a: "always",
      b: "sometimes",
      c: "never",
      ans: ""
    },
    {
      type: "mult",
      q: "Are you sad?",
      a: "never",
      b: "sometimes",
      c: "always",
      ans: ""
    },
    {
      type: "input",
      q: "How are you feeling?",
      ans: ""
    },
    {
      type: "input",
      q: "Where do you live?",
      ans: ""
    },
    {
      type: "input",
      q: "What philosophy do you most identify with?",
      ans: ""
    },
    {
      type: "slider",
      q:  "Use the slider to show how well the quote below resonates with you?",
      quote: "Do not Say How a Good Person Should Act. Be One.",
      ans: ""
    },
    {
      type: "slider",
      q: "Use the slider to show how self-aware you are about your mental state",
      quote: "A larger number indicates a larger degree of self-awareness",
      ans: ""
    },
  ])

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

    const config = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    };
    const body = {
      surveyResults: questions
    };
    console.log(body);
    axios.put(`https://athena-back-end.herokuapp.com/api/auth/update/${JSON.parse(sessionStorage.getItem('user'))._id.$oid}`, body, config)
      .then((response) => {
        // success
        console.log("success");
        console.log(response);
        setValidated(false);
        history.push('/explore');
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
      // console.log(event.target.value);
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

  const updateSlider = (event) => {
    let sliderValue =  event.target.value
    if (currentQuestionIndex === 5)  {
      document.getElementById("idx-5").value = sliderValue;
    }
    else if (currentQuestionIndex === 6) {
      document.getElementById("idx-6").value = sliderValue;
    }
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
          <input type="text" onChange={updateAnswer} value={selected}/>
        </div>
      )
    }

    else if (questions[currentQuestionIndex].type === "slider") {
      return (
        <div>
          <p>{questions[currentQuestionIndex].q}</p> 
          <p>{questions[currentQuestionIndex].quote}</p>
          1<input type="range" min="1" max="10" onChange={updateAnswer} onInput={updateSlider}  value={selected}/>10 <br />
          { currentQuestionIndex === 5 ? (<output id="idx-5"></output>) : ( <></>)  }
          { currentQuestionIndex === 6 ? (<output id="idx-6"></output>) : ( <></>)  }
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
            <div id="question_cont">
              <div className="button_cont">
                {currentQuestionIndex === 0 ? (
                  <>
                  </>
                ):(
                  <button onClick={handleBack}>Back</button>
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
                  <button id="nxt_button" onClick={handleNext}>Next</button>
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
