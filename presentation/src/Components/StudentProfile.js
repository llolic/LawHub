import React from "react";
import Button from "./Button";
import {
  schools,
  studyLevels
} from "../Constants/registration";
import profilePic from "../Images/groot.jpg";

import { TextField, MenuItem } from "@material-ui/core";

import "./studentprofile.css"; //TODO

/**
 * Student Profile card for the student profile customization.
 * Includes logic to send/receive requests to the flask server
 */
class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studyLevel: 0, //TODO: integer values
      school: "Harvard University",
      profilePicturePath: "../Images/lawhub.png",
      resumePath: "",
      bio: "I am Groot",
      submitted: false,
      sessId: -1
    };
  }

  updateProfilePicturePath() { //TODO
    alert("Just kidding, you can't upload pictures yet!")
  }

  updateResumePath() {
      alert("Just kidding, you can't upload resumes yet!")
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
                <Button text = "Upload Picture" 
                    onClick = {this.updateProfilePicturePath}
                />
                <Button text = "Upload Resume" 
                    onClick = {this.updateResumePath}
                />
            </div>
            

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
                id="studyLevel"
                select
                margin="normal"
                label="Level of Study"
                value={studyLevels[this.state.studyLevel].value}
                onChange={e => this.setState({ studyLevel: e.target.key })} //e.target.key
                variant="outlined"
                fullWidth
              >
                {studyLevels.map(option => ( //https://stackoverflow.com/questions/38364400/index-inside-map-function
                  <MenuItem key={option.index} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>

          <TextField
            id="biography"
            label="About Me"
            helperText="Feel free to enter your biography here"
            value={this.state.bio}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ bio: e.target.value })}
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
