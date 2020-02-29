import React from "react";

import { Grid } from "@material-ui/core";

import "../Styles/registration.css";
import "../Styles/takequiz.css";

/**
 * Student Registration card for the student user.
 * Includes logic to send/receive requests to the flask server
 */

//https://codepen.io/Daanist/pen/LjLoWV

class Question extends React.Component {
  render = () => {
    return (
      // <div>
      <Grid item xs={12} className="question_card">
        {/* <div className="quiz_title">{this.props.title}</div> */}
        <div className="question_row">
          <div className="subtitle">Question {this.props.qNum + 1}</div>
          <div className="question_contents">{this.props.question.question}</div>
        </div>
      </Grid>
      // </div>
    );
  };
}
export default Question;
