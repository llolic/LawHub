import React from "react";
import Answer from "./Answer";

import { Grid } from "@material-ui/core";

import "../../Styles/registration.css";

/**
 * Student Registration card for the student user.
 * Includes logic to send/receive requests to the flask server
 */

//https://codepen.io/Daanist/pen/LjLoWV

class AnswerList extends React.Component {
  render = () => {
    var answers = [];
    for (let i = 0; i < this.props.question.answers.length; i++) {
      var sel = i === this.props.selected;
      answers.push(
        <Answer
          selected={sel}
          choice={i}
          handler={this.props.handler}
          answer={this.props.question.answers[i]}
          key={i}
        />
      ); //key
    }
    return (
      <Grid item xs={12} className="answer_grid">
        {answers}
      </Grid>
    );
  };
}
export default AnswerList;
