import React from "react";

import Grid from "@material-ui/core/Grid";

import "../../Styles/profile.css"; //TODO

class FilterRow extends React.Component {
  render = () => {
    let quizzes = "";
    for (let j = 0; j < this.props.quizzes.length; j++) {
      quizzes = quizzes.concat(this.props.quizzes[j].quizName);
      if ((j !== this.props.quizzes.length - 1) && (this.props.quizzes.length > 1)) {
        quizzes = quizzes.concat(", ");
      }
    }

    return (
      <Grid container item xs={12} spacing={0} className={this.props.className}>
        <Grid item xs={3} className="quiz_history_title">
          {this.props.title}
        </Grid>
        <Grid item xs={3} className="quiz_history_date">
          {this.props.description}
        </Grid>
        <Grid item xs={3} className="quiz_history_score">
        {this.props.recruiterName}
        </Grid>
        <Grid item xs={3} className="quiz_history_score">
          {quizzes}
        </Grid>
      </Grid>
    );
  };
}

export default FilterRow;
