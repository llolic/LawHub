# Sprint 1 Planning meeting

### Monday, February 3rd, 2020

## Participants

All 5 participants met to choose which user stories will be done in sprint 1. 

- Lazar Lolic
- Ahmad Al-Taha
- Shahmeer Shahid
- Alfonso Dela Cruz
- Michelle Luo

## Team Capacity

Team capacity is calculated as follows: 

    (Number of team members) * (days in the sprint) * (productive hours in a day)

We have 5 team members, 14 days in a sprint and approximately 3.8 hours of productive hours a day (3 for weekdays and 6 for weekends).
This gives us a total team capacity of 
    
    Team capacity = 5 * 3.8 * 14 = 266

## Sprint Goals

We decided to begin with the fundamental features of our website which would be necessary for any future progress to be made. For example, to take a quiz, a student would first need to sign up and log in, and to make a quiz, a recruiter would also need to sign up and log in. Our sprint goal is that a user should be able to register, log in, and customize their profiles.

## Spikes

There will be two main spikes for this sprint. Both are technical spikes, where the team must become familiar with new technologies in order to use them effectively in the project. 

The first spike involves learning React and Javascript. Most members have limited experience using both technologies, so allocating time to ramp up frontend knowledge will benefit the project greatly.

The second spike involves understanding the infrastructure of the project. Again, most members are unclear with the details of the three-tier architecture, so we will spend time to familiarize ourselves with this architectural model. This includes researching how each tier (presentation, application and database) communicates with one another. This is key to creating a cohesive product.

## Sprint 1 User Stories

#### As a non-registered student, I want to register as a student so that I can complete quizzes.

_Tasks:_

1. Presentation: User should be able to enter username, password (need to verify twice), and email (verify twice), etc. 5 text fields for the above information, and a submit button.

2. Application: Verify that password entries match, hash+salt password and store with corresponding username in database. Initialize a blank student profile and send a 200 OK response. Send an error response if the username already exists.
   
3. Data: Make a table to store the registered student’s username, email, and hashed password.

#### As a non-registered recruiter, I want to register as a recruiter so that I can post quizzes.

_Tasks:_

1. Presentation: User should be able to enter username, password (need to verify twice), and email (verify twice), etc. 5 text fields for the above information, and a submit button.

2. Application: Verify that password entries match, hash+salt password and store with corresponding username in database. Initialize a blank student profile and send a 200 OK response. Send an error response if the username already exists.

3. Data: Make a table to store the registered recruiter’s username, email, and hashed password.

#### As a registered user, I want to login, so I can access my profile.

_Tasks:_

1. Presentation: Include text fields for username and password and a login button to send username and password to DB through POST request.

2. Presentation: Have a home page with a login/register button.
Application: Hash password and check that it matches hash in DB. ‘200 OK’ response if successful login.

3. Data: Store usernames and corresponding hashes.

#### As a developer, I want to learn how to use React in order to develop the front end for the project and learn valuable skills for industry. 

    Point estimate: 32
    Priority: 5

#### As a developer, I want to learn how to create an effective architectural design in order to effectively run our website.
	
    Point estimate: 16
	Priority: 5

#### As a user, I would like a navigation bar to navigate throughout the website in order to access different pages.
	
    Point estimate: 8
	Priority: 5


The sub-tasks of the user stories were added to Jira and assigned to group members.
