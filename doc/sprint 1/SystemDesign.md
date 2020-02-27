## Project LAMAS


# System Design

<div style="text-align: right">
CSC301: Intro to Software Engineering 
</div>
<div style="text-align: right">
Lazar, Ahmad, Michelle, Alfonso, Shahmeer
</div>


<p>&nbsp;</p>
<p>&nbsp;</p>

## Table of Contents

- [CRC Cards](#crc)
- [Software Architecture Diagram](#Architecture)

## CRC

### _React Components_

Class Name | Button
------------ | -------------
Parent class | React.Component
Classname subclasses | N/A
Responsibilities | Renders itself based on props and css classnames.    This is a functional component, so it has no state. This component can be a subclass of any other component.
Collaborators | Michelle
-------------------------


Class Name | NavBar
------------ | -------------
Parent class | React.Component
Classname subclasses | (React-router-dom) Link, Button, SearchBar
Responsibilities | Provides a way to navigate throughout the website. Uses react-router-dom Links with buttons, so they canl redirect users to a new page. 
Collaborators | Michelle
-------------------------

Class Name | SearchBar
------------ | -------------
Parent class | React.Component
Classname subclasses | (React-router-dom) Link, Button, SearchBar
Responsibilities | Resets the search bar on redirection to a new page. Sends search queries to the backend, and redirects to search results.
Collaborators | Michelle
-------------------------

Class Name | StudentRegistration
------------ | -------------
Parent class | React.Component
Classname subclasses | (Material-UI) TextField, MenuItem (React-router-dom) Redirect
Responsibilities | Displays a student registration form. The component is able to validate form entries such as email and password. The state stores all user input and sends a POST request on submit. The component will handle redirection to a new page on success. 
Collaborators | Michelle
-------------------------

Class Name | HomePage
------------ | -------------
Parent class | React.Component
Classname subclasses | (Material-UI) Grid, (React-router-dom) Link, Button
Responsibilities | Displays the LawHub homepage when no user is logged on. This includes the slogan and information about the web application. The component contains buttons for student and recruiter registration.
Collaborators | Michelle
-------------------------


Class Name | Login
------------ | -------------
Parent class | React.Component
Classname subclasses | (Material-UI) TextField, MenuItem, (React-router-dom) Redirect
Responsibilities | Displays a login page for both students and recruiters. This page validates its form entries for email and password.. The state stores user input and sends a POST request, which will redirect the user to a successful login page or tell them their credentials could not be verified based on the server response.
Collaborators | Alfonso
-------------------------


### _Back-end Components_


Class Name | Login
------------ | -------------
Parent class | Resource (abstract RESTful resource)
Classname subclasses | N/A
Responsibilities | Handles POST login requests for both student and recruiter accounts. Parses the request which must consist of an email and password. It then will query the database and fulfil necessary checks. Upon success, it returns the uid of the user and a generated sessionid which will be used to authenticate the user throughout their session.
Collaborators | Ahmad
-------------------------

Class Name | Register
------------ | -------------
Parent class | Resource (abstract RESTful resource)
Classname subclasses | RegisterStudent, RegisterRecruiter
Responsibilities | Receives a POST register request and parses the necessary arguments. It will insert a new row into the AppUser table of the database which consists of all necessary user information such as email, first name, last name, country, state, city, role, and their hashed password.
Collaborators | Shahmeer
-------------------------

Class Name | RegisterStudent
------------ | -------------
Parent class | Register
Classname subclasses | N/A
Responsibilities | Passes the POST request to the Register class along with the role “student” to the Register class to indicate a student account to be created.
Collaborators | Shahmeer
-------------------------

Class Name | RegisterRecruiter
------------ | -------------
Parent class | Register
Classname subclasses | N/A
Responsibilities | Passes the POST request to the Register class along with the role “recruiter” to the Register class to indicate a student account to be created.
Collaborators | Shahmeer
-------------------------

## Architecture

### _System Interaction_

Since our system is a website and is being hosted on Google Cloud Platform, it is OS independent and does not require any software to be installed on the device using our system. However, during the application’s development process, we required different programming language compilers, VMs and DBs. For the database layer, we created a mySQL server and coded in a mySQL shell. For the application layer we used Python as the main programming language, Python’s Flask micro-web framework, SQLite for testing and handling logged in user session IDs, and Postman for testing. For the presentation layer, we used React and Node.js to setup our React project.


### _Software Architecture Diagram_

![](../architecture.png)

Reference: https://www.linuxjournal.com/article/3508

Our system is split into 3 distinct components, the Presentation Layer (front-end), the Application Layer (back-end), and the Database Layer. The front-end communicates with the back-end by hitting an endpoint. The back-end then communicates with the database to store or fetch data and responds to the front-end.


__Presentation Layer__

The role of the Presentation Layer is to provide the users with a visually appealing, easy to use GUI to use our system. There will be several pages such as the home page, registration, login, quiz creation/completion and more, all of which will communicate with the application layer to achieve desired functionality. It will send HTTP requests to the application layer for actions such as registering in order to save a new user’s profile info in our database, or to validate a user’s credentials for logging in, or retrieving information about a certain user when loading their profile. Based on the response received from the application layer, the presentation layer will redirect the user to other pages in our system or display the desired information.

__Application Layer__

The role of the Application Layer is to act as the middleman between the presentation and database layer via endpoints. The Application Layer receives requests from the Presentation Layer which is then parsed and carried out by interacting with the Database Layer. For example, to log a user in, the Presentation Layer will send a request to the login endpoint of the Application Layer. The request will be parsed and the necessary queries will be sent to the Database Layer for execution. The Application Layer will then make necessary checks and send a response to the Presentation Layer indicating the success of the log in. The Application Layer will be responsible for handling errors such as inconsistencies in requests. For example, incorrectly formatted JSON bodies, incorrect login information, and invalid session IDs. The Application Layer will communicate these errors with the Presentation Layer using various HTTP response codes to indicate what error had occurred.

__Database Layer__

The role of the database is to store all the necessary information and records for users and quizzes. It has tables for users, student information, recruiter information, quizzes, postings, etc. The back-end will send queries to the database which will in-turn return the necessary records for the query. The database will also receive insert statements to insert new data into the tables. The tables in the database have constraints on attributes and relationships. For example, when inserting into the AppUser table, the email must be unique. If a duplicate email exists, the insert will be rejected and a message will be sent to the back-end.
