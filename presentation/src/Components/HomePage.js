import React from "react";
import Button from "./Button";
import quizImg from "../Images/quizInterface.png";
import profileStats from "../Images/profileStats.png";
import leaderboardImg from "../Images/leaderboard.png";


import "./homepage.css";

import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  render = () => {
    return (
      <div className="home_container">
        <div className="home_banner">
          <Grid container spacing={2}>
            <Grid item xs={6} className="banner_item">
              <div style={{ paddingLeft: "1.5em" }}>It's <em>what</em> you know,</div>
            </Grid>

            <Grid item xs={6} className="banner_item"></Grid>

            <Grid item xs={6} className="banner_item"></Grid>

            <Grid item xs={6} className="banner_item">
              <div style={{ textAlign: "end" }}> not <em>who</em> you know.</div>
            </Grid>

            <Grid item xs={12}>
              <div className="center">
                <Link to="/register">
                  <Button className="btn_yellow" text="JOIN NOW" />
                </Link>
              </div>
              <div className="center">
                <Link to="/registerRecruiter">
                  <Button className="btn_small" text="I'm an Employer" />
                </Link>
              </div>
            </Grid>
          </Grid>
        </div>

        <Grid container spacing={2} className="home_card_grid">
          <div className="half_card">
            <div className="card_title">
              Preparing for your LSAT or BAR exams?
            </div>
            <div className="card_body">
              <img src={quizImg} alt="quiz" style={{ width: "100%" }} />
              <div className="phrase">
                Practice mock quizzes created by employers, and receive instant results!
              </div>
            </div>
          </div>

          <div className="half_card">
              <div className="phrase">
                Differentiate yourself from the crowd
              </div>
            <div className="center">
              <img src={leaderboardImg} alt="stats" style={{ width: "60%" }} />
            </div>
            <div className="card_title_bot" style={{ textAlign: "center" }}>
              Climb the Leaderboard
            </div>
          </div>
        </Grid>
        <div className="row_card">
          <div className="card_title" style={{ textAlign: "center" }}>
            Visualize your progress
          </div>
          <Grid container spacing={2}>
            <img
              src={profileStats}
              alt="stats"
              style={{ width: "60%" }}
            />

            <ul className="padded_lst">
              <li className="lst_item">See personalized statistics</li>
              <li className="lst_item">Track your progress</li>
              <li className="lst_item">Identify strengths and weaknesses</li>
              <li className="lst_item">Improve your skills</li>
            </ul>
          </Grid>
        </div>
      </div>
    );
  };
}

export default HomePage;
