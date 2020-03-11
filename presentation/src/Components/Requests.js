/**
 * Export requests functions here.
 */

const path = "35.227.67.4";

export const filterStudents = async state => {

  return fetch(`http://${path}:5000/api/v1/filterStudents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state)
  }).then(result => {
    if (result.ok) {
      state.students = result.json().matches;
    } else {
      return false;
    }
  });

} ;































export const submitRegistration = async (state, type) => {
  return fetch(`http://${path}:5000/api/v1/register/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state)
  }).then(result => {
    console.log(result);
    return result.ok;
  }, function(error) { // idk if this works
    return false;
  });
};

export const submitLogin = async state => {
  // grab state values here?? send to database
  //const request_body = {email: this.state.email, password: this.state.password}
  console.log("Attempting to login");
  return fetch(`http://${path}:5000/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state)
  }).then(result => {
    if (result.ok) {
      return result.json(); // userId and sessId ??and userType
    }
    return -1;
  });
};

export const submitNewQuiz = async (state, sessId, userId) => {
  var jsonObj = {...state, sessId: sessId, userId: userId };
  
  console.log(jsonObj);
  return fetch(`http://${path}:5000/api/v1/addQuiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonObj)
  }).then(result => {
    console.log(result);
    if (result.ok) {
      console.log("Created new quiz");
      return true;
      // this.setState({ submitted: true }); // change this later
    } else {
      console.log("Failed to create quiz");
      return false;
    }
  });
};

export const submitQuizAnswers = async (state) => {
  console.log("Attempting to submit quiz results");
  return fetch(`http://${path}:5000/api/v1/submitQuiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state)
  }).then(result => {
    console.log(result);
    return result.ok;
  });


};

// do we need to send the type?
export const verifyUser = async (sessId, userId) => {
  var jsonObj = { sessId: sessId, userId: userId };
  console.log(jsonObj);

  return fetch(`http://${path}:5000/api/v1/verifyUser`, {
    method: "POST", // ??
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonObj)
  }).then(result => {
    return result.ok;
  });
}


export const updateProfile = async (state) => {
  console.log("Attempting to update student profile");
  return fetch(`http://${path}:5000/api/v1/editProfile/student`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state)
  }).then(result => {
    return result.ok;
  });

}


