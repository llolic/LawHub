import React from "react";
import Button from "./Button";

import profilePic from "../Images/groot.jpg";

import { TextField, MenuItem } from "@material-ui/core";

import "../Styles/profile.css"; //TODO

/**
 * Student Profile card for the student profile customization.
 * Includes logic to send/receive requests to the flask server
 */
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "userId",
      sessId: "sessId",
      userType: "student",
    };
  }

// fetch user data...   

  render = () => {
    return (
      <div className="profile_container">
        <div className="left_profile_container">
          <div className="profile_card">
            <div className="subtitle">Harry Gunther </div>
            <div className = "center">
                <img src={profilePic} alt="your pic here" style={{ width: "150px", height: "150px" }} />
                
            </div>
            {/* school, city, etc */}
          </div>
          <div className="similar_card"></div>
        </div>

        <div className="right_profile_container">
          <div className="profile_stats"></div>
        </div>
      </div>
    );
  };
}

export default Profile;
