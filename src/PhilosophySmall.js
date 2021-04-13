import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const PhilosophySmall = (props) => {
  const history = useHistory();
  const [phil, setPhil] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (props.name) {
      axios.get(`https://athena-back-end.herokuapp.com/api/philosophy/name/${props.name}`)
      .then((response) => {
        // success
        setPhil(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        // error
        console.log(error);
      });
    }
  }, []);

  return (
      <div>
        { phil !== "" && loaded ? (
          <>
          <div key={phil.philosophy} className = "philosophy-card">
            <div className = "philosophy-card-image">
              <a>
                <img alt={phil.philosophy} src={phil.imageUrl} />
              </a>
            </div>
            <div className = "philosophy-card-descr">
              <Link 
                to={{
                  pathname: '/philosophy',
                  aboutProps: {
                    phil: phil
                }
              }}>
                <h4>{phil.philosophy[0].toUpperCase() + phil.philosophy.slice(1)}</h4></Link>
              <p className="philosophy-tags"></p>
            </div>
          </div>
          </>
        ):(
          <>
          </>
        )}
      </div>
    )
}

export default PhilosophySmall;