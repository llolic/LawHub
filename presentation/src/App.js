import React from 'react';
import Navbar from './Components/Navbar';
import StudentRegistration from './Components/StudentRegistration';
import Login from './Components/Login';
import TakeQuiz from './Components/TakeQuiz';
import StudentProfile from './Components/StudentProfile';
import HomePage from './Components/HomePage';
import Footer from './Components/Footer'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar loggedIn={false} />
        <Switch>
          <Route path="/login">
            <Login/>
            <div style={{ height: '8.3em' }}></div>
          </Route>

          <Route path="/dashboard">
            {/* dashboard (home after login) here */}
            We need to create a dashboard
          </Route>

          <Route path="/leaderboard">{/* leaderboard here */}</Route>

          <Route path="/search">{/* search results here */}</Route>

          <Route path="/mock">
            {/* mock quizzes here, feel free to change this name */}
          </Route>

          <Route path="/explore">{/* explore here */}</Route>

          <Route path="/register">
            <StudentRegistration />
          </Route>

          <Route path="/registerRecruiter">
            {/* <RecruiterRegistration/> */}
          </Route>

          <Route path="/successfulRegistration">
            You have registered successfully!
            {/* success registration page here */}
          </Route>

          <Route path="/successfulLogin">
            Need to link this to the dashboard and set loggedIn to true, and update navbar to have profile
          </Route>

          <Route path="/studentProfile">
            <StudentProfile />
          </Route>

          <Route path="/takeQuiz">
            <TakeQuiz />
          </Route>

          <Route path="/">
            <HomePage />
            {/* {loggedIn ? <Redirect to="/dashboard" /> : <Homepage />} */}
          </Route>
        </Switch>
      </Router>
      <div className="filler">
      </div>
      <Footer/>
    </div>
  );
}

export default App;
