import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";

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
                <form className="searchbar">
                <input 
                    className="searchbar"
                    style={{ color: '#FFFFFF' }}
                    type="text"
                    value={this.state.contents}
                    onChange={e => this.setState({contents: e.target.value})}
                    onClick={() => this.setState({selected: true, contents: ''})}
                    size="50"
                />
                <Link 
                    to="/search"
                    onClick={() => this.setState({contents: 'Search...'})}
                >
                    <SearchIcon 
                        style={{ color: '#FFFFFF', fontSize: '2em'}}
                    />
                </Link>
                
                </form>
            </div>
        );
    }

}

export default SearchBar;