import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import GavelIcon from "@material-ui/icons/Gavel";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import HistoryIcon from "@material-ui/icons/History";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import AssignmentIcon from "@material-ui/icons/Assignment";

import {
  LineChart,
  CartesianGrid,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

import {
  overallStats,
  categories,
  summaryStats,
  COLORS
} from "../../Constants/stats";

class OverallStats extends React.Component {
  render = () => {
    return (
      <Typography component="div" role="tabpanel" hidden={0 !== this.props.tab}>
        {0 === this.props.tab && (
          <Box p={3}>
            <div className="row">
              <div>
                <div className="chart_title">Latest History</div>

                <LineChart
                  width={400}
                  height={400}
                  data={overallStats}
                  margin={{
                    top: 30,
                    bottom: 10
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="speed"
                    stroke="#E49C2F"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#446598"
                    strokeWidth={2}
                  />
                </LineChart>
              </div>
              <div>
                <PieChart width={400} height={350}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={categories}
                    cx={180}
                    cy={200}
                    outerRadius={100}
                    label
                  >
                    {categories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <div className="chart_title"> Popular Categories </div>
              </div>
            </div>

            <div className="row">
              <div className="width-50">
                <ul className="stats_list">
                  <li className="stats_list_item">
                    <DoneAllIcon style={{ color: "green" }} />
                    {`Total Quizzes Attempted: ${summaryStats.numAttempted}`}
                  </li>
                  <li className="stats_list_item">
                    <AssignmentIcon style={{ color: "purple" }} />
                    {`Average Score: ${summaryStats.avgScore}%`}
                  </li>
                  <li className="stats_list_item">
                    <HistoryIcon style={{ color: "#446598" }} />
                    {`Average Time per Question: ${summaryStats.avgTime} s`}
                  </li>
                </ul>
              </div>
              <div className="width-50">
                <ul className="stats_list">
                  <li className="stats_list_item">
                    <TrendingUpIcon style={{ color: "red" }} />
                    {`Highest Leaderboard Rank: ${summaryStats.highestRank}`}
                  </li>
                  <li className="stats_list_item">
                    <StarBorderIcon style={{ color: "orange" }} />
                    {`Perfect Quizzes: ${summaryStats.perfectQuizzes}`}
                  </li>
                  <li className="stats_list_item">
                    <GavelIcon style={{ color: "brown" }} />
                    {`Member since: ${summaryStats.joinDate}`}
                  </li>
                </ul>
              </div>
            </div>
          </Box>
        )}
      </Typography>
    );
  };
}

export default OverallStats;
