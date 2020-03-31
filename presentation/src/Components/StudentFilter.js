import React from "react";
import Button from "./Navigation/Button";
import {
  schools,
  studyLevels,
  countries,
  stateprovinces
} from "../Constants/registration";
import { filterStudents } from "../Util/Requests"; 

import { TextField, MenuItem } from "@material-ui/core";

import "../Styles/studentfilter.css"; //TODO

/**
 * Filter Students card for finding students using our platform
 * Includes logic to send/receive requests to the flask server
 */
class StudentFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      sessId: this.props.sessId,
      studyLevel: "",
      school: "",
      country: "",
      // state: "",
      city: "a",
      stateOrProvince: "Virginia",
      submitted: false,
      error: false,
      students: [
        // {uid: 1, studentName: "Alfonso Dela Cruz"},
        // {uid: 2, studentName: "Ahmad Al-Taha"},
        // {uid: 3, studentName: "Lazar Lolic"},
        // {uid: 4, studentName: "Shahmeer Shahid"},
        // {uid: 5, studentName: "Michelle Luo"}
      ] //TODO: hard coded
    };
  }

  //https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
  createTable = () => {

    let table = [];

    let header = [];
    header.push(<tr><th>User ID</th><th>Student Name</th></tr>)

    table.push(header)

    for (let i=0; i<this.state.students.length; i++) {

      let children = []
  
      //note: {i}, not ${i} since $ is for string
      children.push(<td>{this.state.students[i].uid}</td>)
      children.push(<td>{this.state.students[i].studentName}</td>)
      
      table.push(<tr>{children}</tr>)

    }

    return table;

  }


  submitStudentFilters = async () => {
    var jsonObj = { studyLevel: this.state.studyLevel, state: this.state.stateOrProvince, school: this.state.school, country: this.state.country}
    console.log(jsonObj);
    filterStudents(jsonObj).then(result => {
      if (result === false) {
        this.setState({ error: true });
        
        return
      }
      this.setState({ submitted: true }); // change this later
      this.setState({ students: result.matches });
    })
  };

  render = () => {
    return (
      <div className="studentfilter_container">
        <div className="card">
          <div className="subtitle"> Select filters below to narrow your search for students: </div>

          <div className="row">
            <div className="width-60">
              <TextField
                id="school"
                select
                margin="normal"
                label="Post-secondary Institution"
                value={this.state.school}
                onChange={e => this.setState({ school: e.target.value })}
                variant="outlined"
                fullWidth
              >
                {schools.map(school => (
                  <MenuItem key={school} value={school}>
                    {school}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="width-40">
              <TextField
                id="studyLevel"
                select
                margin="normal"
                label="Level of Study"
                value={this.state.studylvl}
                onChange={e => this.setState({ studylvl: e.target.value })}
                variant="outlined"
                fullWidth
              >
                {studyLevels.map(option => ( //https://stackoverflow.com/questions/38364400/index-inside-map-function
                  <MenuItem key={option.index} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>

          <div className="row">
            <div className="width-50">
              <TextField
                id="country"
                select
                margin="normal"
                label="Country"
                value={this.state.country}
                onChange={e => this.setState({ country: e.target.value })}
                variant="outlined"
                fullWidth
              >
                {countries.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="width-50">
              <TextField
                id="state-province"
                select
                margin="normal"
                label="State/Province"
                value={this.state.stateOrProvince}
                onChange={e =>
                  this.setState({ stateOrProvince: e.target.value })
                }
                // value={studyLevels[this.state.studyLevel].value}
                // onChange={e => this.setState({ studyLevel: e.target.key })} //e.target.key
                variant="outlined"
                fullWidth
              >
                {/* {studyLevels.map(option => ( //https://stackoverflow.com/questions/38364400/index-inside-map-function
                  <MenuItem key={option.index} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))} */}

                {stateprovinces.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>

          {/* <TextField
            id="city"
            label="City"
            helperText="City"
            value={this.state.city}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ city: e.target.value })}
          /> */}


          <div className="centerdiv">
            <Button
              className="btn_blue"
              text="Filter Students"
              onClick={this.submitStudentFilters}
            />
          </div>

          <div className="centerdiv">
              <table id="students">
                  {this.createTable()}
              </table>
          </div>


        </div>
      </div>
    );
  };
}

export default StudentFilter;
