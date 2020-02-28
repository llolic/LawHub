import React from "react";
import Button from "./Button";
import QuizArea from "./QuizArea";

import { response } from "../Constants/quiz";

import "./studentregistration.css";
import "./takequiz.css";

/**
 * Student Registration card for the student user.
 * Includes logic to send/receive requests to the flask server
 */

//https://codepen.io/Daanist/pen/LjLoWV

class TakeQuiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "userId",
      quizId: "quiz1",
      title: response.title,
      userAnswers: [], //TODO
      curr_answer: "",
      current: 0,
      dataSet: response.questions,
      numQs: response.numQs,
      correct: 0,
      incorrect: 0,
      numMultChoice: 0, //TODO
      done: false,
      submitted: false,
      error: false
    };

    // this.handleClick = this.handleClick.bind(this);
  }

  addAnswerToList = choice => {
    this.setState({ curr_answer: choice });
    //console.log(choice)
    //console.log(this.state.curr_answer)
    var temp = {answer: choice,
                questionId: this.state.dataSet[this.state.current].questionId,
                questionType: this.state.dataSet[this.state.current].questionType}
    const new_arr = this.state.userAnswers.concat(temp); //TODO: user_answers, const
    //console.log(this.state.user_answers)
    this.setState({ userAnswers: new_arr }, () => {
      //TODO: callbacks to guarantee since async
      console.log(this.state.userAnswers);
    }); //Bracket placements
    //console.log(new_arr)

    this.setState({ current: this.state.current + 1 });
    this.setState({ numMultChoice: this.state.numMultChoice + 1 }); // TODO
    console.log(this.state.numMultChoice);
    //console.log(this.state.curr_answer)
  };

  handleClick = choice => {
    console.log(this.state.current);
    console.log(this.state.numQs);
    if (this.state.dataSet[this.state.current].questionType === "0") {
      // if we have a quiz
      if (choice === this.state.dataSet[this.state.current].correct) {
        this.setState({ correct: this.state.correct + 1 });
      } else {
        this.setState({ incorrect: this.state.incorrect + 1 });
      }

      if (this.state.current === this.state.numQs) {
        this.addAnswerToList(choice); //TODO: final add
        this.setState({ done: true });
        this.submitQuiz();
      } else {
        //TODO
        this.addAnswerToList(choice);

        //this.state.student_answers[this.state.current] = this.state.curr_answer;
        //this.setState({student_answers: [...this.state.student_answers, this.state.curr_answer]}) // TODO: https://stackoverflow.com/questions/26505064/what-is-the-best-way-to-add-a-value-to-an-array-in-state
      }
    } else if (this.state.dataSet[this.state.current].questionType === "1") {
      //we have an open response
      //this.setState({curr_answer: choice})
      //console.log(choice)
      //console.log(this.state.curr_answer)
      if (this.state.current === this.state.numQs) {
        this.setState({ done: true });
        this.submitQuiz();
      } else {
        //const new_arr = this.state.user_answers.push(this.state.curr_answer)
        var temp = {answer: choice,
                    questionId: this.state.dataSet[this.state.current].questionId,
                    questionType: this.state.dataSet[this.state.current].questionType}
        const new_arr = this.state.userAnswers.push(temp); //TODO: user_answers, const
        //console.log(this.state.user_answers)
        this.setState({ userAnswers: new_arr }, () => {
          //TODO: callbacks to guarantee since async
          // console.log(this.state.user_answers);
        }); //Bracket placements
        this.setState({ current: this.state.current + 1, curr_answer: "" });
      }
    }
  };

  submitQuiz = async () => {
    console.log("Attempting to submit quiz results");
    const response = fetch("http://104.196.152.154:5000/api/v1/submitQuiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(result => {
      console.log(result);
    });

    if (response.ok) {
      this.setState({ submitted: true }); // change this later
      console.log("Successfully submitted quiz results");
    } else {
      // TODO: other error cases
      this.setState({ error: true });
      console.log("Failed to submit quiz results");
    }
    console.log(this.state);
  };

  render() {
    return (
      <div>
        {this.state.done ? ( // quiz done
          <div className="takeQuizContainer">
            {/* <div className="centerdiv"> */}
            <div className="subtitle">
              <div className="centerdiv">
                You got {this.state.correct} questions correct out of{" "}
                {this.state.numMultChoice}
              </div>
              {this.state.submitted && (
                <div> Your results have been submitted </div>
              )}

              {this.state.error === true && (
                <div>
                  <div className="centerdiv">
                    Your results could not submitted, please try again.
                  </div>
                  <div className="centerdiv">
                  <Button
                    className="btn_blue"
                    text="Submit Results"
                    onClick={this.submitQuiz}
                  />
                </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          //not done quiz yet
          <div>
            <QuizArea
              handler={this.handleClick} // for next button
              qNum={this.state.current}
              qTotal={this.state.numQs}
              question={this.state.dataSet[this.state.current]}
              // takeQuiz={this}
              title={this.state.title}
            />
          </div>
        )}
      </div>
    );
  }
}

export default TakeQuiz;
