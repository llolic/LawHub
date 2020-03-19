import React from "react";
import Button from "./Navigation/Button";
import Posting from "./Postings/Posting";

import { Redirect, Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

import "../Styles/explore.css";

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startQuiz: 0,
      postings: []
    };
  }

  componentDidMount() {
    // getPostings().then(result => {
    //   if (result !== -1) {
    //     this.setState({ postings: result.postings });
    //   }
    // });
    this.setState({
      postings: [
        {
          postingId: 1,
          title: "Test Posting",
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

  renderPostings = () => {
    var postgrid = [];

    for (let i = 0; i < this.state.postings.length; i++) {
      postgrid.push(
        <Posting
          {...this.state.postings[i]}
          clickStartQuiz={() => {
            this.props.updateQuizId(this.state.quizzes[i].quizId);
            this.clickStartQuiz();
          }}
          key={i}
        />
      );
    }
    return postgrid;
  };

  render = () => {
    if (this.state.createQuiz === 1) {
      return <Redirect push to="/quizCreation" />;
    }
    if (this.state.startQuiz === 1) {
      return <Redirect push to="/takeQuiz" />;
    }

    return (
      <div className="explore_container">
        <div className="title">EXPLORE POSTINGS</div>
        <div>
          Complete all quizzes listed on a posting to automatically be considered an applicant for that posting.
        </div>
        <Grid container>{this.renderPostings()}</Grid>
      </div>
    );
  };
}

export default Explore;
