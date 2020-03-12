import React from "react";
import Button from "./Button";

import { Grid } from "@material-ui/core";

import "../Styles/mock.css";
import "../Styles/homepage.css";

class MockQuizRow extends React.Component {
  render = () => {
    return (
      <Grid item xs={12}>
        <Grid container item xs={12} className="quiz_row" spacing={1} alignItems="center">
          <Grid item xs={8} className="">
            <div className="quiz_title">{this.props.quizName}</div>
          </Grid>
          <Grid container item xs={2} direction="row-reverse">
            <Button
              className="btn_small_blk"
              text="Leaderboard"
              onClick={this.props.clickLeaderboard}
            />
          </Grid>
          <Grid container item xs={2} direction="row-reverse">
            {/* <Link to="/takeQuiz"> */}
            <Button
              className="btn_yellow_small"
              text="Start"
              onClick={this.props.clickStartQuiz}
            />
            {/* </Link> */}
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

export default MockQuizRow;
