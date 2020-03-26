import React from "react";
import Button from "./Navigation/Button";
import { getSuggestedPostings, getUserInfo } from "../Util/Requests";
import FilterRow from "./Stats/FilterRow";

import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import "../Styles/suggestpostings.css";

class SuggestPostings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      sessId: this.props.sessId,
      stateOrProvince: "Toronto",
      postings: [],
      /*,
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
      ]*/
      submitted: false,
      error: false
    };
  }

  
  componentWillMount() {
    this.loadStateOrProvince();
    //this.loadPostings();
    console.log(this.state);
  }  
  

  //https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
  createTable = () => {
    /*
    if (this.state.submitted === false) {
      this.loadStateOrProvince();
      this.loadPostings();
      this.setState({ submitted: true });
    }
    */
    let table = [];

    let header = [];
    header.push(
      <tr>
        <th>Posting ID</th>
        <th>Title</th>
        <th>Description</th>
        <th>Recruiter Name</th>
        <th>Quiz Names</th>
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

  renderFilters = () => {
    let rows = [];
    if (this.state.postings.length === 0) {
      return (
        <div>
          There seems to be no postings near you.
        </div>
      )
    }

    for (let i = 0; i < this.state.postings.length; i++) {
      rows.push(
        <FilterRow
          className={`history_row_${i % 2}`}
          title={this.state.postings[i].title}
          description={this.state.postings[i].description}
          recruiterName={this.state.postings[i].recruiterName}
          quizzes={this.state.postings[i].quizzes}
          key={i}
        />
      );
    }
    return rows;
  };


  loadStateOrProvince = async () => {
    getUserInfo(this.state.uid).then(result => {
      if (result === false) {
        this.setState({ error: true });
        return;
      }
      //this.setState({ submitted: true }); // change this later
      console.log(result);
      this.setState({ stateOrProvince: result.stateOrProvince });
      getSuggestedPostings(result.stateOrProvince).then(result => {
        if (result === false) {
          this.setState({ error: true });
          return;
        }
        //this.setState({ submitted: true }); // change this later
        console.log(result);
        this.setState({ postings: result.postings });
      });
      
    });
  };

  render = () => {
    return (
      <div className="suggestpostings_container">
        {/* <div className="card"> */}
          <div className="subtitle">
            {" "}
            POSTING SUGGESTIONS{" "}
          </div>

          <div className="">These are based on postings near {this.state.stateOrProvince}</div>

          <div className="centerdiv">
            {/* <table id="postings"> */}
            {/* {this.createTable()}</table> */}

            <Grid container spacing={0}>
          <Grid container item xs={12} spacing={0} className="grid_header">
            <Grid item xs={3}>
              <div className="center">Posting Title</div>
            </Grid>
            <Grid item xs={3}>
              <div className="center">Posting Description</div>
            </Grid>
            <Grid item xs={3}>
              <div className="center">Recruiter Name</div>
            </Grid>
            <Grid item xs={3}>
              <div className="center">Quizzes</div>
            </Grid>
          </Grid>
          {this.renderFilters()}
        </Grid>
          </div>
        {/* </div> */}
      </div>
    );
  };
}

export default SuggestPostings;