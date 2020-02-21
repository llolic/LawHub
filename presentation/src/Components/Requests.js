/**
 * Export requests functions here.
 *
 */

export const submitRegistration = async state => {
  fetch("http://104.196.152.154:5000/api/v1/register/" + this.props.type, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state)
  }).then(result => {
    console.log(result);
    if (result.ok) {
      console.log("Created new user");
      return true;
      // this.setState({ submitted: true }); // change this later
    } else {
      console.log("Failed to create user");
      return false;
    }
  });
};

export const submitLogin = async (state) => {
  // grab state values here?? send to database
  //const request_body = {email: this.state.email, password: this.state.password}
  console.log("Attempting to login");
  fetch("http://104.196.152.154:5000/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state)
  }).then(result => {
    console.log(result);
    if (result.ok) {
      console.log("Login successful");
      result.json().then(data => {
        console.log(data.sessId);
        // this.setState({ sessId: data.sessId });
        // STORE THE UID
        // this.setState({ loginState: 1 }); // change this later

        return data;
        // authenticate(data.sessId);
        // this.props.updateNavbar();
      });
    } else {
      console.log("Failed to login");
      return null;
    //   this.setState({ loginState: -1 });
    }
  });
};

export const submitQuiz = async state => {
  fetch("http://104.196.152.154:5000/api/v1/addQuiz", {
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
