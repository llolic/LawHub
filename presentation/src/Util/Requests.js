/**
 * Export requests functions here.
 */

const path = "35.227.67.4";

export const fetchQuizQuestions = async () => {
  //console.log("Attempting to login");
  return fetch(`http://${path}:5000/api/v1/fetchQuestions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(result => {
    if (result.ok) {
      return result.json(); // userId and sessId ??and userType
    }
    return -1;
  });
}

export const filterStudents = async state => {

  return fetch(`http://${path}:5000/api/v1/filterStudents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state)
  }).then(result => {
    if (result.ok) {
      // state.students = result.json().matches;
      return result.json();
    } else {
      return false;
    }
  });
};

// POST /api/v1/register/student OR recruiter
export const filterQuizzes = async state => {

  return fetch(`http://${path}:5000/api/v1/filterQuizzes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state)
  }).then(result => {
    if (result.ok) {
      console.log(JSON.stringify(state));
      //state.quizzes = result.json().matches;
      return result.json();
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

// POST /api/v1/login (NEED TO RETURN USER TYPE)
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

// POST /api/v1/editProfile/student OR recruiter(not implemented yet)
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

// POST /api/v1/viewProfile ???????

// POST /api/v1/addQuiz
export const submitNewQuiz = async (state, sessId, userId) => {

  console.log(state);

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
      console.log(result);
      return true;
      // this.setState({ submitted: true }); // change this later
    } else {
      console.log(result);
      return false;
    }
  });
};

// POST /api/v1/submitQuiz
export const submitQuizAnswers = async (state) => {
  console.log("Attempting to submit quiz results", state);
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

// POST /api/v1/verifyUser
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

// POST /api/v1/fetchQuizScores
export const fetchQuizScores = async (quizId, numScores) => {
  var jsonObj = { quizId: quizId, numScores: numScores, sessId: "Abc" };
  console.log(jsonObj);
  return fetch(`http://${path}:5000/api/v1/fetchQuizScores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonObj)
  }).then(result => {
    if (result.ok)
      return result.json();
    return -1;
  })
  .catch(err => {
    throw err;
  });
}


// POST /api/v1/getUserHistory
export const getUserHistory = async (uid, numScores) => {
  var jsonObj = { uid: uid, numScores: numScores };
  return fetch(`http://${path}:5000/api/v1/getUserHistory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonObj)
  }).then(result => {
    if (result.ok)
      return result.json();
    return -1;
  });
}


// POST /api/v1/getUserInfo
export const getUserInfo = async (uid) => {
  const jsonObj = { uid: uid };
  return fetch(`http://${path}:5000/api/v1/getUserInfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonObj)
  }).then(result => {
    if (result.ok)
      return result.json();
    return -1;
  });
}

// POST /api/v1/fetchQuestions



export const getQuizzes = async () => {
  // var jsonObj = { sessId: sessId, userId: userId };
  return fetch(`http://${path}:5000/api/v1/fetchQuizList`, {
    method: "POST", // ??
  }).then(result => {
    if (result.ok)
      return result.json();
    return -1;
  });
}


// POST /api/v1/fetchQuestions



export const fetchQuiz = async (quizId) => {
  var jsonObj = { quizId: quizId };
  return fetch(`http://${path}:5000/api/v1/fetchQuiz`, {
    method: "POST", // ??
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonObj)
  }).then(result => {
    if (result.ok)
      return result.json();
    return -1;
  });
}




export const getPostings = async () => {
  var jsonObj = { uid: -1, stateOrProvince: "" };
  return fetch(`http://${path}:5000/api/v1/fetchPostings`, {
    method: "POST", // ??
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonObj)
  }).then(result => {
    if (result.ok)
      return result.json();
    return -1;
  });
}
