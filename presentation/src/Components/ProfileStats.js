import React from "react";
import OverallStats from "./Stats/OverallStats";
import SpeedStats from "./Stats/SpeedStats";
import AccuracyStats from "./Stats/AccuracyStats";
import CategoryStats from "./Stats/CategoryStats";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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
            <Tab label="Speed" />
            <Tab label="Accuracy" />
            <Tab label="Categories" />
          </Tabs>
        </Paper>

        <OverallStats tab={this.state.tab} />

        <SpeedStats tab={this.state.tab} />

        <AccuracyStats tab={this.state.tab} />

        <CategoryStats tab={this.state.tab} />
      </div>
    );
  };
}

export default ProfileStats;
