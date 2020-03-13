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
      history: []
    };
  }
  componentWillMount() {
    // fetch user history here
    // update quizid
      fetchQuizScores(17, 1).then(data => {
        console.log(data);
        this.setState({
          quizName: data.quizName,
          history: data.scores
        });
      })
      // this.setState({
      //   quizName: "Test Quiz",
      //   history: [
      //     {
      //       user: "Harry Gunther",
      //       numQuizzes: "2020-03-03",
      //       avgScore: 100
      //     },
      //     {
      //       user: "Amanda Lee",
      //       numQuizzes: "2020-03-01",
      //       avgScore: 95
      //     },
      //     {
      //       user: "Barry Gunther",
      //       numQuizzes: "2020-02-27",
      //       avgScore: 94.3
      //     },
      //     {
      //       user: "Mandy Collins",
      //       numQuizzes: "2020-02-16",
      //       avgScore: 93.2
      //     },
      //     {
      //       user: "John Smith",
      //       numQuizzes: "2020-02-09",
      //       avgScore: 93
      //     },
      //   ]
      // });
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
