import React from "react";
import "../../Styles/button.css";

/**
 * This is a functional component, it shouldn't need a state
 * All this component should do is render itself based on the props
 * @param {*} props
 */
const Button = props => {
  return (
    <div>
      <button
        className={props.className}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.text}
      </button>
    </div>
  );
};

export default Button;
