import React from "react";
import Button from "./Navigation/Button";
import { authenticate } from "../Util/Auth";
import { submitLogin } from "../Util/Requests";

import { TextField } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import "../Styles/login.css";
import "../Styles/registration.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginState: 0 // 0 initial, 1 successful login, -1 failed login
    };
  }


  handleSubmit = () => {
    // DEMO 
    // this.setState({ loginState: 1 });
    //     authenticate(123);
    //     this.props.updateNavbar(123, 10); // add recruiter/student here
    //     return;
        
    submitLogin(this.state).then(result => {
      if (result !== -1) {
        console.log(result);
        this.setState({ loginState: 1 });
        authenticate(result.sessId);
        this.props.updateNavbar(result.sessId, result.uid, result.role); // add recruiter/student here
      } else {
        this.setState({ loginState: -1 });
      }
    });
  }

  render = () => {
    if (this.state.loginState === 1) {
      return <Redirect push to="/" />;
    }

    return (
      <div className="login_container">
        <div className="card">
          <div className="subtitle">LawHub Account Login</div>


          <TextField
            id="email"
            label="Email"
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => this.setState({ email: e.target.value })}
            error={!this.state.email.includes("@") && this.state.email !== ""}
          />

          <TextField
            id="password"
            label="Password"
            margin="normal"
            fullWidth
            variant="outlined"
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            error={this.state.password.length < 6 && this.state.password !== ""}
          />
          <div className="centerdiv">
            {this.state.loginState === -1 && (
              <div style={{ color: "red" }}>
                Your login credentials could not be verified, please try again.
              </div>
            )}
          </div>
          <div className="centerdiv">
            <Button
              className="btn_blue"
              text="Login"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default Login;
