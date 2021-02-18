import React from "react";

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
          alert(this.state.searchContent);
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