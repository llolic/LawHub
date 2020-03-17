import React from "react";
import Button from "./Navigation/Button";
import { verifyUser, getQuizzes } from "../Util/Requests";
import MockQuizRow from "./MockQuizRow";

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
      quizzes: [],
      toLeaderboard: 0
    };
  }

  componentDidMount() {
    getQuizzes().then(result => {
      if (result !== -1) {
        this.setState({ quizzes: result.quizzes });
      }
    });
  }

  clickCreate = () => {
    this.setState({ createQuiz: 1 });
    return;
    verifyUser(this.props.sessId, this.props.uid).then(result => {
      if (result === false) {
        this.setState({ createQuiz: -1 });
      } else {
        this.setState({ createQuiz: 1 });
      }
    });
  };

  clickStartQuiz = () => {
    this.setState({ startQuiz: 1 });
    return;
    verifyUser(this.props.sessId, this.props.uid).then(result => {
      if (result === false) {
        this.setState({ startQuiz: -1 });
      } else {
        this.setState({ startQuiz: 1 });
      }
    });
  };

  clickLeaderboard = () => {
    this.setState({ toLeaderboard: 1 });
    return;
  };

  renderQuizzes = () => {
    var quizlist = [];

    for (let i = 0; i < this.state.quizzes.length; i++) {
      // quizlist.push(
      //   <Grid item xs={12} className="quiz_card">
      //       <div className="quiz_row">
      // <div className="quiz_title">{this.state.quizzes[i].quizName}</div>
      //         <Link to="/takeQuiz">
      //         {/* SEND QUIZID IN START QUIZ */}
      //         <Button className="btn_yellow_small" text="Start"
      //         // onClick={this.props.updateQuizId(this.state.quizzes[i].quizId)}
      //         />
      //         </Link>
      //       </div>
      //     </Grid>)

      quizlist.push(
        <MockQuizRow
          quizName={this.state.quizzes[i].quizName}
          clickLeaderboard={() => {
            this.props.updateQuizId(this.state.quizzes[i].quizId);
            this.clickLeaderboard();
          }}
          clickStartQuiz={() => {
            this.props.updateQuizId(this.state.quizzes[i].quizId);
            this.clickStartQuiz();
          }}
          key={i}
        />
      );
    }
    return quizlist;
  };

  render = () => {
    if (this.state.createQuiz === 1) {
      return <Redirect push to="/quizCreation" />;
    }
    if (this.state.startQuiz === 1) {
      return <Redirect push to="/takeQuiz" />;
    }
    if (this.state.createQuiz === -1 || this.state.createQuiz === -1) {
      return <Redirect push to="/login" />;
    }
    if (this.state.toLeaderboard === 1) {
      return <Redirect push to="/quizLeaderboard" />;
    }

    return (
      <div className="mock_container">
        <div className="title_row">
          <div className="title">
            Mock Quizzes
            {this.props.userType === "recruiter" ? (
              // <Link to="/quizCreation">
              <Button
                className="btn_yellow_small"
                text="Create Quiz"
                onClick={this.clickCreate}
              />
            ) : (
              // </Link>
              <div></div>
            )}
          </div>
        </div>

        <Grid container spacing={3}>
          {this.renderQuizzes()}
          {/* <MockQuizRow
            quizName="Test Quiz"
            clickLeaderboard={this.clickLeaderboard}
            clickStartQuiz={this.clickStartQuiz}
          />
          <MockQuizRow quizName="BAR Mock Quiz" />
          <MockQuizRow quizName="LSAT Mock" />
          <MockQuizRow quizName="BAR and LSAT Questions" />
          <MockQuizRow quizName="LSAT Mock Quiz" /> */}
        </Grid>
      </div>
    );
  };
}

export default Mock;
