import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar } from "recharts";

import "../../Styles/profile.css"; //TODO

class AccuracyStats extends React.Component {
  render = () => {
    const data = [
      {
        name: "Feb 1",
        percentage: 84
      },
      {
        name: "Feb 8",
        percentage: 44
      },
      {
        name: "Feb 15",
        percentage: 77
      },
      {
        name: "Feb 22",
        percentage: 32
      },
      {
        name: "Mar 1",
        percentage: 64
      },
      {
        name: "Mar 8",
        percentage: 79
      },
      {
        name: "Mar 15",
        percentage: 93
      }
    ];
    return (
      <Typography component="div" role="tabpanel" hidden={2 !== this.props.tab}>
        {2 === this.props.tab && (
          <Box p={3}>
            <div className="chart_title"> Correctness per week </div>

            <BarChart width={700} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentage" fill="#89A3CB" />
            </BarChart>

            <ul className="stats_list">
              <li className="stats_list_item">
                {`Accuracy this month: ${82.2}%`}
              </li>
              <li className="stats_list_item">
                {`Highest quiz percentage: ${98}% on ${"LSAT QUIZ 1"}`}
              </li>
              <li className="stats_list_item">
                {`Accumulated accuracy across all quizzes: ${77.9}%`}
              </li>
            </ul>
          </Box>
        )}
      </Typography>
    );
  };
}

export default AccuracyStats;
