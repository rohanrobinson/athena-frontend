import React from "react";

import axios from "axios";

import "./Philosophy.css";


class Philosophy extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.location.aboutProps) {
            sessionStorage.setItem('philosophy', JSON.stringify(this.props.location.aboutProps.phil));
        }
        this.state = {
            // phil: this.props.location.aboutProps.phil,
            // name: this.props.location.aboutProps.phil.philosophy,
            // description: this.props.location.aboutProps.phil.description,
            // imageUrl: this.props.location.aboutProps.phil.imageUrl,
            // quote: "sample quote",
            // quotee: "sample quote author" // quotee is the name of someone who said a quote
            phil: JSON.parse(sessionStorage.getItem('philosophy')),
            name: JSON.parse(sessionStorage.getItem('philosophy')).philosophy,
            description: JSON.parse(sessionStorage.getItem('philosophy')).description,
            imageUrl: JSON.parse(sessionStorage.getItem('philosophy')).imageUrl,
            quotes: JSON.parse(sessionStorage.getItem('philosophy')).quotes,
            quote: '',
            author: '',// quotee is the name of someone who said a quote 
            quoteId: '',
        };

    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const l = this.state.quotes.length;
        const j = Math.floor(Math.random()*l);
        axios.get(`https://athena-back-end.herokuapp.com/api/quote/${this.state.quotes[j]}`)
          .then ((response) => {
            // success
            console.log("quote:");
            console.log(response.data.quote);
            this.setState({
              quoteId: response.data._id.$oid,
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

    getQuote = (event) => {
        event.preventDefault();
        const l = this.state.quotes.length;
        const j = Math.floor(Math.random()*l);
        axios.get(`https://athena-back-end.herokuapp.com/api/quote/${this.state.quotes[j]}`)
          .then ((response) => {
            // success
            console.log("quote:");
            console.log(response.data.quote);
            this.setState({
              quoteId: response.data._id.$oid,
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


    render () {
        return(
            <div id="phil_cont">
                <div id="phil_inner_cont">
                    <p id="phil_title">{this.state.name[0].toUpperCase() + this.state.name.slice(1)}</p>
                    <br></br>
                    <div className = "philosophy">
                        <figure>
                          <img id = "phil-image" alt="philosophy" src={this.state.imageUrl}/>
                              <figcaption className = "philosophy-descr">
                                  {this.state.description}
                              </figcaption>
                        </figure>
                        <div className = "philosophy-content">
                            <br></br>
                            <div className = "related-quotes">
                                Quotes:
                                <p id="phil_quote" className = "related-quote-text">"{this.state.quote}"</p>
                                <p className = "related-quote-author">-{this.state.author}</p>
                            </div>
                            <button id="next_phil_button" onClick={this.getQuote}>Next Quote</button>
                        </div>
                </div>
            </div>
        </div>
        )




    }

}


export default Philosophy