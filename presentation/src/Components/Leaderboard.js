import React from "react";
import Button from "./Button";
import LeaderboardChart from "./Stats/LeaderboardChart";

import { Link } from "react-router-dom";
import { BarChart, Bar } from "recharts";

import "../Styles/leaderboard.css"; //TODO

const data = [
  {
    name: "Page A",
    uv: 3000
  },
  {
    name: "Page B",
    uv: 4000
  },
  {
    name: "Page C",
    uv: 2000
  }
];

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      sessId: this.props.sessId
    };
  }

  render = () => {
    return (
      <div className="leaderboard_container">
        <div className="lb_title">LawHub Leaderboard</div>

        <div className="center">
          <BarChart width={1300} height={300} data={data}>
            <Bar dataKey="uv" fill="#E49C2F" label={"Hi"} />
          </BarChart>
        </div>

        <div>
          <LeaderboardChart />
        </div>
      </div>
    );
  };
}

export default Leaderboard;
