import React from "react";
import Button from "./Button";

import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

import "../Styles/mock.css";
import "../Styles/homepage.css";

class Mock extends React.Component {
  render = () => {
    return (
      <div className="mock_container">
        <div className="title_row">
          <div className="title">
            Mock Quizzes
            {this.props.isRecruiter ? (
              <Link to="/quizCreation">
              <Button className="btn_yellow_small" text="Create Quiz" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12} className="quiz_card">
            <div className="row_card">Filler Quiz</div>
          </Grid>
          <Grid item xs={12} className="quiz_card">
            <div className="row_card">Filler Quiz</div>
          </Grid>
          <Grid item xs={12} className="quiz_card">
            <div className="row_card">Filler Quiz</div>
          </Grid>
          <Grid item xs={12} className="quiz_card">
            <div className="row_card">Filler Quiz</div>
          </Grid>
          <Grid item xs={12} className="quiz_card">
            <div className="row_card">Filler Quiz</div>
          </Grid>
        </Grid>
      </div>
    );
  };
}

export default Mock;
