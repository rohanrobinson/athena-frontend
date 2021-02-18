import React from "react";
import axios from 'axios';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {searchContent: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
      }

    handleChange(event) {
        this.setState({searchContent: event.target.value});
      }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          // const Search = this.state.searchContent;
        
        axios.get(`https://athena-back-end.herokuapp.com/api/sentiment/name/joy`)
        .then(res => {
          
          let axiosArray = [];
          for (var i = 0; i < 3; i++) {
            let newPromise = axios.get(`https://athena-back-end.herokuapp.com/api/quote/${res.data.quotes[i]}`);
            axiosArray.push(newPromise);
          }

          axios.all(axiosArray)
          .then(axios.spread((...responses) => {
            // console.log('here');
            let response_array = []
            responses.forEach((res) => {
              console.log(res.data.quote);
              response_array.push(res.data.quote);
            });
            // console.log(response_array);
          }))
          .catch((error) => {
            alert(error);
            console.log(error);
          });



        })
      }
    }

    render() {
        return(
            <div>
                <input class="search-bar" type="text" placeholder="How are you feeling?" onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
            </div>
        );
    };


}

export default SearchBar;