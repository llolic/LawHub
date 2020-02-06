import React from 'react';
import Navbar from './Components/Navbar';
import StudentRegistration from './Components/StudentRegistration';

function App() {
  return (
    <div>
      <Navbar
        loggedIn = {false}
      />
      <StudentRegistration/>
    </div>
  );
}

export default App;
