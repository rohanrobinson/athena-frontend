import React, { Component } from "react";
import axios from "axios";
import "./SearchResult.css";
import SearchBar from './SearchBar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
        console.log("quotes");
        console.log(responseArray);
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
            console.log(res.data.savedQuotes);

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

  likeQuote = (event) => {
    console.log("liked");
    if (this.state.likedQuotesList.includes(this.state.quotes[this.state.current]._id.$oid)) {
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
      console.log(body);
      axios.put(`https://athena-back-end.herokuapp.com/api/auth/removeQuote/${this.state.id}`, body, config)
      .then((res) => {
        // success, get new user object
        console.log(res);
        axios.get(`https://athena-back-end.herokuapp.com/api/auth/get/${this.state.id}`, config)
          .then((response) => {
            // success
            sessionStorage.setItem('user', JSON.stringify(response.data));
            this.setState({
              likedQuotesList: res.data.savedQuotes,
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
        addQuote: this.state.quotes[this.state.current]._id.$oid,
        sentiment: this.state.quotes[this.state.current].sentimentName,
      };
      console.log(body);
      axios.put(`https://athena-back-end.herokuapp.com/api/auth/saveQuote/${this.state.id}`, body, config)
      .then((res) => {
        // success
        var temp = this.state.likedQuotesList;
        temp.push(this.state.quotes[this.state.current]._id.$oid);
        console.log(temp);
        
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

  reportQuote = (event) => {
    console.log("A new report has been made:\n"+"quote ID: "+(this.state.quoteId)+"\nquote: "+(this.state.quote));
    this.setState({ reportClicked: true });
  }

  closeReportModal = (event) => {
    this.setState({ reportClicked: false });
  }

  MLInfo = (event) => {
    console.log("Getting MLinfo");
    this.setState({ analysisClicked: true });
  }

  closeAnalysisModal = (event) => {
    this.setState({ analysisClicked: false });
  }

  render() {
    return (
    <div className = "quotePage">
      { this.state.loaded ? (
        <>
      <div className="QuoteCont">
        <p className="sentence">
          Displaying Quotes Inspired By Your Search: {this.state.sentence}
          <br></br>
          <br></br>
          <button className="MLButton" onClick={this.MLInfo}>Click Here To Learn How We Analyzed Your Quote</button>
        </p>
        <hr></hr>
        <p className ={this.state.show ? 'show' : 'dontshow'} id="quote_display">{this.state.quotes[this.state.current].quote}</p>
        <p className={`sentence ${this.state.show ? 'show' : 'dontshow'}`}>Author - {this.state.quotes[this.state.current].author}</p>
        { !(this.state.authenticated) ? (
          <>
          </>
        ):(
          <>
            <FontAwesomeIcon onClick={this.likeQuote} icon={faHeart} color={this.state.liked ? ("Pink"): ("Gray")} className={`heartIcon ${this.state.show ? 'show' : 'dontshow'}`}/>
            <p className={`favoriteTag ${this.state.show ? 'show' : 'dontshow'}`}>Favorite</p>
            <p>Number of likes: {this.state.numLikes}</p>
          </>
        )}
         <hr></hr>
         <div className="btnOverride">
            <button className="reportButton" onClick={this.reportQuote}>Report</button>
            &nbsp;&nbsp;&nbsp;
            <button className="nextButton" onClick={this.nextQuote}>Next</button>
            &nbsp;&nbsp;&nbsp;
          </div>
      </div>
      <br></br><br></br>
      <div class="searchBar">
        Didn't get what you were looking for? Try again here:
        <SearchBar/>
      </div>
      { this.state.reportClicked ? (
        <>
          <div className="reportModal"></div>
          <div className="reportText">
            Please write your report below. 
            <br></br>
            <textarea className="reportInput" placeholder="Write your report here..." wrap="soft"> 
            </textarea>
            <br></br>
            <button className="submitReportModal" onClick={this.closeReportModal}>Submit</button>
          </div>
        </>
      ):(
        <>
        </>
      )}
      { this.state.analysisClicked ? (
        <>
        <div className="analysisModal"></div>
        <div className="analysisText">
          We use a neural network to do magic
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
