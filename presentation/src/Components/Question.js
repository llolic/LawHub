import React from "react";

import "./studentregistration.css";

/**
 * Student Registration card for the student user.
 * Includes logic to send/receive requests to the flask server
 */

//https://codepen.io/Daanist/pen/LjLoWV

class Question extends React.Component{
  render = () => {
    var style = {
      color: "red",
    }
    return (
      <h1 style={style}>{this.props.question.question}</h1>
    )
  }
}
export default Question;