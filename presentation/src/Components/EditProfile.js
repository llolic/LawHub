import React from "react";
import Button from "./Button";
import {
  schools,
  studyLevels,
  countries,
  stateprovinces
} from "../Constants/registration";
import { updateProfile } from "../Util/Requests";
import profilePic from "../Images/groot.jpg";

import { TextField, MenuItem } from "@material-ui/core";

import "../Styles/studentprofile.css"; //TODO

/**
 * Student Profile card for the student profile customization.
 * Includes logic to send/receive requests to the flask server
 */
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      sessId: this.props.sessId,
      studyLevel: "",
      school: "",
      bio: "",
      profilePicturePath: "../Images/lawhub.png",
      resumePath: "",
      submitted: false,
      error: false
    };
  }

  updateProfilePicturePath() {
    //TODO
    alert("Just kidding, you can't upload pictures yet!");
  }

  updateResumePath() {
    alert("Just kidding, you can't upload resumes yet!");
  }

  // fetch user data...
  componentWillMount() {
    // fetchProfile(this.state.sessId, this.state.userId).then(result => {
    // console.log(result);
    // this.setState({
    //   firstName: result.firstName,
    //   lastName: result.lastName,
    //   studyLevel: result.studyLevel,
    //   school: result.school,
    //   bio: result.bio,
    //   city: result.city,
    //   stateOrProvince: result.stateOrProvince,
    //   country: result.country
    // });
    this.setState({
      firstName: "Harry",
      lastName: "Gunther",
      studyLevel: "Undergraduate",
      school: "Yale University",
      bio:
        "Law school undergraduate looking to apply knowledge of laws, legal codes, and court proceedings and precedents to an attorney position.",
      city: "Hartford",
      stateOrProvince: "Connecticut",
      country: "United States"
    });
    // });
  }

  submitStudentProfileUpdates = async () => {
    updateProfile(this.state).then(result => {
      if (result === false) {
        this.setState({ error: true });

        return;
      }
      this.setState({ submitted: true }); // change this later
    });
  };

  render = () => {
    return (
      <div className="studentprofile_container">
        <div className="card">
          <div className="subtitle">Customize Your Student Profile </div>

          <div className="center">
            <img
              src={profilePic}
              alt="your pic here"
              className="profile_img"
            />
          </div>
          <div className="upload_row">
            <Button
              className="btn_yellow_small"
              text="Upload Picture"
              onClick={this.updateProfilePicturePath}
            />
            <Button
              className="btn_yellow_small"
              text="Upload Resume"
              onClick={this.updateResumePath}
            />
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
          {/* 
          <TextField
            id="email"
            label="Email"
            margin="normal"
            value={this.state.email}
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ email: e.target.value })}
            error={!this.state.email.includes("@") && this.state.email !== ""}
          /> */}

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
                value={this.state.studyLevel}
                onChange={e => this.setState({ studyLevel: e.target.value })}
                variant="outlined"
                fullWidth
              >
                {studyLevels.map(option => (
                  <MenuItem key={option.index} value={option.value}>
                    {option.value}
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
                onChange={e =>
                  this.setState({ stateOrProvince: e.target.value })
                }
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
            {this.state.submitted && (
              <div style={{ color: "green" }}>
                Your changes have been saved.
              </div>
            )}
            {this.state.error && (
              <div style={{ color: "red" }}>
                {" "}
                Your changes could not be saved. Please try again.
              </div>
            )}
          </div>

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

export default EditProfile;
