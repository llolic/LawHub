import React from "react";
import Button from "./Button";
import profilePic from "../Images/lawhub.png";
import {
  schools,
  studyLevels,
  countries,
  stateprovinces
} from "../Constants/registration";

import { TextField, MenuItem } from "@material-ui/core";
//import { Redirect } from "react-router-dom";

import "./studentregistration.css";

/**
 * Student Registration card for the student user.
 * Includes logic to send/receive requests to the flask server
 */
class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Fonzy",
      lastName: "Wonzy",
      email: "fonzywonzy@gmail.com",
      school: "Harvard University",
      studylvl: "Undergraduate",
      country: "Canada",
      stateOrProvince: "Texas",
      biography: "I am",
      city: "toronto",
      submitted: false,
      sessId: -1
    };
  }

  submitStudentProfileUpdates = async () => {
    console.log("Attempting to update profile");
    const response = fetch("http://104.196.152.154:5000/api/v1/update", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
  }).then(result => {
      console.log(result)
  });

    if (response.ok) {
      this.setState({ submitted: true }); // change this later
      console.log("Successfully updated profile");
    } else {
      console.log("Failed to update profile");
    }
    console.log(this.state);
  };

  render = () => {

    return (
      <div className="studentprofile_container">
        <div className="card">
            <div className="subtitle">Customize Your Student Profile </div>
          
            { this.state.submitted && <div>Your changes have been saved.</div>}

            <div className = "center">
                <img src={profilePic} alt="your pic here" style={{ width: "150px", height: "150px" }} />

            </div>
                
        <TextField
            id="firstname"
            label="First Name"
            value={this.state.firstName}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ firstName: e.target.value })}
        />
    
    
        <TextField
            id="lastname"
            label="Last Name"
            value={this.state.lastName}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ lastName: e.target.value })}
        />
    

          <TextField
            id="email"
            label="Email"
            margin="normal"
            value={this.state.email}
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ email: e.target.value })}
            error={!this.state.email.includes("@") && this.state.email !== ""}
          />

          <div className="row">
            <div className="width-60">
              <TextField
                id="school"
                select
                margin="normal"
                label="Post-secondary Institution"
                value={this.state.school}
                onChange={e => this.setState({ school: e.target.value })}
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
                onChange={e => this.setState({ studylvl: e.target.value })}
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
                onChange={e => this.setState({ country: e.target.value })}
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
                value={this.state.stateOrProvince}
                onChange={e => this.setState({ stateOrProvince: e.target.value })}
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
            id="biography"
            label="About Me"
            helperText="Feel free to enter your biography here"
            value={this.state.biography}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ biography: e.target.value })}
          />


          <div className="centerdiv">
            <Button
              className="btn_blue"
              text="Save Changes"
              onClick={this.submitStudentProfileUpdates}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default StudentProfile;
