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
    "userId": string,
    "sessId": string,
    "message": string
}
```
*sessId* is a 256 bit unique token. userId and sessId must be sent with every subsequent request.
*message* is a potentially empty string.

# POST /api/v1/editProfile/student

**Request Body**
```json
{
    "userId": string,
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
    "userId": string,
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
    "userId": string,   
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
    "userId": int,
    "quizId": int,
    "userAnswers": list of answer objects:
    {
        "answer": int,
        "questionId": int
    },
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