import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import PhilosophySmall from "./PhilosophySmall";
import "./Results.css";
import backendUrl from './backendUrl';

const Results = () => {
  const history = useHistory();
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();
  const [surveyResults, setSurveyResults] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [philosophies, setPhilosophies] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === '') {
      console.log('login')
    } else {
      setUser(JSON.parse(sessionStorage.getItem('user')));
      setEmail(JSON.parse(sessionStorage.getItem('user')).email);
      setUserId(JSON.parse(sessionStorage.getItem('user'))._id.$oid);
      
      const config = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      };

      var quotes = [];

      axios.get(`${backendUrl}/api/auth/get/${JSON.parse(sessionStorage.getItem('user'))._id.$oid}`, config)
      .then((res) => {
        // success
        const results = res.data.surveyResults;
        setSurveyResults(results);
        setPhilosophies(res.data.surveyResults.philosophies);
        setloaded(true);
        // sessionStorage.setItem('user', res.data);
      })
      .catch((err) => {
        // error
        console.log(err);
      });
    }
  }, []);

  const retakeSurvey = () => {
    history.push('survey');
  }

  return (
    <div id="res_cont">
            { (user===null || user==='') ? (
        <>
          <p>Login to view</p>
        </>
      ):(
        <>
          <h1>Your Recommended Philosophies</h1>
          <p>These results are based on your responses from the survey.</p>
          <div>
            { loaded && philosophies !== "" ? (
              <>
              <div id="phil_results">
                { philosophies.map((phil) => (
                  <PhilosophySmall key={phil} name={phil}/>
                ))}
              </div>
              </>
            ):(
              <>
              <p>No recommended philosophies.</p>
              </>
            )}
            
          </div>
          <button id="retake_survey" onClick={retakeSurvey}>Retake Survey</button>
          <h1 id="instructions">How to use the app.</h1>
          <p>Check out new philosphies and get curated quotes on the Explore page.</p>
          <p>Navigate to the My Favorites page to view your favorite quotes.</p>
          <p>View the About Us page to learn more about Athena.</p>
        </>
      )
      }
    </div>
  )
}
export default Results;
