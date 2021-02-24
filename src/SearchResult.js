import React, { Component } from "react";
import axios from "axios";
import "./SearchResult.css";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentence: this.props.location.state.sentence || '',
      quotes: JSON.parse(this.props.location.state.quotes) || [],
      quote: this.props.location.state.quote || '',
      author: this.props.location.state.author || '',
    };
  }

  getQuote = (event) => {
    const l = this.state.quotes.length;
    const j = Math.floor(Math.random()*l);
    axios.get(`https://athena-back-end.herokuapp.com/api/quote/${this.state.quotes[j]}`)
      .then ((response) => {
        // success
        console.log("quote:");
        console.log(response.data.quote);
        this.setState({
          quote: response.data.quote,
          author: response.data.author,
        });
      })
      .catch((err) => {
        // error
        alert(err);
        console.log(err)
      });
  }

  render() {
    return (
    <div>
      <div className="QuoteCont">
        <p className="sentence">{this.state.sentence}</p>
        <h3>{this.state.quote}</h3>
        <p className="sentence">Author - {this.state.author}</p>
        <button className="nextButton" onClick={this.getQuote}>Next</button>
      </div>
    </div>
    );
  }
}
export default SearchResult;
