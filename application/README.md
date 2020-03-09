## Backend RESTful API documentation

# Usage

Endpoints:

# POST /api/v1/register/student

**Request Body**
```json
{        
    "email": string,
    "password": string, 
    "firstName": string,
    "lastName": string,
    "country": string,
    "stateOrProvince": string,
    "city": string
}
```
**Response**

    - 200 OK for successful registration
    - 401 UNAUTHORIZED for already existing email
    - 400 BAD REQUEST if request body formatted incorrectly
    - 500 INTERNAL SERVER ERROR for internal error (e.g. database is down)

**Response Body**
```json
{
    "message": string
}
```
*message* is a potentially empty string.


# POST /api/v1/login

**Request Body**
```json
{
    "email": string,
    "password": string
}
```

**Response**

    - 200 OK for successful login
    - 401 UNAUTHORIZED for unsuccessful login e.g. user/password combination is incorrect
    - 400 BAD REQUEST if request body formatted incorrectly
    - 500 INTERNAL SERVER ERROR for internal error (e.g. database is down)

**Response Body**
```json
{
    "uid": string,
    "sessId": string,
    "message": string
}
```
*sessId* is a 256 bit unique token. uid and sessId must be sent with every subsequent request.
*message* is a potentially empty string.

# POST /api/v1/editProfile/student

**Request Body**
```json
{
    "uid": string,
    "sessId": string, 
    "studyLevel": string,
    "school": string,
    "bio": string      
}
```
*school* has a 300 character limit
*bio* has a 3000 character limit

**Response**

    - 200 OK for successful edit
    - 400 BAD REQUEST if request body formatted incorrectly, string too long (potentially)
    - 500 INTERNAL SERVER ERROR for internal error (e.g. db down)

**Response Body**
```json
{
    "message": string
}
```
*message* may potentially be an empty string

# POST /api/v1/editProfile/recruiter

**Request Body**
```json
{
    "uid": string,
    "sessId": string, 
    "company": string,
    "title": string,
    "bio": string      
}
```
*company* has a 300 character limit
*title* has a 100 character limit
*bio* has a 3000 character limit

**Response**

    - 200 OK for successful edit
    - 400 BAD REQUEST if request body formatted incorrectly, string too long (potentially)
    - 500 INTERNAL SERVER ERROR for internal error (e.g. db down)

**Response Body**
```json
{
    "message": string
}
```
*message* may potentially be an empty string

# POST /api/v1/viewProfile

**Request Body**
```json
{
    "uid": string,   
}
```

**Response**

    - 200 OK for successful profile generation
    - 400 BAD REQUEST if request body formatted incorrectly
    - 500 INTERNAL SERVER ERROR for internal error (e.g. db down)

**Response Body**
```json
{
    "role": string,
    "profilePicturePath": string,
    "resumePath": string,
    "bio": string,
    "studyLevel": string,
    "school": string,
    "company": string,
    "title": string
}
```
depending on the role of the profile, *studyLevel* and *school* or *company* and *title* may be empty strings.

# POST /api/v1/addQuiz

**Request Body**
```json
{
    "title": string,
    "author": int,
    "tags": string,
    "numQuestions": int,
    "questions": list of question objects:
        {
            "questionType": string,
            "question": string,
            "answers": list of strings,
            "correct": int
        }
}
```
where *tags* is a string with each tag separated by a comma
*questionType* is 0 if the question is multiple choice, 1 if long answer

**Response**

    - 200 OK for successful profile generation
    - 400 BAD REQUEST if request body formatted incorrectly
    - 500 INTERNAL SERVER ERROR for internal error (e.g. db down)

**Response Body**
```json
{
    "message": string
}
```
where *message* is potentially an empty string


# POST /api/v1/submitQuiz

**Request Body**
```json
{
    "uid": int,
    "quizId": int,
    "userAnswers": [{
        "answer": int,
        "questionType": int,
        "questionId": int
    }],
    "correct": int,
    "numMultChoice": int
}
```
where *correct* is number of correct answers and *numMultChoice* is the number of multiple choice answers in the quiz 

**Response**

    - 200 OK for successful profile generation
    - 400 BAD REQUEST if request body formatted incorrectly
    - 500 INTERNAL SERVER ERROR for internal error (e.g. db down)

**Response Body**
```json
{
    "message": string
}
```
where *message* is potentially an empty string

# POST /api/v1/verifyUser

**Request Body**
```json
{
    "uid": string,
    "sessId": string  
}
```
**Response**

    - 200 OK if user is currently authenticated
    - 401 unauthorized if user is not authorized (redirect to login page)
    
**Response Body**
```json
{
    "message": string
}
```

# POST /api/v1/fetchQuizScores

**Request Body**
```json
{
    "sessId": string,
    "quizId": int,
    "numScores": int
}
```
where *numScores* indicates how many scores to return. A *numScores* of 0 indicates a request for all scores for the given quiz.

**Response**

    - 200 OK if quiz scores exist
    - 400 if no scores found
    
**Response Body**
```json
{
    "quizName": string,
    "scores": [ 
            {
                "uid": int, 
                "userName": string, 
                "score": int
            } 
                ]
}
```

# POST /api/v1/filterQuizzes

**Request Body**
```json
{
    "sessId": string,
    "author": string,
    "tags": list of strings,
    "quizName": string
}
```

**Response**

    - 200 OK if quizzes found
    - 400 if no quizzes found
    
**Response Body**
```json
{
    "quizId": int,
    "quizName": string,
    "numQuestions": int
}
```

# POST /api/v1/filterStudents

**Request Body**
```json
{
    "firstName": string,
    "lastName": string,
    "studyLevel": int,
    "school": string,
    "country": string,
    "state": string,
    "city": string
}
```
where *name* is first name and last name separated by a space

**Response**

    - 200 OK if students found
    - 400 if no students found
    
**Response Body**
```json
{
    "uid": int,
    "studentName": string,
}
```

# POST /api/v1/getUserHistory

**Request Body**
```json
{
    "sessId": string, 
    "uid": int, 
    "numScores": int
}
```

**Response**

    - 200 OK if user history exist
    - 400 if no history exists
    
**Response Body**
```json
{
    "scores": [
        {
            "quizId": int, 
            "quizName": string, 
            "score": int
        } 
             ]
}
```

# POST /api/v1/getUserInfo

**Request Body**
```json
{
    "sessId": string,
    "uid": int
}
```

**Response**

    - 200 OK if user exists
    - 400 if no info found
    
**Response Body**
```json
{
    "firstName": string, 
    "lastName": string, 
    "studyLevel": int, 
    "school": string, 
    "bio": string, 
    "city": string, 
    "stateOrProvince": string, 
    "country": string
}
```

