import React from "react";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
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

import { overallStats, categories, COLORS } from "../Constants/stats";

import "../Styles/profile.css"; //TODO

class ProfileStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "userId",
      sessId: "sessId",
      userType: "student",
      tab: 0
    };
  }

  changeTab = (e, newIndex) => {
    console.log(newIndex);
    this.setState({ tab: newIndex });
  };

  render = () => {
    return (
      <div className="profile_stats">
        <div className="overview_title"> PERFORMANCE OVERVIEW </div>
        <Paper className="">
          <Tabs
            value={this.state.tab}
            onChange={this.changeTab}
            indicatorColor="secondary"
            textColor="primary"
            centered
          >
            <Tab label="Overall" />
            {/* <Tab label="Improvement" /> */}
            <Tab label="Speed" />
            <Tab label="Accuracy" />
            <Tab label="Categories" />
          </Tabs>
        </Paper>

        <Typography
          component="div"
          role="tabpanel"
          hidden={0 !== this.state.tab}
        >
          {0 === this.state.tab && (
            <Box p={3}>
              <div className="row">
                <div>
                  <div className="chart_title">Latest History</div>

                  <LineChart
                    width={500}
                    height={400}
                    data={overallStats}
                    margin={{
                      top: 30,
                      right: 20,
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
                      cx={190}
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
                       Total Quizzes Attempted: 123
                    </li>
                    <li className="stats_list_item">
                      <AssignmentIcon style={{ color: "purple" }} /> 
                        Average Score: 88.3%
                    </li>
                    <li className="stats_list_item">
                      <HistoryIcon style={{ color: "#446598" }} /> 
                        Average Time per Question: 301.2 s
                    </li>
                  </ul>
                </div>
                <div className="width-50">
                  <ul className="stats_list">
                    <li className="stats_list_item">
                      <TrendingUpIcon style={{ color: "red" }} /> 
                        Highest Leaderboard Rank: 834 / 2356
                    </li>
                    <li className="stats_list_item">
                      <StarBorderIcon style={{ color: "orange" }} />
                        Perfect Quizzes: 7
                    </li>
                    <li className="stats_list_item">
                      <GavelIcon style={{ color: "brown" }} /> 
                        Member since: January 6 2020
                    </li>
                  </ul>
                </div>
              </div>
            </Box>
          )}
        </Typography>

        <Typography
          component="div"
          role="tabpanel"
          hidden={1 !== this.state.tab}
        >
          {1 === this.state.tab && <Box p={3}>Bi</Box>}
        </Typography>
      </div>
    );
  };
}

export default ProfileStats;
