import React from "react";

import ChartRow from "./ChartRow";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { historyStats } from "../../Constants/stats";

import "../../Styles/history.css"; //TODO

class History extends React.Component {

    componentWillMount() {
    // fetch user history here
      // getUserHistory(this.props.uid).then(data => {
        // this.setState({
          // history: data
        // });
      // })
      this.setState({
        history: [
          {
            title: "Test Quiz",
            date: "2020-03-03",
            score: 84.9
          },
          {
            title: "LSAT Mock Quiz",
            date: "2020-03-01",
            score: 65.2
          },
          {
            title: "BAR Example Test Feb 2020",
            date: "2020-02-27",
            score: 79.2
          },
          {
            title: "Criminal Law Quiz",
            date: "2020-02-16",
            score: 86.1
          },
          {
            title: "Immigration Law",
            date: "2020-02-09",
            score: 100
          },
        ]
      });
    }

    renderQuizHistories = () => {
      let rows = [];
      for (let i = 0; i < this.state.history.length; i++) {
        rows.push(<ChartRow className={`history_row_${i%2}`}
        quizTitle={this.state.history[i].title}
        date={this.state.history[i].date}
        score={this.state.history[i].score}
        number={-1}
        key={i}/>)
      }
      return rows;
    }

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
              {this.renderQuizHistories()}
            </Grid>
          </Box>
        )}
      </Typography>
    );
  };
}

export default History;
