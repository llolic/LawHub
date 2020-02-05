import React from 'react';
import Header from './Components/Header';
import StudentRegistration from './Components/StudentRegistration';

import './App.css';

function App() {
  return (
    <div>
      <Header
        loggedIn = {false}
      />
      <StudentRegistration/>
    </div>
  );
}

export default App;
