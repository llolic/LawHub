import React from "react";

import QuizHistory from "./QuizHistory";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import "../../Styles/history.css"; //TODO

class LeaderboardChart extends React.Component {

    componentWillMount() {
    // fetch user history here
      // getUserHistory(this.props.sessId, this.props.uid).then(data => {
        // this.setState({
          // history: data
        // });
      // })
      this.setState({
        history: [
          {
            user: "Harry Gunther",
            numQuizzes: 123,
            avgScore: 84.9
          },
          {
            user: "John Smith",
            numQuizzes: 156,
            avgScore: 83
          },
          {
            user: "Amanda Lee",
            numQuizzes: 120,
            avgScore: 82.7
          },
          {
            user: "Barry Gunther",
            numQuizzes: 133,
            avgScore: 82.2
          },
          {
            user: "Mandy Collins",
            numQuizzes: 101,
            avgScore: 81.5
          },
        ]
      });
    }

    renderQuizHistories = () => {
      let rows = [];
      for (let i = 0; i < this.state.history.length; i++) {
        rows.push(<QuizHistory className={`history_row_${i%2}`}
        quizTitle={this.state.history[i].user}
        date={this.state.history[i].numQuizzes}
        score={this.state.history[i].avgScore}/>)
      }
      return rows;
    }

    // use history stats here??

  render = () => {

    return (
          <Box p={3}>
            <Grid container spacing={0}>
              <Grid container item xs={12} spacing={0} className="grid_header">
                <Grid item xs={6}>
                  <div className="center">User</div>
                </Grid>
                <Grid item xs={3}>
                  <div className="center">Quizzes Attempted</div>
                </Grid>
                <Grid item xs={3}>
                  <div className="center">Average Score</div>
                </Grid>
              </Grid>
              {this.renderQuizHistories()}
            </Grid>
          </Box>
    );
  };
}

export default LeaderboardChart;
