import React from "react";

import "./studentregistration.css";

/**
 * Student Registration card for the student user.
 * Includes logic to send/receive requests to the flask server
 */

//https://codepen.io/Daanist/pen/LjLoWV

class Answer extends React.Component {
  render = () => {
    var style = {
      width: "100%",
      height: 50,
      color: "blue"
    }
    return(
      <div>
        <button style={style} onClick={() => this.props.handler(this.props.choice)}>{this.props.answer}</button>
      </div>
    )
  }
}
export default Answer;