import React from 'react';
import '../index.css';

/**
 * This is a functional component, it shouldn't need a state
 * All this component should do is render itself based on the props
 * @param {*} props 
 */
const Button = (props) => {
    return (
        <div>
            <button 
                // For css styles
                className={props.className}
                // This will be a function that is passed in
                onClick={props.onClick} 
                // Can disable buttons if input isn't correct
                disabled={props.disabled}
            >
                {props.text}
            </button>
        </div>
    );
}

export default Button;