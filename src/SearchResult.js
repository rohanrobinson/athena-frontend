import React, { Component } from "react";
import axios from "axios";
import "./SearchResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentence: this.props.location.state.sentence || '',
      quotes: JSON.parse(this.props.location.state.quotes) || [],
      quote: this.props.location.state.quote || '',
      author: this.props.location.state.author || '',
      liked: false,
      authenticated: false,
      quotesList: [],
      quoteId: this.props.location.state.quoteId,
      token: '',
      id: '',
    };
  }

  componentDidMount () {
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
        this.setState({ quotesList: res.data.savedQuotes });
        console.log(res.data.savedQuotes);
      })
      .catch((err) => {
        // error
        console.log(err);
      });

      // check if already liked
      if (this.state.quotesList.includes(this.state.quoteId)) {
        // already liked
        this.setState({ liked: true });
      } else {
        // not liked
        this.setState({ liked: false });
      }
    }

  }

  getQuote = (event) => {
    const l = this.state.quotes.length;
    const j = Math.floor(Math.random()*l);
    axios.get(`https://athena-back-end.herokuapp.com/api/quote/${this.state.quotes[j]}`)
      .then ((response) => {
        // success
        console.log("quote:");
        console.log(response.data._id.$oid);
        this.setState({
          quoteId: response.data._id.$oid,
          quote: response.data.quote,
          author: response.data.author,
        });

        // check if already liked
        if (this.state.quotesList.includes(response.data._id.$oid)) {
          // already liked
          this.setState({ liked: true });
        } else {
          // not liked
          this.setState({ liked: false });
        }
      })
      .catch((err) => {
        // error
        alert(err);
        console.log(err)
      });
  }

  likeQuote = (event) => {
    console.log("liked");
    // console.log(this.state.quoteId);
    console.log(this.state.quotesList);
    if (this.state.quotesList.includes(this.state.quoteId)) {
      // already liked, remove from liked
      const config = {
        headers: {
          Authorization: 'Bearer ' + this.state.token
        }
      };
      const body = {
        removeQuote: this.state.quoteId
      };
      console.log(body);
      axios.put(`https://athena-back-end.herokuapp.com/api/auth/removeQuote/${this.state.id}`, body, config)
      .then((res) => {
        // success, get new user object
        console.log(res);
        axios.get(`https://athena-back-end.herokuapp.com/api/auth/get/${this.state.id}`, config)
          .then((response) => {
            // success
            console.log(response);
            sessionStorage.setItem('user', JSON.stringify(response.data));

            var temp = [];
            for (var i=0; i<this.state.quotesList.length; i++) {
              if (this.state.quotesList[i] !== this.state.quoteId) {
                temp.push(this.state.quotesList[i]);
              }
            }
            console.log(temp);
            this.setState({ 
              quotesList: temp,
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
        addQuote: this.state.quoteId
      };
      console.log(body);
      axios.put(`https://athena-back-end.herokuapp.com/api/auth/saveQuote/${this.state.id}`, body, config)
      .then((res) => {
        // success
        var temp = this.state.quotesList;
        temp.push(this.state.quoteId);
        console.log(temp);
        
        this.setState({ 
          quotesList: temp,
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
  }

  render() {
    return (
    <div className = "quotePage">
      <div className="QuoteCont">
        <p className="sentence">Displaying Quotes Inspired By Your Search: {this.state.sentence}</p>
        <hr></hr>
        <p id="quote_display">{this.state.quote}</p>
        <p className="sentence">Author - {this.state.author}</p>
        { !(this.state.authenticated) ? (
          <>
          </>
        ):(
          <>
            <FontAwesomeIcon onClick={this.likeQuote} icon={faHeart} color={this.state.liked ? ("Red"): ("Gray")} className="heartIcon"/>
            <p>Favorite</p>
          </>
        )}
         <hr></hr>
         <div className="btnOverride">
            <button className="nextButton" onClick={this.getQuote}>Next</button>
            &nbsp;&nbsp;&nbsp;
            <button className="reportButton" onClick={this.reportQuote}>Report</button>
          </div>
      </div>
    </div>
    );
  }
}
export default SearchResult;
