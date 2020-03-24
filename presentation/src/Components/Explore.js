import React from "react";
import Posting from "./Postings/Posting";

import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";

import "../Styles/explore.css";

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startQuiz: 0,
      toRecruiterProfile: 0,
      postings: [],
      doneQuizzes: []
    };
  }

  componentDidMount() {
    // getPostings().then(result => {
    //   if (result !== -1) {
    //     this.setState({ postings: result.postings });
    //   }
    // });
        // getUserHistory(this.props.uid, 0).then(result => {
    //   var doneQuizzes = this.state.doneQuizzes;
    //   for (let i = 0; i < result.scores.length; i++) {
    //     doneQuizzes.push(result.scores[i].quizId);
    //   }
    //
    // });
    this.setState({ doneQuizzes: [17] });
    this.setState({
      postings: [
        {
          postingId: 1,
          title: "Test Posting",
          recruiterName: "Test Recruiter",
          description: "Get hired now!",
          stateOrProvince: "California",
          quizzes: [
            {
              quizId: 17,
              quizName: "3 Sample Bar Questions"
            }
          ]
        },
        {
          postingId: 2,
          title: "White & Case Legal Intern Fall 2020",
          recruiterName: "James Smith",
          description:
            "As a Legal Intern at White & Case you will work with the company's Deputy and General Counsel in many projects and will have a major impact on all departments company-wide.",
          stateOrProvince: "New York",
          quizzes: [
            {
              quizId: 17,
              quizName: "3 Sample Bar Questions"
            }
          ]
        },
        {
          postingId: 3,
          title: "Norton Rose Fulbright Summer 2020 CA ",
          recruiterName: "Jessica Peterson",
          description:
            "Norton Rose Fulbright is looking for a Law intern to join this prestigious internship program at our Irvine, California headquarters.",
          stateOrProvince: "California",
          quizzes: [
            {
              quizId: 17,
              quizName: "3 Sample Bar Questions"
            },
            {
              quizId: 18,
              quizName: "Norton Rose Fulbright Quiz"
            },
            {
              quizId: 19,
              quizName: "Mock LSAT"
            }
          ]
        }
      ]
    });
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
          size={6}
          key={i}
        />
      );
    }
    return postgrid;
  };

  render = () => {
    if (this.state.toRecruiterProfile === 1) {
      return <Redirect push to="/recruiterProfile" />;
    }
    if (this.state.startQuiz === 1) {
      return <Redirect push to="/takeQuiz" />;
    }

    return (
      <div className="explore_container">
        <div className="title">EXPLORE POSTINGS</div>
        <div>
          Complete all quizzes listed on a posting to automatically be considered as an applicant for that posting.
        </div>
        <Grid container>{this.renderPostings()}</Grid>
      </div>
    );
  };
}

export default Explore;
