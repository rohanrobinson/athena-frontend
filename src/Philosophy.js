import React from "react";

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
            quote: "sample quote",
            quotee: "sample quote author" // quotee is the name of someone who said a quote 
        };
    }


    render () {
        
        return(
            <div id="container">
            <h3>{this.state.name}</h3>
            <div className = "philosophy">
                <div className = "philosophy-image">
                    <img className="philosophyImage" alt="philosophy" src={this.state.imageUrl}/>
                </div>
                <div className = "philosophy-content">
                    <div className = "philosophy-descr">
                        <p>{this.state.description}</p>
                    </div>
                    <div className = "related-quotes">
                        <p className = "related-quote-text">"{this.state.quote}"</p>
                        <p className = "related-quote-author">-{this.state.quotee}</p>
                    </div>
                </div>
            </div>
        </div>
        )




    }

}


export default Philosophy