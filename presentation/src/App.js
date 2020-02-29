import React from "react";
import Navbar from "./Components/Navbar";
import Registration from "./Components/Registration";
import TakeQuiz from "./Components/TakeQuiz";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import Mock from "./Components/Mock";
import QuizCreation from "./Components/QuizCreation";
import StudentProfile from "./Components/StudentProfile";
import EmployerProfile from "./Components/EmployerProfile";

import { isAuthenticated } from "./Components/Auth";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      sessId: null,
      userId: null,
      userType: "recruiter" //testing
    };
  }

  updateNavbar = (sessId, userId) => {
    console.log("component updated", sessId, userId);
    this.setState({ loggedIn: isAuthenticated(), sessId: sessId, userId: userId }); // replace this?
  };

  render = () => {
    return (
      <div className="container">
        <Router>
          <Navbar
            loggedIn={this.state.loggedIn}
            updateNavbar={this.updateNavbar}
            isRecruiter={this.state.isRecruiter}
          />
          <Switch>
            <Route path="/login">
              <Login updateNavbar={this.updateNavbar} />
              {/* <div style={{ height: "8.3em" }}></div> */}
            </Route>

            <Route path="/dashboard">
              {/* dashboard (home after login) here */}
            </Route>

            <Route path="/leaderboard">{/* leaderboard here */}</Route>

            <Route path="/search">{/* search results here */}</Route>

            <Route path="/mock">
              <Mock
                // isRecruiter={this.state.isRecruiter}
                sessId={this.state.sessId}
                uid={this.state.uid}
                userType={this.state.userType}
              />
            </Route>

            <Route path="/takeQuiz">
              <TakeQuiz />
            </Route>

            <Route path="/quizCreation">
              <QuizCreation sessId={this.state.sessId} uid={this.state.uid} />
            </Route>

            <Route path="/explore">{/* explore here */}</Route>

            <Route path="/register">
              <Registration type="student" />
            </Route>

            <Route path="/registerRecruiter">
              <Registration type="recruiter" />
            </Route>

            <Route path="/successfulRegistration">
              <div className="filler">
                <div className="centerdiv">
                  <div className="subtitle">
                    You have registered successfully!
                  </div>
                </div>
              </div>
            </Route>

            <Route path="/employerProfile">
              <EmployerProfile />
            </Route>

            <Route path="/studentProfile">
              <StudentProfile />
            </Route>

            <Route path="/">
              <HomePage loggedIn={this.state.loggedIn} />
              {/* {this.state.loggedIn ? <Redirect to="/dashboard" /> : <HomePage />} */}
            </Route>
          </Switch>
        </Router>
        <div className="filler"></div>

        <Footer />
      </div>
    );
  };
}

export default App;
