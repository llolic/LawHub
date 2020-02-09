import React from 'react';
import Button from './Button';
import { schools, studyLevels, countries, stateprovinces } from '../Constants/registration';

import { TextField, MenuItem } from '@material-ui/core';

import '../index.css';

class StudentRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            school: '',
            studylvl: '',
            country: '',
            stateprovince: '',
            password: '',
            verifyPassword: '',
            submitted: false
        }
    }    

    submitRegistration = async () => {
        // grab state values here?? send to database
        console.log("Created new user");
        const response = await fetch('/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        });

        if (response.ok) {
            console.log("Created new user");
        }
        else {
            console.log("Failed to create user");
        }
        console.log(this.state);

    }

    render = () => {

        return (
            <div className="registration_container">
                <div className="card">
                    <div className="subtitle">
                        LawHub Account Registration
                    </div>

                    <TextField 
                        id="firstname" 
                        label="First Name"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        onChange={e => this.setState({firstname: e.target.value})}
                    />
                   <TextField 
                        id="lastname" 
                        label="Last Name"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        onChange={e => this.setState({lastname: e.target.value})}
                    />
                   <TextField 
                        id="email" 
                        label="Email"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        onChange={e => this.setState({email: e.target.value})}
                    />
                    
                    <div className="row">
                        <div className="width-60">
                            <TextField
                                id="school"
                                select
                                margin="normal"
                                label="Post-secondary Institution"
                                value={this.state.school}
                                onChange={e => this.setState({school: e.target.value})}
                                variant="outlined"
                                fullWidth
                            >
                                {schools.map(school => (
                                  <MenuItem key={school} value={school}>
                                    {school}
                                  </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div className="width-40">
                            <TextField
                                id="studylvl"
                                select
                                margin="normal"
                                label="Level of Study"
                                value={this.state.studylvl}
                                onChange={e => this.setState({studylvl: e.target.value})}
                                variant="outlined"
                                fullWidth
                            >
                                {studyLevels.map(option => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>

                    <div className="row">
                        <div className="width-50">
                            <TextField
                                id="country"
                                select
                                margin="normal"
                                label="Country"
                                value={this.state.country}
                                onChange={e => this.setState({country: e.target.value})}
                                variant="outlined"
                                fullWidth
                            >
                                {countries.map(option => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div className="width-50">
                            <TextField
                                id="state-province"
                                select
                                margin="normal"
                                label="State/Province"
                                value={this.state.stateprovince}
                                onChange={e => this.setState({stateprovince: e.target.value})}
                                variant="outlined"
                                fullWidth
                            >
                                {stateprovinces.map(option => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>

                    <TextField 
                        id="password" 
                        label="Password"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                    />

                    <TextField 
                        id="verify-password" 
                        label="Confirm Password"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        value={this.state.verifyPassword}
                        onChange={e => this.setState({verifyPassword: e.target.value})}
                    />  
                    
                    <div className="centerdiv">
                        <Button 
                            className="btn_blue" 
                            text="Submit"
                            disabled={
                                (this.state.password.length > 6 && 
                                this.state.password === this.state.verifyPassword)
                                ? false : true}
                            onClick={this.submitRegistration}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentRegistration;