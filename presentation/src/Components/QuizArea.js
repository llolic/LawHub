import React from "react";
import Button from "./Button";
import AnswerList from "./AnswerList";
import Question from "./Question";

import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
//import { Redirect } from "react-router-dom";

import "./studentregistration.css";

/**
 * Student Registration card for the student user.
 * Includes logic to send/receive requests to the flask server
 */

//https://codepen.io/Daanist/pen/LjLoWV

class QuizArea extends React.Component {
  render = () => {
    return (
      <div>
        {this.props.question.questionType === "0" ? ( // multiple choice question TODO: string 0
          <div className="takeQuizContainer">
            <Grid container spacing={1}>
              <Question question={this.props.question} qNum={this.props.qNum} />
              <AnswerList
                question={this.props.question}
                handler={this.props.handler}
              />
            </Grid>
          </div>
        ) : (
          // open response question
          <div>
            <Question question={this.props.question} />
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
              onClick={this.props.takeQuiz.handleClick} // TODO: TakeQuiz.
            />
          </div>
        ) // end open response question
        }
      </div>
    );
  };
} // end class

export default QuizArea;
