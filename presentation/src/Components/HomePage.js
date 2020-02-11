import React from "react";
import Button from "./Button";
import filler from "../Images/homepg.jpg";

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
              <div>It's WHAT you know,</div>
            </Grid>

            <Grid item xs={6} className="banner_item"></Grid>

            <Grid item xs={6} className="banner_item"></Grid>

            <Grid item xs={6} className="banner_item">
              <div style={{ textAlign: "end" }}>not WHO you know.</div>
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
              <ul className="card_lst">
                <li>
                  Practice mock quizzes
                  <dd>
                    <img src={filler} alt="quiz" style={{ width: "30%" }} />
                  </dd>
                </li>
               
              </ul>
            </div>
          </div>

          <div className="half_card">
            <div>
              <img src={filler} alt="quiz" style={{ width: "50%" }} />
            </div>
            <div className="card_title" style={{ textAlign: "center" }}>
              Climb the Leaderboard
            </div>
          </div>
        </Grid>
        <div className="row_card">
          <div className="card_title" style={{ textAlign: "center" }}>
            See detailed statistics on your progress
          </div>
        </div>
      </div>
    );
  };
}

export default HomePage;
