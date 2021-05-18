import React from "react";

import axios from "axios";

import "./Philosophy.css";
import Tilt from 'react-tilt';
import backendUrl from './backendUrl';


class Philosophy extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.location.aboutProps) {
            sessionStorage.setItem('philosophy', JSON.stringify(this.props.location.aboutProps.phil));
        }
        this.state = {
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


        const body = {
          philosophy: this.state.name,
        }
        console.log('body');
        console.log(body);
        axios.put(`${backendUrl}/api/philosophy/getquotes`, body)
          .then((res) => {
            // success
            const quotesList = res.data.map((a) => {
              return a[0];
            })
            this.setState({
              quotes: quotesList,
            })
            const l = quotesList.length;
            const j = Math.floor(Math.random()*l);
            axios.get(`${backendUrl}/api/quote/${quotesList[j]}`)
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
          })
          .catch((err) => {
            // error
            console.log(err);
          });
    }

    getQuote = (event) => {
        event.preventDefault();
        const l = this.state.quotes.length;
        const j = Math.floor(Math.random()*l);
        axios.get(`${backendUrl}/api/quote/${this.state.quotes[j]}`)
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
            <div className="left-poly-phil">
            <div className="right-poly-phil">
                <div className="page-bar">
                    <div className="page-bar-content">
                    <p className="page-bar-info">Explore-></p><p className="page-bar-name">{this.state.name[0].toUpperCase() + this.state.name.slice(1)}</p>
                    </div>
                </div>
                <div id="phil_inner_cont">
                    <p id="phil_title">{this.state.name[0].toUpperCase() + this.state.name.slice(1).toUpperCase()}</p>
                    <div className = "philosophy">
                    <div className = "philosophy-info">
                        <figure>
                        <div className = "phil-info-content">
                            
                            <div className ="portrait-container">
                            <img id="phil-portrait" src="https://via.placeholder.com/200"/>
                            </div>
                            
                            <p className = "philosophy-descr">{this.state.description}</p>
                        </div>
                        {/*
                          <img id = "phil-image" alt="philosophy" src={this.state.imageUrl}/>
                              <figcaption className = "philosophy-descr">
                                  {this.state.description}
                              </figcaption>
                        */}
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
                        <div className = "references">
                          <a href="https://bigthink.com/scotty-hendricks/10-schools-of-philosophy-and-why-you-should-know-them">*Source of philosophy description</a>
                          <br></br>
                          <a href="https://plato.stanford.edu/">*Click here for more information about philosophy</a>
                        </div>
                    </div>
                    </div>
            </div>
            </div>
            </div>
        </div>
        )




    }

}


export default Philosophy