import React from 'react';
import '../index.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            contents: "Search..."
        }
    }

    render = () => {
        return (
            <div className="search_container">
                <form>
                <input 
                    className="searchbar"
                    type="text"
                    value={this.state.contents}
                    size="40"
                />
                </form>
            </div>
        );
    }

}

export default SearchBar;