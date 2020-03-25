import React from "react";
import ProfilePostings from "./Postings/ProfilePostings";

import { getRecruiterPostings } from "../Util/Requests";

import profilePic from "../Images/jessica.png";

import WorkIcon from "@material-ui/icons/Work";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EditIcon from "@material-ui/icons/Edit";

import { Link } from "react-router-dom";

import "../Styles/profile.css"; //TODO

class RecruiterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid
      // sessId: "sessId",
      // userType: "student",
      // profileId: "userId"
    };
  }

  // fetch user data...
  componentWillMount() {
    getRecruiterPostings(this.props.uid).then(result => {
      console.log(result);
      this.setState({
        firstName: result.firstName,
        lastName: result.lastName,
        studyLevel: result.studyLevel,
        school: result.school,
        bio: result.bio,
        city: result.city,
        stateOrProvince: result.stateOrProvince,
        country: result.country
      });
    // this.setState({
    //   firstName: "Jessica",
    //   lastName: "Peterson",
    //   companyName: "White & Case",
    //   title: "Senior Lawyer",
    //   bio:
    //     "I am looking to hire a new first year lawyer to help draft documents, read through cases, and assist fellow lawyers this summer.",
    //   stateOrProvince: "New York",
    //   country: "United States"
    // });
    });
  }

  render = () => {
    return (
      <div className="profile_container">
        <div className="left_profile_container">
          <div className="profile_card">
            <div className="profile_name">
              {`${this.state.firstName} ${this.state.lastName}`}
              {this.props.uid === this.props.profileUid && (
                <Link to="/editRecruiterProfile">
                  <EditIcon />
                </Link>
              )}
            </div>
            <div className="center">
              <img
                src={profilePic}
                alt="your pic here"
                className="profile_img"
              />
              {/* <Button text="Edit"/> */}
            </div>

            <ul className="profile_list">
              <li className="profile_list_item">
                <LocationCityIcon /> {`${this.state.companyName}`}
              </li>

              <li className="profile_list_item">
                {" "}
                <WorkIcon /> {`${this.state.title}`}
              </li>
              <li className="profile_list_item">
                {" "}
                <LocationOnIcon />{" "}
                {`${this.state.stateOrProvince}, ${this.state.country}`}
              </li>
            </ul>

            <div className="about_me_title">About me</div>
            <div className="about_me">{`${this.state.bio}`}</div>
          </div>
        </div>

        <div className="right_profile_container">
          <div className="overview_title"> ALL POSTINGS </div>
          <ProfilePostings uid={this.props.uid} />
        </div>
      </div>
    );
  };
}

export default RecruiterProfile;
