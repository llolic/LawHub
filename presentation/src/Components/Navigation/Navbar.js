import React from "react";
import SearchBar from "./SearchBar";
import Button from "./Button";
import { removeAccessToken } from "../../Util/Auth";

import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import logo from "../../Images/lawhub.png";
import "../../Styles/navbar.css";

/**
 * Navigation bar for the web application.
 * Lawhub logo is not yet clickable (do we want it to be clickable?)
 * All components for this are not imported from material-ui,
 * styles for the buttons/searchbar are in index.css
 */
class Navbar extends React.Component {
  render = () => {
    return (
      <div className="navbar">
        <div className="leftnav">
          <img src={logo} alt="logo" />

          <Link to="/">
            <Button className="home_link" text="LAWHUB" />
          </Link>

          <Link to="/leaderboard">
            <Button className="btn_header" text="Leaderboard" />
          </Link>

          <Link to="/mock">
            <Button className="btn_header" text="Mock" />
          </Link>

          <Link to="/explore">
            <Button className="btn_header" text="Explore" />
          </Link>
        </div>

        <div className="rightnav">
          <SearchBar />

          {this.props.loggedIn ? (
            <div className="row">
              <Link to="/studentProfile">

                <AccountCircleIcon
                  style={{ color: "#FFFFFF", fontSize: "2.5em" }}
                />
              </Link>
              <Link to="/">
                <Button
                  className="btn_header"
                  text="Logout"
                  onClick={() => {
                    removeAccessToken();
                    this.props.updateNavbar();
                  }}
                />
              </Link>
            </div>
          ) : (
            <div className="row">
              <Link to="/register">
                <Button className="btn_header" text="Sign Up" />
              </Link>

              <Link to="/login">
                <Button className="btn_header" text="Login" />
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };
}

export default Navbar;
