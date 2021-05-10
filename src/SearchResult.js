import React, { Component } from "react";
import axios from "axios";
import "./SearchResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faInfoCircle, faExclamationCircle, faKiwiBird} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faTwitterSquare } from '@fortawesome/free-brands-svg-icons' 
import { FacebookIcon, FacebookShareButton } from "react-share";
import { TumblrIcon, TumblrShareButton } from "react-share";

import AOS from "aos";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenQuotes: this.props.location.state.data || [],
      quotes: [],
      current: 0,
      loaded: false,
      sentence: this.props.location.state.sentence || '',
      likedQuotesList: [],
      liked: false,
      id: '',
      token: '',
      numLikes:'',
      currentQuote: '',

      quote: '',
      show: true,
      author: '',
      authenticated: false,
      quoteId: '',
      reportClicked: false,
      analysisClicked: false,
    };
  }

  componentDidMount () {
    AOS.init();

    // load the 10 quotes
    let axiosArray = [];
    const quotesList = this.props.location.state.data;
    for (var i=0; i < quotesList.length; i++) {
      let newPromise = axios.get(`https://athena-back-end.herokuapp.com/api/quote/${quotesList[i][0]}`);
      axiosArray.push(newPromise);
    }
    axios.all(axiosArray)
      .then((responses) => {
        //success
        let responseArray = [];
        responses.forEach((res) => {
          responseArray.push(res.data)
        });
        this.setState({
          quotes: responseArray,
          loaded: true,
        });

        // load user information
        const token = sessionStorage.getItem('token');
        this.setState({ token: token });
        if (token===null || token==='') {
          // not signed in
          this.setState({ authenticated: false });
        } else {
          // signed in
          this.setState({ authenticated: true });
          const id = JSON.parse(sessionStorage.getItem('user'))._id.$oid;
          this.setState({ id: id });
        
          const config = {
            headers: {
              Authorization: 'Bearer ' + token
            }
          };
        
          axios.get(`https://athena-back-end.herokuapp.com/api/auth/get/${id}`, config)
          .then((res) => {
            // success
            this.setState({ likedQuotesList: res.data.savedQuotes });

            // check if liked
            if (res.data.savedQuotes.includes(responseArray[this.state.current]._id.$oid)) {
              this.setState({ liked: true });
            }
            else {
              this.setState({ liked: false });
            }

            this.setState({ numLikes: this.state.tenQuotes[this.state.current][1]})
          })
          .catch((err) => {
            // error
            console.log(err);
          });
        }

      })
      .catch((error) => {
        // error
        console.log(error);
      });
  }

  nextQuote = () => {
    // update current quote
    var num = this.state.current;
    if (num+1 >= this.state.quotes.length) {
      num = 0;
    }
    else {
      num = num + 1;
    }
    this.setState({ current: num });

    // check if the quote is liked
    if (this.state.likedQuotesList.includes(this.state.quotes[num]._id.$oid)) {
      this.setState({ liked: true });
    }
    else {
      this.setState({ liked: false });
    }

    this.setState({ numLikes: this.state.tenQuotes[num][1]})
  }

  likeQuote = (event, id) => {
    event.preventDefault();
    if (this.state.likedQuotesList.includes(id)) {
      // already liked, remove from liked
      const config = {
        headers: {
          Authorization: 'Bearer ' + this.state.token
        }
      };
      const body = {
        removeQuote: this.state.quotes[this.state.current]._id.$oid,
        sentiment: this.state.quotes[this.state.current].sentimentName,
      };
      axios.put(`https://athena-back-end.herokuapp.com/api/auth/removeQuote/${this.state.id}`, body, config)
      .then((res) => {
        // success, get new user object
        axios.get(`https://athena-back-end.herokuapp.com/api/auth/get/${this.state.id}`, config)
          .then((response) => {
            // success
            sessionStorage.setItem('user', JSON.stringify(response.data));
            this.setState({
              likedQuotesList: response.data.savedQuotes,
              liked: false
            });
          })
          .catch((error) => {
            // error
            console.log(error);
          });
      })
      .catch((err) => {
        // error
        console.log(err);
      });
    } else {
      // add to liked
      const config = {
        headers: {
          Authorization: 'Bearer ' + this.state.token
        }
      };
      const body = {
        addQuote: id,
        sentiment: this.state.quotes[this.state.current].sentimentName,
      };
      axios.put(`https://athena-back-end.herokuapp.com/api/auth/saveQuote/${this.state.id}`, body, config)
      .then((res) => {
        // success
        var temp = this.state.likedQuotesList;
        temp.push(id);
        
        this.setState({ 
          likedQuotesList: temp,
          liked: true
        });
      })
      .catch((err) => {
        // error
        console.log(err);
      });
    }
  }

  reportQuote = (event, id) => {
    event.preventDefault();
    console.log("A new report has been made:\n"+"quote ID: "+(this.state.quoteId)+"\nquote: "+(this.state.quote));
    this.setState({
      reportClicked: true,
      currentQuote: id
    });
  }

  closeReportModal = (event, id) => {
    event.preventDefault();
    this.setState({
      reportClicked: false,
      currentQuote: '',
    });
  }

  MLInfo = (event, id) => {
    event.preventDefault();
    this.setState({
      analysisClicked: true,
      currentQuote: id,
    });
  }

  closeAnalysisModal = (event) => {
    this.setState({
      analysisClicked: false,
    currentQuote: '',
    });
  }

  displayLikes = (id) => {
    for (var i=0; i < this.state.tenQuotes.length; i++) {
      if (this.state.tenQuotes[i][0] === id) {
        return this.state.tenQuotes[i][1];
      }
    }
  }

  shareQuoteTweet() {
    let quote = quote.quote;
    const tweet_text = "https://twitter.com/intent/tweet?text=" + quote;

    return tweet_text;
  }

  displayQuotes = (event) => {
    return this.state.quotes.map((quote) => {
      return (
        <div class="item" data-aos="zoom-in" key={quote._id.$oid}>
          <p>{quote.quote}</p>
          <p>- {quote.author}</p>
          <div class="stage">
            <div className={this.state.likedQuotesList.includes(quote._id.$oid) ? ("heart is-active"):("heart")}
            onClick={(e) => {
              this.likeQuote(e, quote._id.$oid)
            }} 
            ></div>
          </div>

          <p className="likes_display">{this.displayLikes(quote._id.$oid)} people liked this quote</p>

          <a class="twitter-share-button" 
              href={'https://twitter.com/intent/tweet?text=' + quote.quote + " Quote by " + quote.author + "."}
              target="_blank"
          >
            <FontAwesomeIcon icon={faTwitter} size="xs" /> 
          </a>

          &nbsp;
          <FacebookShareButton
            url={"http://athena21w.surge.sh/"}
            quote={quote.quote + ". Quote by " + quote.author + "."}
            hashtag="#Athena-Philosopy"
          >
            <FacebookIcon size={40} round={true}></FacebookIcon>
          </FacebookShareButton>
          
          &nbsp;
          <TumblrShareButton
            url={"http://athena21w.surge.sh/"}
            title={"From athena-philosophy"}
            caption={quote.quote + ". Quote by " + quote.author + "."}
            tags={["#philosophy", "athena"]}
          >
            <TumblrIcon size={40} round={true}></TumblrIcon>
          </TumblrShareButton>
          



         


          <nav className="menu">
            <input type="checkbox" href="#" className="menu-open" name={quote._id.$oid} id={quote._id.$oid} />
            <label className="menu-open-button" htmlFor={quote._id.$oid}>
              <span className="hamburger hamburger-1"></span>
              <span className="hamburger hamburger-2"></span>
              <span className="hamburger hamburger-3"></span>
            </label>

            <a className="menu-item"> 
              <div className="icon">
              <FontAwesomeIcon icon={faInfoCircle} onClick={(e) => {this.MLInfo(e, quote._id.$oid)}} /> 
              </div>
            </a>
            <a className="menu-item"> 
              <div className="icon">
              <FontAwesomeIcon icon={faExclamationCircle} onClick={(e) => {this.reportQuote(e, quote._id.$oid)}}/>
              </div>
            </a>
          </nav>

          <div class="mouse"></div>
          <div class="scrollText">Scroll</div>

          { (this.state.analysisClicked && this.state.currentQuote === quote._id.$oid) ? (
            <>
            <div className="analysisModal"></div>
            <div className="analysisText">
              We use a neural network to do magic. We are also pulling quotes from our database using a customized weighted randomization algorithm in order to provide you with the most relevant results!
              <br></br>
              <br></br>
              <img src="https://firebasestorage.googleapis.com/v0/b/athena-84a5c.appspot.com/o/neural%20network.jpeg?alt=media&token=fad91623-6c55-409b-afd6-afb7048c8055" alt="Neural Network Picture"></img>
              <br></br>
              <br></br>
              <button className="closeAnalysisModal" onClick={this.closeAnalysisModal}>Close</button>
            </div>
            </>
          ):(
            <>
            </>
          )}

          { (this.state.reportClicked && this.state.currentQuote === quote._id.$oid) ? (
            <>
              <div className="reportModal"></div>
              <div className="reportText">
                Please write your report below. 
                <br></br>
                <textarea className="reportInput" placeholder="Write your report here..." wrap="soft"> 
                </textarea>
                <br></br>
                <button className="submitReportModal" onClick={(e) => {this.closeReportModal(e, quote._id.$oid)}}>Submit</button>
              </div>
            </>
          ):(
            <>
            </>
          )}

       </div>
      )
    })
  }

  backToExplore = (event) => {
    event.preventDefault();
    this.props.history.push('/explore');
  }

  render() {
    return (
    <div className = "quotePage">
      { this.state.loaded ? (
        <>
          <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>

          <div className="background-container">
           <img className="img1" src="https://firebasestorage.googleapis.com/v0/b/athena-84a5c.appspot.com/o/nietzsche.png?alt=media&token=e0ac842e-8ccc-4f15-a8bd-f4161b8d8c06" alt=""/>
           <img className="img2" src="https://firebasestorage.googleapis.com/v0/b/athena-84a5c.appspot.com/o/Geometric_Moon-removebg.png?alt=media&token=f31c894a-194d-4f7f-afcc-3de9f8445703" alt=""/>
           <img className="lefthand" src="https://firebasestorage.googleapis.com/v0/b/athena-84a5c.appspot.com/o/left_hand.png?alt=media&token=c8a5147d-2342-4e5d-ba9d-c8def4387f21" alt=""/>
           <img className="righthand" src="https://firebasestorage.googleapis.com/v0/b/athena-84a5c.appspot.com/o/right_hand.png?alt=media&token=ddf8550e-9b42-4ed0-99b1-c2f72c8a07e2" alt=""/>
           <div className="stars"></div>
           <div className="twinkling"></div>
           <div className="clouds"></div>
          </div> 

          <button id="result_back_button" onClick={this.backToExplore}><FontAwesomeIcon icon={faArrowLeft} /> Home</button>

          <div>
            {this.displayQuotes()}
          </div>
      </>
      ):(
        <>
        <p>Loading</p>
        </>
      )}
    </div>

    );
  }
}
export default SearchResult;
