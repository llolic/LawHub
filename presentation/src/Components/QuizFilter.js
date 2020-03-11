import React from "react";
import Button from "./Button";
import { filterQuizzes } from "./Requests"; 

import { TextField } from "@material-ui/core";

import "../Styles/quizfilter.css"; 

/**
 * Filter Quizzes card for finding quizzes using our platform
 * Includes logic to send/receive requests to the flask server
 */
class QuizFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      sessId: this.props.sessId,
      quizName: "", 
      author: "",
      tag1: "",
      tag2: "",
      tag3: "",
      //tags: [this.state.tag1, this.state.tag2, this.state.tag3], //TODO: default 3 empty strings, reference others?
      submitted: false,
      error: false,
      quizzes: [
        {quizId: 1, quizName: "Quiz 1", numQuestions: 1},
        {quizId: 2, quizName: "Quiz 2", numQuestions: 2},
        {quizId: 3, quizName: "Quiz 3", numQuestions: 3},
        {quizId: 4, quizName: "Quiz 4", numQuestions: 4},
        {quizId: 5, quizName: "Quiz 5", numQuestions: 5}
      ] //TODO: hard coded
    };
  }

  //https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
  createTable = () => {

    let table = [];

    let header = [];
    header.push(<tr><th>Quiz ID</th><th>Quiz Name</th><th>Number of Questions</th></tr>)

    table.push(header)

    for (let i=0; i<this.state.quizzes.length; i++) {

      let children = []
  
      //note: {i}, not ${i} since $ is for string
      children.push(<td>{this.state.quizzes[i].quizId}</td>)
      children.push(<td>{this.state.quizzes[i].quizName}</td>)
      children.push(<td>{this.state.quizzes[i].numQuestions}</td>)
      
      table.push(<tr>{children}</tr>)

    }

    return table;

  }


  submitQuizFilters = async () => {
    filterQuizzes(this.state).then(result => {
      if (result === false) {
        this.setState({ error: true });
        
        return
      }
      this.setState({ submitted: true }); // change this later
    })
  };

  render = () => {
    return (
      <div className="quizfilter_container">
        <div className="card">
          <div className="subtitle"> Enter filters below to narrow your search for quizzes: </div>

          <TextField
            id="quizName"
            label="Quiz Name"
            value={this.state.quizName}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ quizName: e.target.value })}
            multiline
          />

          <TextField
            id="author"
            label="Quiz Author"
            value={this.state.author}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ author: e.target.value })}
            multiline
          />

          <TextField
            id="tag1"
            label="Quiz Tag 1"
            value={this.state.tag1}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ tag1: e.target.value })}
            multiline
          />

          <TextField
            id="tag2"
            label="Quiz Tag 2"
            value={this.state.tag2}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ tag2: e.target.value })}
            multiline
          />

          <TextField
            id="tag3"
            label="Quiz Tag 3"
            value={this.state.tag1}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ tag3: e.target.value })}
            multiline
          />

          <div className="centerdiv">
            <Button
              className="btn_blue"
              text="Filter Quizzes"
              onClick={this.submitQuizFilters}
            />
          </div>

          <div className="centerdiv">
              <table id="quizzes">
                  {this.createTable()}
              </table>
          </div>

        </div>
      </div>
    );
  };
}

export default QuizFilter;



