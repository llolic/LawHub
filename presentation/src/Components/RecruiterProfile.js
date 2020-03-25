import React from "react";
import Button from "./Navigation/Button";
import profilePic from "../Images/lawhub.png";

import { TextField } from "@material-ui/core";

import "../Styles/employerprofile.css";
/**
 * Recruiter Profile card for recruiter profile customization.
 * Includes logic to send/receive requests to the flask server
 */
class RecruiterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      sessId: "sessId",
      company: "",
      title: "",
      bio: "",
      profilePicturePath: "",
      submitted: false,
      error: false,
    };
  }

  updateProfilePicturePath() { //TODO
    alert("Sorry, you can't upload pictures for this product release yet!")
  }

  submitRecruiterProfileUpdates = async () => {
    console.log("Attempting to update recruiter profile");
    const response = fetch("http://104.196.152.154:5000/api/v1/editProfile/recruiter", {
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
      console.log("Successfully updated recruiter profile");
    } else {
      //TODO: add different error cases
        //400 BAD REQUEST if request body formatted incorrectly, string too long
        //500 INTERNAL SERVER ERROR for internal error (db down)
      this.setState({ error: true });
      console.log("Failed to update recruiter profile");
    }
    console.log(this.state);
  };

  render = () => {

    return (
      <div className="recruiterprofile_container">
        <div className="card">
            <div className="subtitle">Customize Your Recruiter Profile </div>
          
            { this.state.submitted && <div>Your changes have been saved.</div> }
            { this.state.error && <div>Your changes could not be saved. Please try again</div> }

            <div className = "center">
                <img src={profilePic} alt="your pic here" style={{ width: "150px", height: "150px" }} />
                <Button text = "Upload Picture" 
                    onClick = {this.updateProfilePicturePath}
                />
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
        id="bio"
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
              onClick={this.submitRecruiterProfileUpdates}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default RecruiterProfile;
