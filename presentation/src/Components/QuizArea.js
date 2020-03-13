import React from "react";
import Button from "./Button";
import AnswerList from "./AnswerList";
import Question from "./Question";

import LinearProgress from "@material-ui/core/LinearProgress";
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Timer from "react-compound-timer";

//import { Redirect } from "react-router-dom";

import "../Styles/registration.css";

/**
 * Student Registration card for the student user.
 * Includes logic to send/receive requests to the flask server
 */

//https://codepen.io/Daanist/pen/LjLoWV

class QuizArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAns: -1,
      completed: 0,
      time: 0
    };
  }

  // calls parent handler to store answer
  // resets the quiz area answers to not have anything selected
  resetState = () => {
    this.props.handler(this.state.selectedAns);
    this.setState({ selectedAns: -1, completed: this.state.completed + 1 });
  };

  updateAns = ans => {
    this.setState({ selectedAns: ans });
    console.log(this.state.selectedAns);
  };

  render = () => {
    return (
      <div>
        {this.props.question.questionType === 0 ? ( // multiple choice question TODO: string 0
          <div className="takeQuizContainer">
            <Grid container spacing={1}>
              <Grid item xs={12} className="question_title">
                <div className="quiz_title_row">
                  <div className="takequiz_title">{this.props.title}</div>

                  <div className="timer">
                    <Timer>
                      <Timer.Hours
                        formatValue={value =>
                          `${value < 10 ? `0${value}` : value} : `
                        }
                      />
                      <Timer.Minutes
                        formatValue={value =>
                          `${value < 10 ? `0${value}` : value} : `
                        }
                      />
                      <Timer.Seconds
                        formatValue={value =>
                          `${value < 10 ? `0${value}` : value}`
                        }
                      />
                    </Timer>
                  </div>
                </div>

                <LinearProgress
                  variant="determinate"
                  value={(this.state.completed / (this.props.qTotal + 1)) * 100}
                />
              </Grid>
              <Question
                question={this.props.question}
                qNum={this.props.qNum}
                title={this.props.title}
              />
              <AnswerList
                question={this.props.question}
                handler={this.updateAns}
                selected={this.state.selectedAns}
              />
              <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <Button
                className="btn_blue"
                text={this.props.qNum === this.props.qTotal ? "SUBMIT" : "NEXT"}
                onClick={this.resetState}
                style={{textAlign: "right"}}
              />

            </div>
               
  
            </Grid>
          </div>
        ) : (
          // open response question
          // probably really broken
          <div>
            <Question
              question={this.props.question}
              qNum={this.props.qNum}
              title={this.props.title}
            />
            <TextField
              id="answer"
              label="Answer"
              margin="normal"
              fullWidth
              variant="outlined"
              //onChange={e => props.takeQuiz.setState({curr_answer: e.target.value})} // TODO: TakeQuiz.
            />
            <Button
              className="btn_blue"
              text="Submit Answer"
              onClick={() => this.props.handler(this.state.selectedAns)} // TODO: TakeQuiz.
            />
          </div>
        ) // end open response question
        }
      </div>
    );
  };
} // end class

export default QuizArea;
