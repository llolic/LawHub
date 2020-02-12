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
message is a potentially empty string.


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
sessId is a 256 bit unique token. userId and sessId must be sent with every subsequent request.
message is a potentially empty string.




