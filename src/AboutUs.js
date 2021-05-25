import React, { useState } from "react";
import "./AboutUs.css";
import Tilt from 'react-tilt'
import derek from "./images/derek.png";
import chase from "./images/chase.png"; // get actual pic for chase
import suyash from "./images/chase.png"; // get actual pic for suyash
import brett from "./images/brett.png"; 
import isaiah from "./images/isaiah.png";
import rohan from "./images/rohan.png";
import Modal from "react-modal";
import { red } from "@material-ui/core/colors";
Modal.setAppElement('#root');
const AboutUs = () => {

  const [derekModalIsOpen, setDerekModalIsOpen] = useState(false);
  const [chaseModalIsOpen, setChaseModalIsOpen] = useState(false);
  const [brettModalIsOpen, setBrettModalIsOpen] = useState(false);
  const [isaiahModalIsOpen, setIsaiahModalIsOpen] = useState(false);
  const [rohanModalIsOpen, setRohanModalIsOpen] = useState(false);
  const [suyashModalIsOpen, setSuyashModalIsOpen] = useState(false);

  return (
    <div className="aboutus-content">
      {/* <img className = "aboutusimage" src="https://firebasestorage.googleapis.com/v0/b/athena-84a5c.appspot.com/o/Screen%20Shot%202021-04-05%20at%209.07.16%20PM.png?alt=media&token=5c74ca51-58ba-4f19-acfb-1db99b2d09bd"></img>   */}
      <div className="brain">
        <h1>We care deeply about mental health.</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/athena-84a5c.appspot.com/o/polygon_brain-removebg-preview.png?alt=media&token=9693145d-da4f-4a69-9d5d-210640b2f2b6"></img>
      </div>
      <div className="left-poly">
      <div className="right-poly">
      <div className="introduction">
          <p>
          The average American today is richer, healthier, and safer than 99% of mankind in the past. 
          Yet significant portions of American are affected by poor mental health, ranging from depression to anxiety to neuroticism. 
          Psychological well-being has been on the decline at an alarming rate, despite enormous material progress.
          The wisdom and knowledge generated over thousands of years by philosophers raised in conditions magnitudes harsher than our own is largely unknown and ignored, despite its enormous potential to increase people’s mental, emotional, and spiritual well-being. 
          Athena aims to open the minds of modern audiences to the collective wisdom of ancient philosophers.
          We're on a mission to enlighten a world currently engaged in rigid thinking with narrow perspectives.
          </p>
      </div>

      <div className="facts">
        <Tilt className="Tilt" options={{ max : 25 }}>
            <div className = "fact-card">
              <div className = "stats">1 in 4</div>
              <br></br>
              people worldwide experience a mental health issue each year
            </div>
        </Tilt>
        <Tilt className="Tilt" options={{ max : 25 }}>
            <div className = "fact-card">
              <div className = "stats">21%</div>
              <br></br>
              of Americans will be clinically depressed at some point in their life
            </div>
        </Tilt>
        <Tilt className="Tilt" options={{ max : 25 }}>
            <div className = "fact-card">
              <div className = "stats">#1</div>
              <br></br>
              Depression is the #1 cause of disability worldwide. 
            </div>
        </Tilt>
      </div>

      <div className="facts">
        <Tilt className="Tilt" options={{ max : 25 }}>
            <div className = "fact-card">
              <div className = "stats">40</div>
              <br></br>
              One person dies by suicide every 40 seconds. 
            </div>
        </Tilt>
        <Tilt className="Tilt" options={{ max : 25 }}>
            <div className = "fact-card">
              <div className = "stats">800k</div>
              <br></br>
              Close to 800,000 people die from suicide every year. 
            </div>
        </Tilt>
        <Tilt className="Tilt" options={{ max : 25 }}>
            <div className = "fact-card">
              <div className = "stats">1/3</div>
              <br></br>
              depressed patients are treatment resistant or treatment refractory
            </div>
        </Tilt>
      </div>

      <div className="numbers">
        <img src="https://firebasestorage.googleapis.com/v0/b/athena-84a5c.appspot.com/o/hand-heart.png?alt=media&token=c4d2c3b2-1f0d-493c-a794-400459f8d0cf"></img>
        <h1>We want to decrease those numbers </h1>
        <p>
        Athena delivers curated philosophical advice to user based on their based on their personal preferences and circumstances.
        Users will submit answers to a survey, which our internal algorithms use to create a personalized philosophical profile for the user. 
        Based on this profile, the user will be matched with potential interesting philosophies. 
        Users can also submit text detailing a specific difficult life circumstances and receive a list of advice/wisdom from the greatest philosophers, psychologists, religious figures, etc. of history.
        </p>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <h1>Our Team</h1>



      <div className="team">
        <Tilt className="Tilt" options={{ max : 25 }}>
          <div className = "people-card" onClick={ () => setDerekModalIsOpen(true) }>
            <img src={derek}></img>
            <div className="name">
              Derek Bai
            </div>
            <div className="title">
              Product Manager
            </div>
          </div>
        </Tilt>

        <Tilt className="Tilt" options={{ max : 25 }}>
          <div className = "people-card" onClick={ () => setChaseModalIsOpen(true) }>
            <img src={chase} />
            <div className="name">
              Chase Krivickas
            </div>
            <div className="title">
              Full Stack Engineer
            </div>
          </div>
        </Tilt>


        <Tilt className="Tilt" options={{ max : 25 }}>
          <div className = "people-card" onClick={ () => setBrettModalIsOpen(true) }>
            <img src={brett} />
            <div className="name">
              Brett Kidman
            </div>
            <div className="title">
              Designer
            </div>
          </div>
        </Tilt>
      </div>

      <div className="team">
        <Tilt className="Tilt" options={{ max : 25 }}>
          <div className = "people-card" onClick={ () => setIsaiahModalIsOpen(true) }>
            <img src={isaiah} />
            <div className="name">
              Isaiah Martin
            </div>
            <div className="title">
              ML Engineer
            </div>
          </div>
        </Tilt>

        <Tilt className="Tilt" options={{ max : 25 }}>
          <div className = "people-card" onClick={ () => setRohanModalIsOpen(true) }>
            <img src={rohan} />
            <div className="name">
              Rohan Robinson
            </div>
            <div className="title">
              Frontend Developer
            </div>
          </div>
        </Tilt>


        <Tilt className="Tilt" options={{ max : 25 }}>
          <div className = "people-card" onClick={ () => setSuyashModalIsOpen(true) }>
            <img src={suyash} />
            <div className="name">
              Suyash Surana
            </div>
            <div className="title">
              Backend Developer
            </div>
          </div>
        </Tilt>
      </div>

      <div className="story">
        <img src="https://firebasestorage.googleapis.com/v0/b/athena-84a5c.appspot.com/o/tree-removebg-preview.png?alt=media&token=2a2638fc-7da3-46f5-8d1a-fc05839e58da"></img>
        <br></br>
        <br></br>
        <h1>Our Story</h1>
        <p>
          Our team started as a group of Dartmouth College students brought together by a common concern for those affected by mental health disorders. 
          We believe that the number of resources available to those with mental health disorders is severely lacking. 
          As a result, our team sees the need to bring a diverse range of alleviations to people. 
        </p>
      </div>

      <div className="support">
        With world class support from:
        <img src="https://firebasestorage.googleapis.com/v0/b/athena-84a5c.appspot.com/o/dartmouth-removebg-preview.png?alt=media&token=91dbd95f-e5b5-4f03-a23d-f22ea5b959df"></img>
      </div>

      <Modal 
      isOpen={derekModalIsOpen} 
      onRequestClose={() => setDerekModalIsOpen(false)}
      style={
        {
          overlay: {
            backgroundColor: '#CBC3E3',
            height: '350px',
            width: '450px',
            marginTop: '200px',
            marginLeft: '400px',
          }
        }
      }
      >
        <h2>Derek Bai</h2>
        <p>Derek is a CS major from Dartmouth.</p>
        <button className="closeModal" onClick={() => setDerekModalIsOpen(false)}>Close</button>
      </Modal>

      <Modal 
      isOpen={chaseModalIsOpen} 
      onRequestClose={() => setChaseModalIsOpen(false)}
      style={
        {
          overlay: {
            backgroundColor: '#CBC3E3',
            height: '350px',
            width: '450px',
            marginTop: '200px',
            marginLeft: '400px',
          }
        }
      }
      >
        <h2>Chase Krivickas</h2>
        <p>Chase is a CS major from Dartmouth.</p>
        <button className="closeModal" onClick={() => setChaseModalIsOpen(false)}>Close</button>
      </Modal>

      <Modal 
      isOpen={brettModalIsOpen} 
      onRequestClose={() => setBrettModalIsOpen(false)}  
      style={
        {
          overlay: {
            backgroundColor: '#CBC3E3',
            height: '350px',
            width: '450px',
            marginTop: '200px',
            marginLeft: '400px',
          }
        }
      }
      >
        <h2>Brett Kidman</h2>
        <p>Brett is a CS major at Dartmouth College.</p>
        <button className="closeModal" onClick={() => setBrettModalIsOpen(false)}>Close</button>
      </Modal>
      
      <Modal 
      isOpen={isaiahModalIsOpen} 
      onRequestClose={() => setIsaiahModalIsOpen(false)}  
      style={
        {
          overlay: {
            backgroundColor: '#CBC3E3',
            height: '350px',
            width: '450px',
            marginTop: '200px',
            marginLeft: '400px',
          }
        }
      }
      >
        <h2>Isaiah Martin</h2>
        <p>Isaiah is a CS major at Dartmouth College.</p>
        <button className="closeModal" onClick={() => setIsaiahModalIsOpen(false)}>Close Modal</button>
      </Modal>

      <Modal 
      isOpen={rohanModalIsOpen} 
      onRequestClose={() => setRohanModalIsOpen(false)}  
      style={
        {
          overlay: {
            backgroundColor: '#CBC3E3',
            height: '350px',
            width: '450px',
            marginTop: '200px',
            marginLeft: '400px',
          }
        }
      }
      >
        <h2>Rohan Robinson</h2>
        <p>Rohan is a CS major at Dartmouth College.</p>
        <button className="closeModal" onClick={() => setRohanModalIsOpen(false)}>Close</button>
      </Modal>

      <Modal 
      isOpen={suyashModalIsOpen} 
      onRequestClose={() => setSuyashModalIsOpen(false)}  
      style={
        {
          overlay: {
            backgroundColor: '#CBC3E3',
            height: '350px',
            width: '450px',
            marginTop: '200px',
            marginLeft: '400px',
          }
        }
      }
      >
        <h2>Suyash Surana</h2>
        <p>Suyash is a CS major at Dartmouth College.</p>
        <button className="closeModal" onClick={() => setSuyashModalIsOpen(false)}>Close Modal</button>
      </Modal>
      </div>
      </div>
      </div>
  )
}
export default AboutUs;
