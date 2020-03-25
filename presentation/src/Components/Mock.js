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
      toFilter: 0,
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

  clickFilter = () => {
    this.setState({ toFilter: 1 });
    return;
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
    if (this.state.toFilter === 1) {
      return <Redirect push to="/quizFilter" />;
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
            <Link to="/createPosting">
              <Button className="btn_yellow" text="Create Posting" />
              </Link>
         
              <div className="row">
              {this.props.userType === "recruiter" && (
              <Button
                className="btn_small"
                text="Create Quiz"
                onClick={this.clickCreate}
              />
              )}
              <Button
                className="btn_small"
                text="Filter Quizzes"
                onClick={this.clickFilter}
              />
              </div>

          </div>
        </div>

        <Grid container spacing={3}>
          {this.renderQuizzes()}
        </Grid>
      </div>
    );
  };
}

export default Mock;
