import React from "react";
import Button from "./Button";
import ProfileStats from "./ProfileStats";

import { fetchProfile } from "../Util/Requests";

import profilePic from "../Images/groot.jpg";

// import { harry } from "../Constants/profile";

import SchoolIcon from "@material-ui/icons/School";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EditIcon from "@material-ui/icons/Edit";

import { Link } from "react-router-dom";

import "../Styles/profile.css"; //TODO

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "userId",
      sessId: "sessId",
      userType: "student",
      profileId: "userId"
    };
  }

  // fetch user data...
  componentWillMount() {
    // fetchProfile(this.state.sessId, this.state.userId).then(result => {
      // console.log(result);
      // this.setState({
      //   firstName: result.firstName,
      //   lastName: result.lastName,
      //   studyLevel: result.studyLevel,
      //   school: result.school,
      //   bio: result.bio,
      //   city: result.city,
      //   stateOrProvince: result.stateOrProvince,
      //   country: result.country
      // });
      this.setState({
        firstName: "Harry",
        lastName: "Gunther",
        studyLevel: "Undergraduate, 4th year",
        school: "Yale University",
        bio: "Law school undergraduate looking to apply knowledge of laws, legal codes, and court proceedings and precedents to an attorney position.",
        city: "Hartford",
        stateOrProvince: "Connecticut",
        country: "United States"
      });
    // });
  }

  render = () => {
    return (
      <div className="profile_container">
        <div className="left_profile_container">
          <div className="profile_card">
            <div className="profile_name">
              {`${this.state.firstName} ${this.state.lastName}`}
              {this.state.userType === "student" && (
                <Link to="/editProfile">
                  {this.state.userId === this.state.profileId && <EditIcon />}
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
                <LocationCityIcon /> {`${this.state.school}`}
              </li>

              <li className="profile_list_item">
                {" "}
                <SchoolIcon /> {`${this.state.studyLevel}`}
              </li>
              <li className="profile_list_item">
                {" "}
                <LocationOnIcon />{" "}
                {`${this.state.city}, ${this.state.stateOrProvince}, ${this.state.country}`}
              </li>
            </ul>

            <div className="about_me_title">About me</div>
            <div className="about_me">{`${this.state.bio}`}</div>
          </div>
          <div className="similar_card">
            <div className="subtitle">Similar Candidates </div>

            <div className="row">
              {/* THIS DOESN'T SCROLL TO TOP */}
              <Link to="/">
                <div className="candidate">
                  <img
                    src={profilePic}
                    alt="your pic here"
                    className="similar_icon"
                  />
                  <Button className="btn_small_blk" text="Barry Gunther" />
                </div>
              </Link>
              <div className="candidate">
                <img
                  src={profilePic}
                  alt="your pic here"
                  className="similar_icon"
                />
                Barry Gunther
              </div>
              <div className="candidate">
                <img
                  src={profilePic}
                  alt="your pic here"
                  className="similar_icon"
                />
                Barry Gunther
              </div>
            </div>
          </div>
        </div>

        <div className="right_profile_container">
          <ProfileStats />
        </div>
      </div>
    );
  };
}

export default Profile;
