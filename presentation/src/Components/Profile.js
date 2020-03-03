import React from "react";
import Button from "./Button";
import ProfileStats from "./ProfileStats";

import profilePic from "../Images/groot.jpg";

import SchoolIcon from "@material-ui/icons/School";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EditIcon from '@material-ui/icons/Edit';

import { Link } from "react-router-dom";

import "../Styles/profile.css"; //TODO

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "userId",
      sessId: "sessId",
      userType: "student"
    };
  }

  // fetch user data...

  render = () => {
    return (
      <div className="profile_container">
        <div className="left_profile_container">
          <div className="profile_card">
            <div className="profile_name">Harry Gunther 

            {this.state.userType === "student" && <Link to="/editProfile"><EditIcon/></Link>}</div>
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
                <LocationCityIcon /> Yale University
              </li>

              <li className="profile_list_item">
                {" "}
                <SchoolIcon /> Undergraduate, 4th year
              </li>
              <li className="profile_list_item">
                {" "}
                <LocationOnIcon /> Hartford, Connecticut, United States
              </li>
            </ul>

            <div className="about_me_title">About me</div>
            <div className="about_me">
              Law school undergraduate looking to apply knowledge of laws, legal
              codes, and court proceedings and precedents to an attorney
              position.
            </div>
            <div className="about_me">
              Four-time 4A State Police Debate State Champion.
            </div>
          </div>
          <div className="similar_card">
            <div className="subtitle">Similar Candidates </div>

            <div className="row">
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
