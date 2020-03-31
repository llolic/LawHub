import React from "react";
import Button from "./Navigation/Button";
import profilePic from "../Images/lawhub.png";
import {
  countries,
  stateprovinces
} from "../Constants/registration";
import { updateProfile, getRecruiterInfo } from "../Util/Requests";

import { TextField, MenuItem } from "@material-ui/core";

import "../Styles/employerprofile.css";
/**
 * Recruiter Profile card for recruiter profile customization.
 * Includes logic to send/receive requests to the flask server
 */
class EditRecruiterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      sessId: "sessId",
      company: "",
      title: "",
      bio: "",
      country: "",
      stateOrProvince: "",
      profilePicturePath: "",
      submitted: false,
      error: false
    };
  }

  updateProfilePicturePath() {
    //TODO
    alert("Sorry, you can't upload pictures for this product release yet!");
  }

  componentWillMount() {
    getRecruiterInfo(this.state.uid).then(result => {
      console.log(result);
      this.setState({
        firstName: result.firstName,
        lastName: result.lastName,
        bio: result.bio,
        company: result.companyName,
        title: result.title,
        stateOrProvince: result.stateOrProvince,
        country: result.country
      });
    });
  }

  submitRecruiterProfileUpdates = async () => {
    updateProfile(this.state, this.props.userType).then(result => {
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
          <div className="subtitle">Customize Your Recruiter Profile </div>

          {this.state.submitted && <div>Your changes have been saved.</div>}
          {this.state.error && (
            <div>Your changes could not be saved. Please try again</div>
          )}

          <div className="center">
            <img
              src={profilePic}
              alt="your pic here"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <div className="center">
            <Button
              text="Upload Picture"
              onClick={this.updateProfilePicturePath}
              className="btn_small"
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

export default EditRecruiterProfile;
