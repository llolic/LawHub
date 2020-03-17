import React from "react";

import { Grid, Radio } from "@material-ui/core";

import "../../Styles/registration.css";
import "../../Styles/takequiz.css";
import "../../Styles/homepage.css";

/**
 * Student Registration card for the student user.
 * Includes logic to send/receive requests to the flask server
 */

//https://codepen.io/Daanist/pen/LjLoWV

class Answer extends React.Component {
  render = () => {
    var selected = this.props.selected ? "--selected" : "";
    return (
      <Grid item xs={12} className="answer_card">
        <div
          className={"answer_row" + selected}
          onClick={() => this.props.handler(this.props.choice)}
        >
          <Radio
            className="radio_mc"
            checked={this.props.selected}
            style={{ color: "#EB5757" }}
          />
          {this.props.answer}
        </div>
      </Grid>
    );
  };
}
export default Answer;
