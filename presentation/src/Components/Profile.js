import React from "react";
import Button from "./Button";
import ProfileStats from "./ProfileStats";

import profilePic from "../Images/groot.jpg";

import { harry } from "../Constants/profile";

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

  render = () => {
    return (
      <div className="profile_container">
        <div className="left_profile_container">
          <div className="profile_card">
            <div className="profile_name">
              {`${harry.firstName} ${harry.lastName}`}
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
                <LocationCityIcon /> {`${harry.school}`}
              </li>

              <li className="profile_list_item">
                {" "}
                <SchoolIcon /> {`${harry.studyLevel}`}
              </li>
              <li className="profile_list_item">
                {" "}
                <LocationOnIcon />{" "}
                {`${harry.city}, ${harry.stateOrProvince}, ${harry.country}`}
              </li>
            </ul>

            <div className="about_me_title">About me</div>
            <div className="about_me">{`${harry.bio}`}</div>
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
