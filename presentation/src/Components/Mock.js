import React from "react";
import Button from "./Button";
import { verifyUser, getQuizzes } from "../Util/Requests";

import { Redirect, Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

import "../Styles/mock.css";
import "../Styles/homepage.css";

class Mock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createQuiz: 0,
      startQuiz: 0,
      quizzes: []
    }
  }

  componentWillMount() {
    getQuizzes().then(result => {
      console.log(result);
      if (result !== -1) {
        this.setState({ quizzes: result.quizzes});
      }
    })
  }

  clickCreate = () => {
     this.setState({ createQuiz: 1 });
     return;
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
     this.setState({ startQuiz: 1 });
     return;
    verifyUser(this.props.sessId, this.props.uid).then(result => {
      if (result === false) {
        this.setState({ startQuiz: -1 });
      }
      else {
        this.setState({ startQuiz: 1 });
      }
    })
  }

  renderQuizzes = () => {
    var quizlist = [];
    for (let i = 0; i < this.state.quizzes.length; i++) {
      quizlist.push(
        <Grid item xs={12} className="quiz_card">
            <div className="quiz_row">
      <div className="quiz_title">{this.state.quizzes[i].quizName}</div>
              <Link to="/takeQuiz">
              {/* SEND QUIZID IN START QUIZ */}
              <Button className="btn_yellow_small" text="Start" 
              // onClick={this.props.updateQuizId(this.state.quizzes[i].quizId)}
              />
              </Link>
            </div>
          </Grid>
      )
    }
    return quizlist;
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
          {this.renderQuizzes()}
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
