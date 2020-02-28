/**
 * Export requests functions here.
 */

const path = "35.227.67.4";

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
      return result.json(); // uid and sessId, need stu/recruiter id??
    }
    return -1;
  });
};

export const submitQuiz = async state => {
  return fetch(`http://${path}:5000/api/v1/addQuiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state)
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

// do we need to send the type?
export const verifyUser = async (sessId, uid) => {
  var jsonObj = { sessId: sessId, uid: uid };
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


