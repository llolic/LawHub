import React from 'react';
import '../index.css';

class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            contents: ""
        }
    }

    render = () => {
        return (
            <div className="form_container">
                <form>
                    First Name
                    <input 
                        className="form_field"
                        type="text"
                        value={this.state.contents}
                        size="40"
                    />
                </form>
            </div>
        );
    }

}

export default InputField;