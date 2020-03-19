import React from "react";
import LeaderboardChart from "./Stats/LeaderboardChart";

import { fetchQuizScores } from "../Util/Requests";

import "../Styles/leaderboard.css"; //TODO

class QuizLeaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid, //prob dont need state here?
      sessId: this.props.sessId,
      history: [],
      quizName: ""
    };
  }
  componentWillMount() {
    // fetch user history here
    // update quizid
    fetchQuizScores(this.props.quizId, 1).then(data => {
      // console.log(data);
      this.setState({
        quizName: data.quizName,
        history: data.scores
      });
    }).catch(err =>{
      this.setState({
        quizName: "Test Quiz",
        history: [
          {
            userName: "Harry Gunther",
            numQuizzes: "2020-03-03",
            score: 100
          },
          {
            userName: "Amanda Lee",
            numQuizzes: "2020-03-01",
            score: 95
          },
          {
            userName: "Barry Gunther",
            numQuizzes: "2020-02-27",
            score: 94.3
          },
          {
            userName: "Mandy Collins",
            numQuizzes: "2020-02-16",
            score: 93.2
          },
          {
            userName: "John Smith",
            numQuizzes: "2020-02-09",
            score: 93
          },
        ]
      });
    });

  }

  render = () => {
    return (
      <div className="leaderboard_container">
        <div className="lb_title">{this.state.quizName} Leaderboard</div>

        <div>
          <LeaderboardChart
            col1="User"
            col2="Date"
            col3="Score"
            data={this.state.history}
          />
        </div>
      </div>
    );
  };
}

export default QuizLeaderboard;
