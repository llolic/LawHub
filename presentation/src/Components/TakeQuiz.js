import React from "react";
import Button from "./Button";
import QuizArea from "./QuizArea";

import "./studentregistration.css";

/**
 * Student Registration card for the student user.
 * Includes logic to send/receive requests to the flask server
 */

//https://codepen.io/Daanist/pen/LjLoWV

class TakeQuiz extends React.Component {
  constructor(props) {
    super(props);

    var response = { // TODO: get from backend
        quizId: 0,
        numQs: 9, // length(questions)-1
        author: 69,
        title: "Test Quiz",
        questions: 
                [
                    {
                        questionId: 0,
                        questionType: 0, // 0 MC, 1 long answer TODO: string
                        question: "What is 8 x 1?",
                        answers: ["1","8","16","9"],
                        correct: 1
                    },
                    
                
                    {
                        questionId: 1,
                        questionType: 0,
                        question: "Who is Steve Jobs?",
                        answers: ["CEO of Microsoft","Barber in NY","Movie Star","CEO of Apple"],
                        correct: 3
                    },

                    {
                        questionId: 2,
                        questionType: 0,
                        question: "Metallica is a ____ band",
                        answers: ["Blues","Hard-Rock","Jazz","Metal"],
                        correct: 3
                    },

                    {
                        questionId: 3,
                        questionType: 0,
                        question: "IS is a ____",
                        answers: ["Word","Band","Terror Group","Brand"],
                        correct: 2
                    },

                    {
                        questionId: 4,
                        questionType: 0,
                        question: "Who was Einstein",
                        answers: ["A Scientist","A Dentist","A Serial Killer","None of the above"],
                        correct: 0
                    },

                    {
                        questionId: 5,
                        questionType: 0,
                        question: "JavaScript can be used in ____ development",
                        answers: ["Back-End","Front-End","ReactJS","All of the Above"],
                        correct: 3
                    },

                    {
                        questionId: 6,
                        questionType: 0,
                        question: "Hitler was a",
                        answers: ["Mass Murderer","Dictator","Jew","None of the above","All of the above"],
                        correct: 4
                    },

                    {
                        questionId: 7,
                        questionType: 0,
                        question: "Korn is a",
                        answers: ["Nu-Metal band","Religion","Singer"],
                        correct: 0
                    },

                    {
                        questionId: 8,
                        questionType: 0,
                        question: "Windows computers are",
                        answers: ["Horrible","Great","Cheap","Invented by Bill Gates"],
                        correct: 3
                    },

                    {
                        questionId: 9,
                        questionType: 0,
                        question: "The BigBan stands in",
                        answers: ["Egypt","London","Amsterdam","NewYork"],
                        correct: 1
                    },

                    /*
                    {
                        questionId: 10,
                        questionType: 1,
                        question: "Who made this quiz"
                    },

                    {
                        questionId: 11,
                        questionType: 1,
                        question: "What is the group name of this project"
                    },

                    {
                        questionId: 12,
                        questionType: 1,
                        question: "What did I have for dinner"
                    }
                    */

                ] // end questions
            } // end response

      this.state = {userId: props.uid, // get from App
                    quizId: response.quizId, 
                    user_answers: [], 
                    curr_answer: "",
                    current:0, 
                    dataSet:response.questions, 
                    numQs:response.numQs,
                    correct:0, 
                    incorrect:0,
                    numMultChoice:0, 
                    done: false,
                    submitted: false,
                    error: false}

      this.handleClick = this.handleClick.bind(this)
    
  }


  addAnswerToList = (choice) => {
    this.setState({curr_answer: choice})
    var pair = {answer: choice, questionId: this.state.dataSet[this.state.current].questionId}
    this.state.user_answers.push(pair) //TODO: user_answers, const

    
    this.setState({current: this.state.current + 1}) 
    this.setState({numMultChoice: this.state.numMultChoice + 1}) // TODO

    
  }

  handleClick = (choice) => { 
      
    if (this.state.dataSet[this.state.current].questionType === 0) { // if we have a quiz
        if (choice === this.state.dataSet[this.state.current].correct) {
            this.setState({correct: this.state.correct + 1})
        } else {
            this.setState({incorrect: this.state.incorrect + 1})
        }
        
        if (this.state.current === this.state.numQs) {
            this.addAnswerToList(choice) //TODO: final add
            this.setState({done: true})
            this.submitQuiz()
        } else {
            //TODO
            this.addAnswerToList(choice)
            
            //this.state.student_answers[this.state.current] = this.state.curr_answer;
            //this.setState({student_answers: [...this.state.student_answers, this.state.curr_answer]}) // TODO: https://stackoverflow.com/questions/26505064/what-is-the-best-way-to-add-a-value-to-an-array-in-state
        }
    } else if (this.state.dataSet[this.state.current].questionType === 1) { //we have an open response

        if (this.state.current === this.state.numQs) {
            this.setState({done: true})
            this.submitQuiz()
        } else {

            var pair = {answer: this.state.curr_answer, questionId: this.state.dataSet[this.state.current].questionId}
            this.state.user_answers.push(pair) 
            this.setState({current: this.state.current + 1, curr_answer: ""}) 
        }
    }

  }



























  submitQuiz = async () => {
    console.log("Attempting to submit quiz results");
    const response = fetch("http://104.196.152.154:5000/api/v1/submitQuiz", {
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
      console.log("Successfully submitted quiz results");
    } else { // TODO: other error cases
      this.setState({ error: true});
      console.log("Failed to submit quiz results");
    }
    console.log(this.state);
  };

  

  render() {

    return (
        <div className="takeQuizContainer">
          <div className="card">
              <div className="centerdiv">
                {this.state.done ? ( // quiz done
                  <div>
                      
                    You got {this.state.correct} questions correct out of {this.state.numMultChoice}
                    { this.state.submitted && <div> Your results have been submitted </div> }
                    { this.state.error === true && 
                        <div className="centerdiv">
                            <div>Your results could not submitted, please try again.</div> 
                            <Button
                                className="btn_blue"
                                text="Submit Results"
                                onClick={this.submitQuiz}
                            />
                        </div> }
                  </div>
                ) : ( //not done quiz yet
                  <div>
                    <QuizArea handler={this.handleClick} question={this.state.dataSet[this.state.current]} takeQuiz={this}/> 
                  </div>
                )}
              </div>

          </div>
          

        </div>

        

      );

    
  };
  
}

export default TakeQuiz;
