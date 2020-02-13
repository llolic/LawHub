import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

import "./searchbar.css";

/**
 * The searchbar in the navigation bar
 * Should reset the search contents on new page navigation
 */
class SearchBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      contents: "Search..."
    };
  }
  // TODO: When directed to a new page, reset the search bar
  render = () => {
    return (
      <div className="search_container">
        <form className="searchbar">
          <input
            className="searchbar"
            style={{ color: "#FFFFFF" }}
            type="text"
            value={this.state.contents}
            onChange={e => this.setState({ contents: e.target.value })}
            onClick={() => this.setState({ selected: true, contents: "" })}
            size="50"
          />
          <Link
            to="/search"
            onClick={() => this.setState({ contents: "Search..." })}
          >
            <SearchIcon style={{ color: "#FFFFFF", fontSize: "1.7em" }} />
          </Link>
        </form>
      </div>
    );
  };
}

export default SearchBar;
