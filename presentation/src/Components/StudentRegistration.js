import React from 'react';
import Button from './Button';
import { schools, studyLevels, countries, stateprovinces } from '../Constants/registration';

import { TextField, MenuItem } from '@material-ui/core';

import '../index.css';

class StudentRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverIndex: -1
        }
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
                    />
                   <TextField 
                        id="lastname" 
                        label="Last Name"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                    />
                   <TextField 
                        id="email" 
                        label="Email"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                    />
                    
                    <div className="row">
                        <div className="width-60">
                            <TextField
                                id="school"
                                select
                                margin="normal"
                                label="Post-secondary Institution"
                                value={schools}
                                // onChange={handleChange}
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
                                value={studyLevels}
                                // onChange={handleChange}
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
                                value={schools}
                                // onChange={handleChange}
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
                                value={stateprovinces}
                                // onChange={handleChange}
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
                    />

                    <TextField 
                        id="verify-password" 
                        label="Confirm Password"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                    />  
                    
                    <Button className="btn_blue" text="Submit"/>
                </div>
            </div>
        );
    }


}

export default StudentRegistration;