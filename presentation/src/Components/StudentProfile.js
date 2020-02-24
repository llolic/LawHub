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
      userId: "userId",
      sessId: "sessId",
      studyLevel: "",
      school: "",
      bio: "",
      profilePicturePath: "../Images/lawhub.png",
      resumePath: "",
      submitted: false,
      error: false
    };
  }

  updateProfilePicturePath() { //TODO
    alert("Just kidding, you can't upload pictures yet!")
  }

  updateResumePath() {
      alert("Just kidding, you can't upload resumes yet!")
  }

  submitStudentProfileUpdates = async () => {
    console.log("Attempting to update student profile");
    const response = fetch("http://104.196.152.154:5000/api/v1/editProfile/student", {
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
      console.log("Successfully updated student profile");
    } else { 
      //TODO: add different error cases
        //400 BAD REQUEST if request body formatted incorrectly, string too long
        //500 INTERNAL SERVER ERROR for internal error (db down)
      this.setState({ error: true });
      console.log("Failed to update student profile");
    }
    console.log(this.state);
  };

  render = () => {

    return (
      <div className="studentprofile_container">
        <div className="card">
            <div className="subtitle">Customize Your Student Profile </div>
          
            { this.state.submitted && <div>Your changes have been saved.</div>}
            { this.state.error && <div>Your changes could not be saved. Please try again.</div> }

            <div className = "center">
                <img src={profilePic} alt="your pic here" style={{ width: "150px", height: "150px" }} />
            </div>
            
            <div className = "center">
              <Button 
                  className="btn_blue"
                  text = "Upload Picture" 
                  onClick = {this.updateProfilePicturePath}
              />
              <Button 
                className="btn_blue"
                text = "Upload Resume" 
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
                //value={studyLevels[this.state.studyLevel].value}
                //onChange={e => this.setState({ studyLevel: e.target.key })} //e.target.key
                value={this.state.studylvl}
                onChange={e => this.setState({ studylvl: e.target.value })}
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
            id="bio"
            label="About Me"
            helperText="Feel free to enter your biography here"
            value={this.state.bio}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ bio: e.target.value })}
            multiline
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
