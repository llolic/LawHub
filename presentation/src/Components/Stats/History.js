import React from "react";

import QuizHistory from "./QuizHistory";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { historyStats } from "../../Constants/stats";

import "../../Styles/history.css"; //TODO

class History extends React.Component {

    // fetch user history here

    // use history stats here??

  render = () => {
    return (
      <Typography component="div" role="tabpanel" hidden={1 !== this.props.tab}>
        {1 === this.props.tab && (
          <Box p={3}>
            <Grid container spacing={0}>
              <Grid container item xs={12} spacing={0} className="grid_header">
                <Grid item xs={6}>
                  <div className="center">Quiz Name</div>
                </Grid>
                <Grid item xs={3}>
                  <div className="center">Date Attempted</div>
                </Grid>
                <Grid item xs={3}>
                  <div className="center">Score</div>
                </Grid>
              </Grid>
              <QuizHistory
                className="history_row_0"
                quizTitle="Test Quiz"
                date="2020-03-03"
                score={84.9}
              />
              <QuizHistory
                className="history_row_1"
                quizTitle="LSAT Mock Quiz"
                date="2020-03-01"
                score={65.2}
              />
              <QuizHistory
                className="history_row_0"
                quizTitle="BAR Example Test Feb 2020"
                date="2020-02-27"
                score={79.2}
              />

              <QuizHistory
                className="history_row_1"
                quizTitle="Criminal Law Quiz"
                date="2020-02-16"
                score={86.1}
              />
              <QuizHistory
                className="history_row_0"
                quizTitle="Immigration Law"
                date="2020-02-09"
                score={100.0}
              />
            </Grid>
          </Box>
        )}
      </Typography>
    );
  };
}

export default History;
