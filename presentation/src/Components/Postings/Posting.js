import React from "react";
import Button from "../Navigation/Button";

import { Grid } from "@material-ui/core";

import "../../Styles/posting.css";

class Posting extends React.Component {
  renderQuizzes = () => {
    let quizzes = [];
    for (let i = 0; i < this.props.quizzes.length; i++) {
      quizzes.push(<div>{this.props.quizzes[i].quizName}</div>);
    }
    return quizzes;
  };

  render = () => {
    return (
      <Grid item xs={6} className="posting_container">
        <Grid item xs={12} className="posting">
          <Grid container xs={12} className="posting_header">
            <Grid item xs={9} className="posting_title">
              {this.props.title}
            </Grid>
            <Grid item xs={3} className="posting_location">
              {this.props.stateOrProvince}, USA
            </Grid>
          </Grid>
          <Grid item xs={12} className="posting_body">
          <Grid item xs={12} className="posting_description">
            {this.props.description}
          </Grid>
          <Grid item xs={12} className="posting_quiz_row">
            <Grid item xs={6} className="posting_quiz">
              <div className="posting_subtitle"> Required Quizzes:</div>
              {this.renderQuizzes()}
            </Grid>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

export default Posting;
