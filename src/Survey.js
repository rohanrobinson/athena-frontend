import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
// import MultChoice from "./MultipleChoice";

const Survey = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState("");

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
    }
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
  }

  const displayQuestion = () => {
    const name = Date.now();
    if (questions[currentQuestionIndex].type === "mult"){
      return (
        <div key={selected} id={name}>
          <p>{questions[currentQuestionIndex].q}</p>
          <input onChange={updateAnswer} type="radio" value={questions[currentQuestionIndex].a} name={name} checked={ questions[currentQuestionIndex].a === selected }/> {questions[currentQuestionIndex].a}
          <input onChange={updateAnswer} type="radio" value={questions[currentQuestionIndex].b} name={name} checked={ questions[currentQuestionIndex].b === selected }/> {questions[currentQuestionIndex].b}
          <input onChange={updateAnswer} type="radio" value={questions[currentQuestionIndex].c} name={name} checked={ questions[currentQuestionIndex].c === selected }/> {questions[currentQuestionIndex].c}
          <p>{questions[currentQuestionIndex].ans}</p>
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
          <p>Survey</p>

          <div>
            { displayQuestion() }
          </div>

          <button onClick={handleNext}>Next</button>
          <button onClick={handleBack}>Back</button>

          <button onClick={submitSurvey}>Submit</button>
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
