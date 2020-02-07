import React from 'react';
import Navbar from './Components/Navbar';
import StudentRegistration from './Components/StudentRegistration';

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

          <Route path="/leaderboard">
            {/* leaderboard here */}
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

          <Route path="/">
            {/* homepage here */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;