import React from "react";
import Button from "./Button";
import { verifyUser } from "../Util/Requests";

import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";

import "../Styles/mock.css";
import "../Styles/homepage.css";

class Mock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createQuiz: 0,
      startQuiz: 0
    }
  }

  clickCreate = () => {
    // this.setState({ createQuiz: 1 });
    // return;
    verifyUser(this.props.sessId, this.props.uid).then(result => {
      if (result === false) {
        this.setState({ createQuiz: -1 });
      }
      else {
        this.setState({ createQuiz: 1 });
      }
    })
  }

  clickStartQuiz = () => {
    // this.setState({ startQuiz: 1 });
    // return;
    verifyUser(this.props.sessId, this.props.uid).then(result => {
      if (result === false) {
        this.setState({ startQuiz: -1 });
      }
      else {
        this.setState({ startQuiz: 1 });
      }
    })
  }

  render = () => {
    if (this.state.createQuiz === 1) {
      return <Redirect push to="/quizCreation"/>
    }
    if (this.state.startQuiz === 1) {
      return <Redirect push to="/takeQuiz"/>
    }
    if (this.state.createQuiz === -1 || this.state.createQuiz === -1) {
      return <Redirect push to="/login"/>
    }


    return (
      <div className="mock_container">
        <div className="title_row">
          <div className="title">
            Mock Quizzes
            {this.props.userType === "recruiter" ? (
              // <Link to="/quizCreation">
                <Button className="btn_yellow_small" text="Create Quiz" onClick={this.clickCreate}/>
              // </Link>
            ) : (
              <div></div>
            )}
          </div>
         
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12} className="quiz_card">
            <div className="quiz_row">
              <div className="quiz_title">Test Quiz</div>
              {/* <Link to="/takeQuiz"> */}
              <Button className="btn_yellow_small" text="Start" onClick={this.clickStartQuiz}/>
              {/* </Link> */}
            </div>
          </Grid>
          <Grid item xs={12} className="quiz_card">
            <div className="quiz_row">
              <div className="quiz_title">BAR Mock Quiz</div>
              <Button className="btn_yellow_small" text="Start" />
              
            </div>
            
          </Grid>
          <Grid item xs={12} className="quiz_card">
            <div className="quiz_row">
              <div className="quiz_title">LSAT Mock</div>
              <Button className="btn_yellow_small" text="Start" />
            </div>
          </Grid>
          <Grid item xs={12} className="quiz_card">
            <div className="quiz_row">
              <div className="quiz_title">BAR and LSAT Questions</div>
              <Button className="btn_yellow_small" text="Start" />
            </div>
          </Grid>
          <Grid item xs={12} className="quiz_card">
            <div className="quiz_row">
              <div className="quiz_title">LSAT Mock Quiz</div>
              <Button className="btn_yellow_small" text="Start" />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };
}

export default Mock;
