import React from 'react';
import Navbar from './Components/Navbar';
import StudentRegistration from './Components/StudentRegistration';
import HomePage from './Components/HomePage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar
          loggedIn = {false}
        />
        <Switch>
          <Route path="/login">
            {/* login here */}
          </Route>

          <Route path="/dashboard">
            {/* dashboard (home after login) here */}
          </Route>

          <Route path="/leaderboard">
            {/* leaderboard here */}
          </Route>

          <Route path="/search">
            {/* search results here */}
          </Route>

          <Route path="/mock">
            {/* mock quizzes here, feel free to change this name */}
          </Route>

          <Route path="/explore">
            {/* explore here */}
          </Route>

          <Route path="/register">
            <StudentRegistration/>
          </Route>

          <Route path="/registerRecruiter">
            {/* <RecruiterRegistration/> */}
          </Route>

          <Route path="/successfulRegistration">
            You have registered successfully!
            {/* success registration page here */}
          </Route>

          <Route path="/">
            <HomePage/>
            {/* {loggedIn ? <Redirect to="/dashboard" /> : <Homepage />} */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;