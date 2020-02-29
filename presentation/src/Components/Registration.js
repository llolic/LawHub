import React from "react";
import Button from "./Button";
import {
  schools,

  studyLevels
} from "../Constants/registration";
import { submitRegistration } from "./Requests";


import { TextField, MenuItem } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import "../Styles/registration.css";

/**
 * Registration card component.
 * props.type determines which registration (student/recruiter) to render.
 * Includes logic to send/receive requests to the flask server
 */
class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",

      // school: "",
      // studylvl: "",
      // country: "",
      // stateOrProvince: "",
      password: "",
      verifyPassword: "",
      // city: "toronto",
      submitted: 0,
      sessId: -1
    };
  }


  handleSumbit = () => {
    submitRegistration(this.state, this.props.type).then(result => {
      if (result === true) {
        this.setState({ submitted: 1 });
      } else {
        this.setState({ submitted: -1 });

      }
    });
  };

  getFields() {
    if (this.props.type === "student") {
      return (
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
                <MenuItem key={option.index} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
      );

    }
  }

  render = () => {

    if (this.state.submitted === 1) {

      return <Redirect push to="/successfulRegistration" />;
    }

    const title = this.props.type === "student" ? "Account" : "Recruiter";

    return (
      <div className="registration_container">
        <div className="card">
          <div className="subtitle">LawHub {title} Registration</div>


          {this.state.submitted === -1 ? (
            <div style={{color: "red"}}> An error has occurred, please try again </div>
          ) : (
            <div></div>
          )}


          <TextField
            id="firstname"
            label="First Name"
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <TextField
            id="lastname"
            label="Last Name"
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ lastName: e.target.value })}
          />
          <TextField
            id="email"
            label="Email"
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ email: e.target.value })}
            error={!this.state.email.includes("@") && this.state.email !== ""}
          />


          {/* {this.getFields()} */}


          <TextField
            id="password"
            label="Password"
            helperText="Minimum 6 characters"
            margin="normal"
            fullWidth
            variant="outlined"
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            error={this.state.password.length < 6 && this.state.password !== ""}
          />

          <TextField
            id="verify-password"
            label="Confirm Password"
            margin="normal"
            fullWidth
            variant="outlined"
            type="password"
            value={this.state.verifyPassword}
            onChange={e => this.setState({ verifyPassword: e.target.value })}
            helperText={
              this.state.password !== this.state.verifyPassword &&
              this.state.verifyPassword !== ""
                ? "Passwords do not match"
                : ""
            }
            error={
              this.state.password !== this.state.verifyPassword &&
              this.state.verifyPassword !== ""
            }
          />

          <div className="centerdiv">
            <Button
              className="btn_blue"
              text="Submit"
              disabled={
                this.state.password.length > 6 &&
                this.state.password === this.state.verifyPassword
                  ? false
                  : true
              }

              onClick={this.handleSumbit}

            />
          </div>
        </div>
      </div>
    );
  };
}

export default Registration;
