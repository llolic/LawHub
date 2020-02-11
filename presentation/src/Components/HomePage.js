import React from 'react';
import Button from './Button';

import './homepage.css';

import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    render = () => {
        return (
            <div className="home_banner">
                <Grid 
                    container 
                    spacing={2}
                >
                    <Grid 
                        item 
                        xs={6}
                        className="banner_item"
                    >
                        <div>It's WHAT you know,</div>
                    </Grid>

                    <Grid item xs={6} className="banner_item">
                    </Grid>

                    <Grid item xs={6} className="banner_item">
                    </Grid>

                    <Grid 
                        item 
                        xs={6}
                        className="banner_item"
                    >
                        <div style={{textAlign: 'end'}}>
                            not WHO you know.
                        </div>
                    </Grid>

                    <Grid 
                        item 
                        xs={12}
                    >
                        <div className="center">
                            <Link to="/register">
                                <Button className="btn_yellow" text="JOIN NOW"/>
                            </Link>
                        </div>
                        <div className="center">
                            <Link to="/registerRecruiter">
                                <Button className="btn_small" text="I'm an Employer"/>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )

    }
}

export default HomePage;
