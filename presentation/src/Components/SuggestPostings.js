import React from "react";
import Button from "./Navigation/Button";
import Posting from "./Postings/Posting";

import {
  getSuggestedPostings,
  getUserInfo,
  getUserHistory
} from "../Util/Requests";

import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import {
  Redirect
} from "react-router-dom";

import "../Styles/suggestpostings.css";

class SuggestPostings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      sessId: this.props.sessId,
      stateOrProvince: "Toronto",
      postings: [],
      doneQuizzes: [],
      /*,
      postings: [
        {
          postingId: 1,
          title: "Hard Coded Title 1",
          description: "Hard Coded Description 1",
          stateOrProvince: "Hardcoded",
          recruiterName: "Hard Coded Recruiter 1",
          quizzes: [
            {
              quizId: 1,
              quizName: "Hard Coded Quiz 1"
            }
          ]
        },
        {
          postingId: 2,
          title: "Hard Coded Title 2",
          description: "Hard Coded Description 2",
          stateOrProvince: "Hardcoded",
          recruiterName: "Hard Coded Recruiter 2",
          quizzes: [
            {
              quizId: 1,
              quizName: "Hard Coded Quiz 1"
            },
            {
              quizId: 2,
              quizName: "Hard Coded Quiz 2"
            }
          ]
        },
        {
          postingId: 3,
          title: "Hard Coded Title 3",
          description: "Hard Coded Description 3",
          stateOrProvince: "Hardcoded",
          recruiterName: "Hard Coded Recruiter 3",
          quizzes: [
            {
              quizId: 1,
              quizName: "Hard Coded Quiz 1"
            },
            {
              quizId: 2,
              quizName: "Hard Coded Quiz 2"
            },
            {
              quizId: 3,
              quizName: "Hard Coded Quiz 3"
            }
          ]
        }
      ]*/
      submitted: false,
      error: false
    };
  }

  componentWillMount() {
    getUserHistory(this.props.uid, 0).then(result => {
      var doneQuizzes = this.state.doneQuizzes;
      for (let i = 0; i < result.scores.length; i++) {
        doneQuizzes.push(result.scores[i].quizId);
      }
      this.loadStateOrProvince();
    });

    //this.loadPostings();
    console.log(this.state);
  }

  clickStartQuiz = () => {
    this.setState({ startQuiz: 1 });
    return;
  };

  clickRecruiter = () => {
    this.setState({ toRecruiterProfile: 1 });
    return;
  };


  renderPostings = () => {
    var postgrid = [];

    for (let i = 0; i < this.state.postings.length; i++) {
      postgrid.push(
        <Posting
          {...this.state.postings[i]}
          doneQuizzes={this.state.doneQuizzes}
          clickRecruiter={this.clickRecruiter}
          clickStartQuiz={this.clickStartQuiz}
          updateQuizId={this.props.updateQuizId}
          updateProfileUid={this.props.updateProfileUid}
          size={12}
          key={i}
        />
      );
    }
    return postgrid;
  };

  loadStateOrProvince = async () => {
    getUserInfo(this.state.uid).then(result => {
      if (result === false) {
        this.setState({ error: true });
        return;
      }
      //this.setState({ submitted: true }); // change this later
      console.log(result);
      this.setState({ stateOrProvince: result.stateOrProvince });
      getSuggestedPostings(result.stateOrProvince).then(result => {
        if (result === false) {
          this.setState({ error: true });
          return;
        }
        //this.setState({ submitted: true }); // change this later
        console.log(result);
        this.setState({ postings: result.postings });
      });
    });
  };

  render = () => {
    if (this.state.toRecruiterProfile === 1) {
      return <Redirect push to="/profile" />;
    }
    if (this.state.startQuiz === 1) {
      return <Redirect push to="/takeQuiz" />;
    }

    return (
      <div className="suggestpostings_container">
        {/* <div className="card"> */}
        <div className="subtitle"> POSTING SUGGESTIONS </div>

        <div className="">
          These are based on postings near you.
        </div>

        <div className="centerdiv">
          <Grid container item>
            {this.renderPostings()}
          </Grid>
        </div>
        {/* </div> */}
      </div>
    );
  };
}

export default SuggestPostings;
