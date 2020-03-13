import React from "react";
import Button from "./Button";
import { submitNewQuiz } from "./Requests";
import { fetchQuizQuestions } from "./Requests";

import {
  TextField,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

import "../Styles/quizcreation.css";
import "../Styles/registration.css";

class QuizCreation extends React.Component {
  constructor(props) {
    super(props); // sessId and uid are in props
    this.state = {
      title: "",
      author: this.props.uid,
      sessId: this.props.sessId,
      tags: "", // backend parses this by splitting commas
      numQuestions: 3,
      questions: [
        {
          questionType: "",
          question: "",
          answers: ["", "", "", ""],
          correct: 0,
          questionId: -1
        },
        {
          questionType: "",
          question: "",
          answers: ["", "", "", ""],
          correct: 0,
          questionId: -1
        },
        {
          questionType: "",
          question: "",
          answers: ["", "", "", ""],
          correct: 0,
          questionId: -1
        }
      ],
      submitted: 0,
      missingFields: false,
      authorized: true,
      response: []
      // sessId
    };
  }

  // instantiates questions at the beginning
  // componentWillMount() {
  //   this.setNumQuestions(this.state.numQuestions);
  // }

  // Alfonso added============================================================================================================
  getQuizQuestions = () => {
    fetchQuizQuestions(this.state).then(result => {
      if (result !== -1) {
        this.setState({ response: result.questions });
      } else {
        this.setState({ response: [] });
      }
    });

    // TODO: currently hard coded
    var temp = [
      {
        questionId: 1,
        question: "Is Coronavirus overhyped?",
        questionType: 0,
        option1: "Yes",
        option2: "No",
        option3: "Maybe",
        option4: "Helo",
        correctAnswer: 3
      },
      {
        questionId: 2,
        question: "Is this question useful?",
        questionType: 0,
        option1: "Yes",
        option2: "No",
        option3: "Maybe",
        option4: "Helo",
        correctAnswer: 1
      },
      {
        questionId: 3,
        question: "Who is my fav prof?",
        questionType: 0,
        option1: "Ilir",
        option2: "Arnold",
        option3: "Michael",
        option4: "All of the above",
        correctAnswer: 3
      }
    ];
    this.setState({ response: temp });
  };

  getQuestionDisplay = i => {
    let display = [];
    if (this.state.questions[i].questionType === "") {
      display.push(<div></div>);
      return display;
    }
    if (this.state.questions[i].questionType !== "2") {
      //string 2
      display.push(
        <div>
          <TextField
            id="correctAns"
            label={`Correct Answer for Question ${i + 1}`}
            margin="normal"
            fullWidth
            multiline
            variant="outlined"
            onChange={e => this.updateQAns(e.target.value, 0, i)}
          />

          <TextField
            id="wrongans"
            label={`Wrong answer 1 for Question ${i + 1}`}
            margin="normal"
            fullWidth
            multiline
            variant="outlined"
            onChange={e => this.updateQAns(e.target.value, 1, i)}
          />

          <TextField
            id="wrongans"
            label={`Wrong answer 2 for Question ${i + 1}`}
            margin="normal"
            fullWidth
            multiline
            variant="outlined"
            onChange={e => this.updateQAns(e.target.value, 2, i)}
          />

          <TextField
            id="wrongans"
            label={`Wrong answer 3 for Question ${i + 1}`}
            margin="normal"
            fullWidth
            multiline
            variant="outlined"
            helperText="These answers will be randomized when published!"
            onChange={e => this.updateQAns(e.target.value, 3, i)}
          />
        </div>
      );
      return display;
    } else {
      for (let j = 0; j < this.state.response.length; j++) {
        var options = [
          this.state.response[j].option1,
          this.state.response[j].option2,
          this.state.response[j].option3,
          this.state.response[j].option4
        ];
        display.push(
          <div>
            Question {j + 1}: {this.state.response[j].question}
            <br></br>
            Answer {j + 1}: {options[this.state.response[j].correctAnswer]}
            <Button 
              text="Use this question"
              onClick={e => this.usePremadeQuestion(i, this.state.response[j].questionId)} //TODO: update backend to expect incoming quesitonId
            />
          </div>
        );
        if (this.state.questions[i].questionId === this.state.response[j].questionId) { // user has selected this question
          display.push(
            <div>
              Question selected
              <hr></hr>
            </div>
          ) 
        } else {
          display.push(
            <div>
              <hr></hr>
            </div>
          )
        }

      }
      return display;
    }

  };

  usePremadeQuestion = (questionNum, questionId) => {
    var temp = this.state.questions;
    temp[questionNum].questionId = questionId;
    this.setState({ questions: temp });
    //alert("Your request has been saved");
    console.log(this.state);
  }


  // updates the question type in the questions array at index qIndex
  updateQType = (type, qIndex) => {
    /*
    var qs = this.state.questions;
    qs[qIndex].questionType = type;
    */
    this.getQuizQuestions();
    var temp = this.state.questions;
    temp[qIndex].questionType = type;
    this.setState({ questions: temp });
  };

  // end Alfonso added==============================================================================================================

  handleSubmit = () => {
    if (!this.fieldsFilled()) {
      this.setState({ missingFields: true });
      return;
    }
    this.setState({ missingFields: false });
    submitNewQuiz(this.state).then(result => {
      if (result === true) {
        this.setState({ submitted: 1 });
      } else {
        this.setState({ submitted: -1 });
      }
    });
  };

  // updates numQuestions to be n
  // updates questions array to have n question objects
  setNumQuestions = n => {
    var qs = this.state.questions;
    if (qs.length > n) {
      for (let i = 0; i < qs.length - n; i++) {
        qs.pop();
      }
    } else if (qs.length < n) {
      for (let i = 0; i <= n - qs.length; i++) {
        qs.push({
          questionType: "",
          question: "",
          answers: ["", "", "", ""],
          correct: 0
        });
      }
    }
    this.setState({ numQuestions: n });
  };

  fieldsFilled = () => {
    var qs = this.state.questions;
    if (this.state.title === "" || this.state.tags === "") {
      return false;
    }
    for (let i = 0; i < this.state.numQuestions; i++) {
      if (qs[i].questionType === "" || qs[i].question === "") {
        return false;
      }
      for (let j = 0; j < 4; j++) {
        if (qs[i].answers[j] === "") {
          return false;
        }
      }
    }
    return true;
  };

  // updates the question in the questions array at index qIndex
  updateQuestion = (question, qIndex) => {
    var qs = this.state.questions;
    qs[qIndex].question = question;
  };

  // updates the answers in the questions array at index qIndex
  // ansIndex 0 is the correct answer
  updateQAns = (answer, ansIndex, qIndex) => {
    var qs = this.state.questions;
    qs[qIndex].answers[ansIndex] = answer;
  };

  // loops thru number of questions and generates all fields
  getQuestionFields = () => {
    let fields = [];

    for (let i = 0; i < this.state.numQuestions; i++) {
      fields.push(
        <div key={i} className="question_card">
          <TextField
            id="q1"
            label={`Question ${i + 1}`}
            margin="normal"
            fullWidth
            multiline
            variant="outlined"
            onChange={e => this.updateQuestion(e.target.value, i)}
          />

          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Question Type</FormLabel>
            <RadioGroup
              // defaultValue="Multiple Choice"
              aria-label="questionType"
              name="qType"
              onChange={e => this.updateQType(e.target.value, i)}
            >
              <FormControlLabel
                value="0"
                control={<Radio style={{ color: "#E49C2F" }} />}
                label="Multiple Choice"
              />
              <FormControlLabel
                value="1"
                control={<Radio style={{ color: "#E49C2F" }} />}
                label="Long Answer"
                disabled
              />
              <FormControlLabel
                value="2"
                control={<Radio style={{ color: "#E49C2F" }} />}
                label="Pre-made Question"
              />
            </RadioGroup>
          </FormControl>

          {this.getQuestionDisplay(i)}
        </div>
      );
    }
    return fields;
  };

  render = () => {
    if (this.state.submitted === 1) {
      return <Redirect push to="/mock" />;
    }

    if (this.state.authorized === false) {
      return <Redirect push to="/login" />;
    }

    return (
      <div className="registration_container">
        <div className="card">
          <div className="subtitle">Quiz Creation</div>

          <TextField
            id="title"
            label="Title"
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ title: e.target.value })}
          />

          <div className="row" style={{ paddingBottom: "1em" }}>
            <div className="width-70">
              <TextField
                id="tags"
                label="Tags"
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Separate using commas"
                onChange={e => this.setState({ tags: e.target.value })}
              />
            </div>
            <div className="width-30">
              <TextField
                id="qNumber"
                margin="normal"
                label="Number of Questions"
                type="number"
                value={this.state.numQuestions}
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                error={this.state.numQuestions < 3}
                onChange={e => this.setNumQuestions(parseInt(e.target.value))}
              />
            </div>
          </div>

          {this.getQuestionFields()}

          {this.state.missingFields ? (
            <div style={{ color: "red" }}> Please fill in all the fields. </div>
          ) : (
            <div></div>
          )}

          {this.state.submitted === -1 ? (
            <div style={{ color: "red" }}>
              An error has occurred, please try again.
            </div>
          ) : (
            <div></div>
          )}

          <div className="centerdiv">
            <Button
              className="btn_blue"
              text="SUBMIT"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default QuizCreation;
