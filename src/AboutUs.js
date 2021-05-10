import React, { useState } from "react";
import "./AboutUs.css";
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
        
      <div className="aboutus-header">
        <h2><i>What is Athena?</i></h2>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;Athena aims to open the minds of modern audiences to the collective wisdom of ancient philosophers.</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;We're on a mission to enlighten a world currently engaged in rigid thinking with narrow perspectives.</p>
        <h2 className="who"><i>Who are we?</i></h2>
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


        <ul className="team-members">
          <div id="first-row">
            
            
              <a onClick={ () => setDerekModalIsOpen(true) }><img id="derek-pic"src={derek} alt="derek" /></a>
              <li onClick={ () => setDerekModalIsOpen(true)}>&nbsp;Derek Bai</li>   
            

             
              &nbsp; <a onClick={ () => setChaseModalIsOpen(true) }><img id="chase-pic" src={chase} alt="chase" /></a>
              <li onClick={ () => setChaseModalIsOpen(true) }>&nbsp;Chase Krivickas</li> <br/>
            
          </div>

          <br />
          <br />

          <div id="second-row">
            
            <a onClick={() => setBrettModalIsOpen(true)}><img id="brett-pic"src={brett} alt="brett" /></a>
            <li onClick={() => setBrettModalIsOpen(true)}>&nbsp;Brett Kidman</li> 
          
 
           
            &nbsp; &nbsp;<a onClick={() => setIsaiahModalIsOpen(true)}>&nbsp;&nbsp;&nbsp;&nbsp;<img id="isaiah-pic" src={isaiah} alt="isaiah" /></a>
            <li onClick={() => setIsaiahModalIsOpen(true)}>&nbsp;Isaiah Martin</li> <br/>
          
          </div>  

          <br />
          <br />
          
          <div id="third-row">
            
            <a onClick={() => setSuyashModalIsOpen(true)}><img id="suyash-pic"src={suyash} alt="suyash" /></a>
            <li onClick={() => setSuyashModalIsOpen(true)}>&nbsp;Suyash Surana</li> 
          

           
            <a onClick={() => setRohanModalIsOpen(true)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img id="rohan-pic" src={rohan} alt="rohan" /></a>
            <li onClick={() => setRohanModalIsOpen(true)}>&nbsp;Rohan Robinson</li> <br/>
          
          </div> 
        </ul>
      </div>
  )
}
export default AboutUs;
