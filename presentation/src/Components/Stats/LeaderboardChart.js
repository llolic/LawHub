import React from "react";

import ChartRow from "./ChartRow";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import "../../Styles/history.css"; //TODO

class LeaderboardChart extends React.Component {
  renderQuizHistories = () => {
    let rows = [];
    if (this.props.data.length === 0) {
      return (
        <div>
          No results yet!
        </div>
      )
    }

    for (let i = 0; i < this.props.data.length; i++) {
      rows.push(
        <ChartRow
          className={`history_row_${i % 2}`}
          quizTitle={this.props.data[i].userName}
          date={this.props.data[i].numQuizzes}
          score={this.props.data[i].score * 100}
          key={i}
          number={i + 1}
        />
      );
    }
    return rows;
  };

  // use history stats here??

  render = () => {
    return (
      <Box p={3}>
        <Grid container spacing={0}>
          <Grid container item xs={12} spacing={0} className="grid_header">
            <Grid item xs={6}>
              <div className="center">{this.props.col1}</div>
            </Grid>
            <Grid item xs={3}>
              <div className="center">{this.props.col2}</div>
            </Grid>
            <Grid item xs={3}>
              <div className="center">{this.props.col3}</div>
            </Grid>
          </Grid>
          {this.renderQuizHistories()}
        </Grid>
      </Box>
    );
  };
}

export default LeaderboardChart;
