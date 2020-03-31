import React from "react";
import Button from "./Navigation/Button";
import { submitNewPosting, getQuizzes } from "../Util/Requests";

import {
  TextField,
  MenuItem,
  Checkbox
} from "@material-ui/core";
import {
    stateprovinces
  } from "../Constants/registration";
import { Redirect } from "react-router-dom";

import "../Styles/quizcreation.css";
import "../Styles/registration.css";

class CreatePosting extends React.Component {
  constructor(props) {
    super(props); // sessId and uid are in props
    this.state = {
      title: "",
      description: "",
      stateOrProvince: "",
      quizIds: [],
      tags: [],
      uid: this.props.uid,
      sessId: this.props.sessId,
      submitted: 0,
      missingFields: false,
      response: []
    };
  }

  getAllQuizzes = () => {
    console.log("Getting quizzes");
    getQuizzes().then(result => {
      if (result !== -1) {
        this.setState({ response: result.quizzes });
        console.log(result.quizzes);
      } else {
        this.setState({ response: [] });
      }
    });
  };

  getQuizDisplay = () => {
    if (this.state.response.length === 0) {
        this.getAllQuizzes();
    }
    let display = [];
    for (let i = 0; i < this.state.response.length; i++) {

        display.push(
          <div>
            Quiz Name: {this.state.response[i].quizName}
            <Checkbox 
              onChange={e => this.updateQuizzesUsed(i, e)}
            />
          </div>
        );

      }
      return display;
  }

  updateQuizzesUsed = (i, event) => {
    if (event.target.checked) { // checkbox has newly been checked, add to list

      this.state.quizIds.push(this.state.response[i].quizId);
      console.log("Quizzes used: ");
      console.log(this.state.quizIds);

    } else { // checkbox has been unchecked, remove from list

      var array = this.state.quizIds; // make a separate copy of the array
      var index = array.indexOf(this.state.response[i].quizId)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ quizIds: array });
      }
      console.log("Quizzes used: ");
      console.log(this.state.quizIds);

    }
  }

  fieldsFilled = () => {
    if (this.state.title === "" || this.state.description === "" || this.state.stateOrProvince === "" || this.state.quizIds === []) {
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    console.log("SUBMITTING:" + this.state);
    if (!this.fieldsFilled()) {
      this.setState({ missingFields: true });
      return;
    }
    this.setState({ missingFields: false });
    submitNewPosting(this.state).then(result => {
      if (result === true) {
        this.setState({ submitted: 1 });
      } else {
        this.setState({ submitted: -1 });
      }
    });
  };

  render = () => {
    if (this.state.submitted === 1) {
      return <Redirect push to="/mock" />;
    }

    if (this.state.authorized === false) {
      return <Redirect push to="/login" />;
    }

    return (
      <div className="mock_container">
        <div className="card">
          <div className="subtitle">Posting Creation</div>

            <TextField
                id="title"
                label="Title"
                margin="normal"
                fullWidth
                variant="outlined"
                onChange={e => this.setState({ title: e.target.value })}
            />

            <TextField
                id="description"
                label="Description"
                margin="normal"
                fullWidth
                variant="outlined"
                onChange={e => this.setState({ description: e.target.value })}
                multiline
            />

            <div className="width-50">
              <TextField
                id="stateOrProvince"
                select
                margin="normal"
                label="State/Province"
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

          <div>
            <h3>
              Select the quizzes you would like to use from the list below:
            </h3>
          </div>
          {this.getQuizDisplay()}

          <div className="row" style={{ paddingBottom: "1em" }}>
            <div className="width-70">
              <TextField
                id="tags"
                label="Tags"
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Separate using commas"
                onChange={e => this.setState({ tags: e.target.value })}
              />
            </div>
          </div>

          {this.state.missingFields ? (
            <div style={{ color: "red" }}> Please fill in all the fields. </div>
          ) : (
            <div></div>
          )}

          {this.state.submitted === -1 ? (
            <div style={{ color: "red" }}>
              An error has occurred, please try again.
            </div>
          ) : (
            <div></div>
          )}

          <div className="centerdiv">
            <Button
              className="btn_blue"
              text="SUBMIT"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default CreatePosting;
