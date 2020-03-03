import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Line
} from "recharts";

import {
    overallStats,
} from "../../Constants/stats";

import "../../Styles/profile.css"; //TODO

class SpeedStats extends React.Component {
  render = () => {
    return (
        <Typography
        component="div"
        role="tabpanel"
        hidden={1 !== this.props.tab}
      >
        {1 === this.props.tab && (
          <Box p={3}>
             <LineChart width={700} height={300} data={overallStats}
  margin={{ top: 5, right: 30, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="date" />
  <YAxis />
  {/* <Tooltip /> */}
  {/* <Legend /> */}
  <Line type="monotone" dataKey="speed" stroke="#8884d8" />
  {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
</LineChart>
          </Box>
        )}
      </Typography>);
  };
}

export default SpeedStats;
