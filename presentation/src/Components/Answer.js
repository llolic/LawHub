import React from "react";
import Button from "./Button";

import { Grid } from "@material-ui/core";


import "./studentregistration.css";
import "./takequiz.css";
import "./homepage.css";

/**
 * Student Registration card for the student user.
 * Includes logic to send/receive requests to the flask server
 */

//https://codepen.io/Daanist/pen/LjLoWV

class Answer extends React.Component {
  render = () => {
    return(
      <Grid item xs={12} className="answer_card">
      <div className="row_card">
        <Button className="btn_blue" text={this.props.answer} onClick={() => this.props.handler(this.props.choice)}/>
      </div>
      </Grid>
    )
  }
}
export default Answer;