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
    if (this.state.quotesList.includes(this.state.quoteId)) {
      // already liked
      // do nothing
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
        this.setState({ 
          quotesList: this.state.quotesList.push(this.state.quoteId),
          liked: true
        });
      })
      .catch((err) => {
        // error
        console.log(err);
      });
    }
  }

  render() {
    return (
    <div>
      <div className="QuoteCont">
        <p className="sentence">{this.state.sentence}</p>
        <h3>{this.state.quote}</h3>
        <p className="sentence">Author - {this.state.author}</p>
        <button className="nextButton" onClick={this.getQuote}>Next</button>
        { !(this.state.authenticated) ? (
          <>
          </>
        ):(
          <>
            <br></br>
            <FontAwesomeIcon onClick={this.likeQuote} icon={faHeart} color={this.state.liked ? ("Red"): ("Gray")} className="heartIcon"/>
          </>
        )}
      </div>
    </div>
    );
  }
}
export default SearchResult;
