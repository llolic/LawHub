import React from "react";
//import Button from "./Button";

//import { TextField, MenuItem } from "@material-ui/core";
//import { Redirect } from "react-router-dom";

import "./studentregistration.css";

/**
 * Student Registration card for the student user.
 * Includes logic to send/receive requests to the flask server
 */

//https://codepen.io/Daanist/pen/LjLoWV

function Question(props) {
    var style = {
      color: "red",
    }
    return (
      <h1 style={style}>{props.dataSet.question}</h1>
    )
  }

function Answer(props) {
    var style = {
      width: "100%",
      height: 50,
      color: "blue"
    }
    return(
      <div>
        <button style={style} onClick={() => props.handleClick(props.choice)}>{props.answer}</button>
      </div>
    )
  }

function AnswerList(props) {
    var answers = []
    for (let i = 0; i < props.dataSet.answers.length; i++) {
      answers.push(<Answer choice={i} handleClick={props.handleClick} answer={props.dataSet.answers[i]} />)
    }
    return(
      <div>
        {answers}
      </div>
    )
  }

function QuizArea(props) {
    var style = {
      width: "25%",
      display: "block",
      textAlign: "center",
      boxSizing: "border-box",
      float: "left",
      padding: "0 2em"
    }
    return(
      <div style={style}>
        <Question dataSet={props.dataSet} />
        <AnswerList dataSet={props.dataSet} handleClick={props.handleClick} />
      </div>
    )
  }

class TakeQuiz extends React.Component {
  constructor(props) {
    super(props);

    var numQs = 9
    var dataSet = [
        {
          question: "What is 8 x 1?",
          answers: [
            "1",
            "8",
            "16",
            "9"
          ],
          correct: 1
        },
        {
          question: "Who is Steve Jobs?",
              answers: [
                "CEO of Microsoft",
                "Barber in NY",
                "Movie Star",
                "CEO of Apple"
              ],
              correct: 3
        },
         {
              question: "Metallica is a ____ band",
              answers: [
                "Blues",
                "Hard-Rock",
                "Jazz",
                "Metal"
              ],
              correct: 3
            },
            {
              question: "IS is a ____",
              answers: [
                "Word",
                "Band",
                "Terror Group",
                "Brand"
              ],
              correct: 2
            },
            {
              question: "Who was Einstein",
              answers: [
                "A Scientist",
                "A Dentist",
                "A Serial Killer",
                "None of the above"
              ],
              correct: 0
            },
            {
              question: "JavaScript can be used in ____ development",
              answers: [
                "Back-End",
                "Front-End",
                "ReactJS",
                "All of the Above"
              ],
              correct: 3
            },
            {
              question: "Hitler was a",
              answers: [
                "Mass Murderer",
                "Dictator",
                "Jew",
                "None of the above",
                "All of the above"
              ],
              correct: 4
            },
            {
              question: "Korn is a",
              answers: [
                "Nu-Metal band",
                "Religion",
                "Singer"
              ],
              correct: 0
            },
            {
              question: "Windows computers are",
              answers: [
                "Horrible",
                "Great",
                "Cheap",
                "Invented by Bill Gates"
              ],
              correct: 3
            },
            {
              question: "The BigBan stands in",
              answers: [
                "Egypt",
                "London",
                "Amsterdam",
                "NewYork"
              ],
              correct: 1
            },
      ];

      this.state = {current:0, 
                    dataSet:dataSet, 
                    numQs:numQs,
                    correct:0, 
                    incorrect:0}
      this.handleClick = this.handleClick.bind(this)
    
  }

  handleClick(choice) {
    if (choice === this.state.dataSet[this.state.current].correct) {
      this.setState({correct: this.state.correct + 1})
    } else {
      this.setState({incorrect: this.state.incorrect + 1})
    }
    
    if (this.state.current === this.state.correctnumQs) {
      //TODO: display results and prompt for redirect 
      this.setState({current: 0})
      this.setState({incorrect: 0})
      this.setState({correct: 0})
    } else {
      this.setState({current: this.state.current + 1}) 
    }
  }

  submitStudentProfileUpdates = async () => {
    console.log("Attempting to update profile");
    const response = fetch("http://104.196.152.154:5000/api/v1/update", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
  }).then(result => {
      console.log(result)
  });

    if (response.ok) {
      this.setState({ submitted: true }); // change this later
      console.log("Successfully updated profile");
    } else {
      console.log("Failed to update profile");
    }
    console.log(this.state);
  };


  render() {
    return(
      <div className="takeQuizContainer">
          <div className="card">
            <div>
                <QuizArea handleClick={this.handleClick} dataSet={this.state.dataSet[this.state.current]} />
            </div>
          </div>
      </div>
    );
  };
}




export default TakeQuiz;
