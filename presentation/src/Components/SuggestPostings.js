import React from "react";
import Button from "./Navigation/Button";
import { getPostings, getUserInfo } from "../Util/Requests";

import { TextField } from "@material-ui/core";

import "../Styles/suggestpostings.css";

class SuggestPostings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      sessId: this.props.sessId,
      stateOrProvince: "Hardcoded",
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
      ],
      submitted: false,
      error: false
    };
  }

  //https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
  createTable = () => {
    if (this.state.postings.length === 0) {
      this.loadStateOrProvince();
      this.loadPostings();
    }

    let table = [];

    let header = [];
    header.push(
      <tr>
        <th>Posting ID</th>
        <th>Title</th>
        <th>Description</th>
        <th>Recruiter Name</th>
        <th>Quiz IDs</th>
      </tr>
    );

    table.push(header);

    for (let i = 0; i < this.state.postings.length; i++) {
      let children = [];

      //note: {i}, not ${i} since $ is for string
      children.push(<td>{this.state.postings[i].postingId}</td>);
      children.push(<td>{this.state.postings[i].title}</td>);
      children.push(<td>{this.state.postings[i].description}</td>);
      children.push(<td>{this.state.postings[i].recruiterName}</td>);

      let quizzes = [];
        for (let j = 0; j < this.state.postings[i].quizzes.length; j++) {
          quizzes.push(this.state.postings[i].quizzes[j].quizName);
          if ((j !== this.state.postings[i].quizzes.length - 1) && (this.state.postings[i].quizzes.length > 1)) {
            quizzes.push(",");
          }
        }
      children.push(<td>{quizzes}</td>);

      table.push(<tr>{children}</tr>);
    }

    return table;
  };

  loadStateOrProvince = async () => {
    getUserInfo(this.state.uid).then(result => {
      if (result === false) {
        this.setState({ error: true });
        return;
      }
      this.setState({ submitted: true }); // change this later
      this.setState({ stateOrProvince: result.stateOrProvince });
    });
  };

  loadPostings = async () => {
    getPostings(this.state).then(result => {
      if (result === false) {
        this.setState({ error: true });
        return;
      }
      this.setState({ submitted: true }); // change this later
      this.setState({ postings: result.postings });
    });
  };

  render = () => {
    return (
      <div className="suggestpostings_container">
        <div className="card">
          <div className="subtitle">
            {" "}
            Here are some job postings based on your location:{" "}
          </div>

          <h3>Location: {this.state.stateOrProvince}</h3>

          <div className="centerdiv">
            <table id="postings">{this.createTable()}</table>
          </div>
        </div>
      </div>
    );
  };
}

export default SuggestPostings;
