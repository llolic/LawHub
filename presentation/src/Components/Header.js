import React from 'react';
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
                <button className="home_link">
                    LAWHUB
                </button>
                <Button className="btn_header" text="Leaderboard"/>
                <Button className="btn_header" text="Mock"/>
                <Button className="btn_header" text="Explore"/>
            </div>
        );
    }


}

export default Header;