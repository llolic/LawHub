import React from "react";

import Grid from "@material-ui/core/Grid";

import "../../Styles/profile.css"; //TODO

class QuizHistory extends React.Component {
  render = () => {
    return (
      <Grid container item xs={12} spacing={0} className={this.props.className}>
        <Grid item xs={6} className="quiz_history_title">
            {/* <Link to="quizPage here!!!"> */}
          {this.props.quizTitle}
          {/* </Link> */}
        </Grid>
        <Grid item xs={3} className="quiz_history_date">
        {this.props.date}
        </Grid>
        <Grid item xs={3} className="quiz_history_score">
          {`${this.props.score}%`}
        </Grid>
      </Grid>
    );
  };
}

export default QuizHistory;
