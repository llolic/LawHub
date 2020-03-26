import React from "react";
import Button from "../Navigation/Button";

import { Grid } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

import "../../Styles/posting.css";

class Posting extends React.Component {
  renderQuizzes = () => {
    let quizzes = [];
    for (let i = 0; i < this.props.quizzes.length; i++) {
      quizzes.push(
        <div className="posting_quiz_list">
          {this.props.doneQuizzes.includes(this.props.quizzes[i].quizId) ? (
            <CheckCircleOutlineIcon style={{ color: "green" }} />
          ) : (
            <HighlightOffIcon style={{ color: "C02121" }} />
          )}
          <Button
            text={` ${this.props.quizzes[i].quizName}`}
            className="btn_simple"
            onClick={() => {
              this.props.updateQuizId(this.props.quizzes[i].quizId);
              this.props.clickStartQuiz();
            }}
          />
        </div>
      );
    }
    return quizzes;
  };

  render = () => {
    return (
      <Grid item xs={this.props.size} className="posting_container">
        <Grid item xs={12} className="posting">
          <Grid container xs={12} className="posting_header">
            <Grid item xs={9} className="posting_title">
              {this.props.title}
            </Grid>
            <Grid item xs={3} className="posting_location">
              <LocationOnOutlinedIcon style={{ color: "EB5757" }} />
              {this.props.stateOrProvince}, USA
            </Grid>

          {this.props.profile ? <div></div> :
            <Grid item xs={12} className="posting_recruiter">
              Posted by:
              <Button
                text={` ${this.props.recruiterName}`}
                className="btn_simple"
                onClick={() => {
              this.props.updateProfileUid(this.props.recruiterId, "recruiter"); // this.props.recruiterUid //!!!!!!!!!!!!!
              this.props.clickRecruiter();
            }}
              />
            </Grid>
          }
            
          </Grid>
          <Grid item xs={12} className="posting_body">
            <Grid item xs={12} className="posting_description">
              {this.props.description}
            </Grid>
            <Grid item xs={12} className="posting_quiz_row">
              <Grid item xs={6} className="posting_quizzes">
                <div className="posting_subtitle"> Required Quizzes:</div>
                {this.renderQuizzes()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

export default Posting;
