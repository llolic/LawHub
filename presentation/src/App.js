import React from "react";
import Navbar from "./Components/Navigation/Navbar";
import Footer from "./Components/Navigation/Footer";
import Registration from "./Components/Registration";
import TakeQuiz from "./Components/TakeQuiz";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import Mock from "./Components/Mock";
import Explore from "./Components/Explore";
import QuizCreation from "./Components/QuizCreation";
import StudentFilter from "./Components/StudentFilter";
import EditProfile from "./Components/EditProfile";
import QuizFilter from "./Components/QuizFilter";
import EditRecruiterProfile from "./Components/EditRecruiterProfile";
import Profile from "./Components/Profile";
import RecruiterProfile from "./Components/RecruiterProfile";
import Leaderboard from "./Components/Leaderboard";
import QuizLeaderboard from "./Components/QuizLeaderboard";
import CreatePosting from "./Components/CreatePosting";
import SuggestPostings from "./Components/SuggestPostings";

import { isAuthenticated } from "./Util/Auth";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      sessId: null,
      uid: null,
      profileUid: null,
      profileType: "recruiter",
      quizId: null, // 17
      userType: "recruiter" //testing
    };
  }

  updateNavbar = (sessId, uid, role) => {
    console.log("login successful", sessId, uid, role);
    this.setState({
      loggedIn: isAuthenticated(),
      sessId: sessId,
      uid: uid,
      userType: role
    }); // replace this?
    console.log(this.state);
  };

  updateQuizId = quizId => {
    this.setState({ quizId: quizId });
  };

  updateProfileUid = (profileUid, profileType) => {
    this.setState({ profileUid: profileUid, profileType: profileType });
  };

  // need to update navbar after being unauthenticated
  // Needs to refresh page?
  // need to scroll to top on redirect?

  render = () => {
    return (
      <div className="container">
        <Router>
          <Navbar
            loggedIn={this.state.loggedIn}
            updateNavbar={this.updateNavbar}
            updateProfileUid={this.updateProfileUid}
            userType={this.state.userType}
          />
          <Switch>
            <Route path="/login">
              <Login updateNavbar={this.updateNavbar} />
            </Route>

            <Route path="/dashboard">
              {this.state.loggedIn && this.state.userType === "student" ? (
                <SuggestPostings
                  sessId={this.state.sessId}
                  uid={this.state.uid}
                  updateQuizId={this.updateQuizId}
                  updateProfileUid={this.updateProfileUid}
                />
              ) : (
                <Redirect to="/" />
              )}

              {/* dashboard (home after login) here */}
            </Route>

            <Route path="/leaderboard">
              <Leaderboard sessId={this.state.sessId} uid={this.state.uid} />
            </Route>

            <Route path="/search">{/* search results here */}</Route>

            <Route path="/mock">
              <Mock
                sessId={this.state.sessId}
                uid={this.state.uid}
                userType={this.state.userType}
                updateQuizId={this.updateQuizId}
              />
            </Route>

            <Route path="/takeQuiz">
              <TakeQuiz
                sessId={this.state.sessId}
                uid={this.state.uid}
                quizId={this.state.quizId}
              />
            </Route>

            <Route path="/quizLeaderboard">
              <QuizLeaderboard quizId={this.state.quizId} />
            </Route>

            <Route path="/quizCreation">
              <QuizCreation sessId={this.state.sessId} uid={this.state.uid} />
            </Route>

            <Route path="/explore">
              <Explore
                sessId={this.state.sessId}
                uid={this.state.uid}
                userType={this.state.userType}
                updateQuizId={this.updateQuizId}
                updateProfileUid={this.updateProfileUid}
              />
            </Route>

            <Route path="/register">
              <Registration type="student" />
            </Route>

            <Route path="/registerRecruiter">
              <Registration type="recruiter" />
            </Route>

            <Route path="/studentFilter">
              <StudentFilter sessId={this.state.sessId} uid={this.state.uid} />
            </Route>

            <Route path="/quizFilter">
              <QuizFilter sessId={this.state.sessId} uid={this.state.uid} />
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

            <Route path="/editRecruiterProfile">
              <EditRecruiterProfile
                uid={this.state.uid}
                userType={this.state.userType}
              />
            </Route>

            <Route path="/editProfile">
              <EditProfile
                uid={this.state.uid}
                userType={this.state.userType}
              />
            </Route>

            {this.state.profileType === "recruiter" ? (
              <Route path="/profile">
                <RecruiterProfile
                  sessId={this.state.sessId}
                  uid={this.state.uid}
                  updateQuizId={this.updateQuizId}
                  profileUid={this.state.profileUid}
                  // profileUid={this.state.uid}
                />
              </Route>
            ) : (
              <Route path="/profile">
                <Profile
                  sessId={this.state.sessId}
                  uid={this.state.uid}
                  updateQuizId={this.updateQuizId}
                  // profileUid={this.state.uid}
                  profileUid={this.state.profileUid}
                />
              </Route>
            )}

            <Route path="/createPosting">
              <CreatePosting sessId={this.state.sessId} uid={this.state.uid} />
            </Route>

            <Route path="/suggestPostings">
              <SuggestPostings
                sessId={this.state.sessId}
                uid={this.state.uid}
              />
            </Route>

            <Route path="/">
              {/* <HomePage loggedIn={this.state.loggedIn} /> */}
              {this.state.loggedIn && this.state.userType === "student" ? (
                <Redirect to="/dashboard" />
              ) : (
                <HomePage
                  loggedIn={this.state.loggedIn}
                  userType={this.state.userType}
                />
              )}
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
