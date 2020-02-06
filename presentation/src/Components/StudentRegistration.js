import React from 'react';
import Button from './Button';
import InputField from './InputField';

import '../index.css';

class StudentRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverIndex: -1
        }
    }

    render = () => {
        return (
            <div className="registration_container">
                <div className="card">
                    <div className="subtitle">
                        LawHub Account Registration
                    </div>

                    <InputField/>

                    <Button className="btn_blue" text="Submit"/>
                </div>
            </div>
        );
    }


}

export default StudentRegistration;