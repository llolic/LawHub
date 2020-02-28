import React from "react";
import Navbar from "./Components/Navbar";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import Mock from "./Components/Mock";
import QuizCreation from "./Components/QuizCreation";

import { isAuthenticated } from "./Components/Auth";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      loggedIn: false,
      sessId: null,
      uid: null,
      isRecruiter: true // for testing
    };
  }

  updateNavbar = (sessId, uid) => {
    console.log("component updated", sessId, uid);
    this.setState({ loggedIn: isAuthenticated(), sessId: sessId, uid: uid }); // replace this?
  };


  render = () => {
    return (
      <div>
        <Router>
          <Navbar
            loggedIn={this.state.loggedIn}
            updateNavbar={this.updateNavbar}
          />
          <Switch>
            <Route path="/profile">
              {/* profile here, prob need to + userId here */}
            </Route>
            <Route path="/login">

              <Login updateNavbar={this.updateNavbar} />
              <div style={{ height: "8.3em" }}></div>
            </Route>

            <Route path="/dashboard">
              {/* dashboard (home after login) here */}
            </Route>

            <Route path="/leaderboard">{/* leaderboard here */}</Route>

            <Route path="/search">{/* search results here */}</Route>

            <Route path="/mock">

              {/* mock quizzes here, feel free to change this name */}

              <Mock
                isRecruiter={this.state.isRecruiter}
                sessId={this.state.sessId}
                uid={this.state.uid}
              />
            </Route>

            <Route path="/quizCreation">
              <QuizCreation sessId={this.state.sessId} uid={this.state.uid} />

            </Route>

            <Route path="/explore">{/* explore here */}</Route>

            <Route path="/register">
              <Registration type="student" />
            </Route>

            <Route path="/registerRecruiter">

              <Registration type="recuiter" />

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

            <Route path="/">

              <HomePage loggedIn={this.state.loggedIn} />

              {/* {this.state.loggedIn ? <Redirect to="/dashboard" /> : <HomePage />} */}
            </Route>
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  };
}

export default App;
