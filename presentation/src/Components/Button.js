import React from 'react';
import '../index.css';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverIndex: -1
        }
    }

    render = () => {
        return (
            <div>
                <button className={this.props.className}>
                    {this.props.text}
                </button>
            </div>
        );
    }


}

export default Button;