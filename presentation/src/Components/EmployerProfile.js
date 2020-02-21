import React from "react";
import Button from "./Button";
import profilePic from "../Images/lawhub.png";

import { TextField } from "@material-ui/core";

import "./studentregistration.css";

/**
 * Student Registration card for the student user.
 * Includes logic to send/receive requests to the flask server
 */
class EmployerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "Pearson-Spectre-Litt",
      title: "Fraudulent Intern",
      profilePicturePath: "",
      bio: "We fun",
      submitted: false,
      sessId: -1
    };
  }

  submitEmployerProfileUpdates = async () => {
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
      <div className="employerprofile_container">
        <div className="card">
            <div className="subtitle">Customize Your Employer Profile </div>
          
            { this.state.submitted && <div>Your changes have been saved.</div>}

            <div className = "center">
                <img src={profilePic} alt="your pic here" style={{ width: "150px", height: "150px" }} />
            </div>
                
        <TextField
            id="company"
            label="Company"
            value={this.state.company}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ company: e.target.value })}
        />
    
    
        <TextField
            id="title"
            label="Title"
            value={this.state.title}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ title: e.target.value })}
        />

        <TextField
        id="biography"
        label="About Us"
        helperText="Feel free to enter your company description here"
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
              onClick={this.submitEmployerProfileUpdates}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default EmployerProfile;
