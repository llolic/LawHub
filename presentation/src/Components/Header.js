import React from 'react';
import SearchBar from './SearchBar';
import Button from './Button';

import logo from '../Images/lawhub.png';
import '../index.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            hoverIndex: -1
        }
    }

    render = () => {
        return (
            <div className="header">
                <img src={logo} alt="logo"/>
                <Button className="home_link" text="LAWHUB"/>
                <Button className="btn_header" text="Leaderboard"/>
                <Button className="btn_header" text="Mock"/>
                <Button className="btn_header" text="Explore"/>

                <SearchBar/>

                <Button className="btn_header" text="Sign Up"/>
                <Button className="btn_header" text="Login"/>
            </div>
        );
    }


}

export default Header;