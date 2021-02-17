import React from "react";

class Philosophy extends React.Component {

    state = {
        name: this.props.location.aboutProps.name,
        description: this.props.location.aboutProps.description,
        quote: this.props.location.aboutProps.quote,
        quotee: this.props.location.aboutProps.quotee // quotee is the name of someone who said a quote 
    };

    componentDidMount() {
        console.log(this.props.location.aboutProps.name)

    }

    render () {
        
        return(
            <div id="container">
            <h3>{this.state.name}</h3>
            <div class = "philosophy">
                <div class = "philosophy-image">
                    <img src = "https://via.placeholder.com/250" />
                </div>
                <div class = "philosophy-content">
                    <div class = "philosophy-descr">
                        <p>{this.state.description}</p>
                    </div>
                    <div class = "related-quotes">
                        <p class = "related-quote-text">"{this.state.quote}"</p>
                        <p class = "related-quote-author">-{this.state.quotee}</p>
                    </div>
                </div>
            </div>
        </div>
        )




    }

}


export default Philosophy