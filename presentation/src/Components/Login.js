import React from 'react';
import Button from './Button';

import { TextField } from '@material-ui/core';

import '../index.css';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            sessId: '', // this needs to be global
            loginState: 0, // 0 initial, 1 successful login, -1 failed login
            responseData: '' // initially nothing
        }
    }

    submitLogin = async () => {

        // grab state values here?? send to database
        //const request_body = {email: this.state.email, password: this.state.password}
        console.log("Attempting to login");
        fetch("http://104.196.152.154:5000/api/v1/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(result => {
            console.log(result)
        });

        // console.log(response.status)
        // if (response.status === 200) {
            // console.log("Login successful");
            // this.setState({loginState: 1}); // change this later
            // this.setState({responseData: response.json()})
            // console.log(response.json())
            // this.setState({sessId: this.responseData.sessId})
        // }
        // else {
            // console.log("Failed to login");
            // this.setState({loginState: -1})
        // }
        console.log(this.state);

    }

    render = () => {
        if (this.loginState === 1) {
            return <Redirect push to="/successfulLogin"/>
        } 

        return (
            <div className="login_container">
                <div className="card">
                    <div className="subtitle">
                        LawHub Account Login
                    </div>

                    
                    <TextField 
                        id="email" 
                        label="Email"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        onChange={e => this.setState({email: e.target.value})}
                        error={!this.state.email.includes("@") && this.state.email !== ""}
                    />

                    <TextField 
                        id="password" 
                        label="Password"
                        helperText="Minimum 6 characters"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        type="password"
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                        error={this.state.password.length < 6 && this.state.password !== ""}

                    />
                    
                    

                    <div className="centerdiv">
                        {/* <Link to="/successfulLogin"> */}
                        <Button 
                            className="btn_blue" 
                            text="Login"
                            onClick={this.submitLogin}
                        />
                        { this.state.loginState === -1 && <p>Your login credentials could not be verified, please try again.</p>}
                        {/* </Link> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;