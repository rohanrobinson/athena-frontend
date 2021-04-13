import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';


const SurveyInfo = () => {
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(true);
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [userId, setUserId] = useState();

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


      return(
          <div>
              <h2><u>Survey Info Component</u></h2><br></br>
              <p>Render user's survey information from database over here.</p>
              <button onClick={()=> console.log(email)}>Click me</button>
          </div>
      )
}

export default SurveyInfo;