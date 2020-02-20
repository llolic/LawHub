import React from "react";
import Button from "./Button";

import { TextField, MenuItem } from "@material-ui/core";
import { Redirect } from "react-router-dom";

// import "../Styles/quizcreation.css";
import "../Styles/registration.css";

/**
 */
class QuizCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      tags: [],
    //numQuestions: 0,
      questions: "",
    //questions: {"q1": [correct, wrong, wrong, wrong], "q2": [...]}
      submitted: false,
    };
  }

  submitQuiz = async () => {
    fetch(
      "http://104.196.152.154:5000/api/v1/addQuiz/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      }
    ).then(result => {
      console.log(result);
      if (result.ok) {
        console.log("Created new quiz");
        this.setState({ submitted: true }); // change this later
      } else {
        console.log("Failed to create quiz");
      }
    });
  };

  render = () => {
    if (this.state.submitted) {
      return <Redirect push to="/successfulRegistration" />;
    }

    return (
      <div className="registration_container">
        <div className="card">
          <div className="subtitle">Quiz Creation</div>

          </div>
      </div>
    );
  };
}

export default QuizCreation;
