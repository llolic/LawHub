# Sprint 3 Planning meeting

### Sunday, March 1st, 2020

## Participants

All 5 participants met to choose which user stories will be done in sprint 3. 

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

The goal of this sprint is to allow students and recruiters to interact on the same platform. Students will be able to choose to complete a quiz from a specific recruiter, and recruiters will be able to view results from specific students.

## Spikes

One of the spikes for this sprint would be writing efficient database queries for the back-end to use. Querying the database for this sprint would require queries that join multiple tables and order information. These queries must be written to perform efficiently and scale as eventually our application will support a large number of users and quizzes.

Spikes related to the front-end include properly using promises and callbacks in component logic. Promises are used frequently when sending requests to the API in order to get data to render. Promises are also asynchronous, so we must properly display visuals to show if components are still loading. Proper callbacks must also be used within components, to ensure the state is updated accordingly and at the right time. This enables dynamic rendering at all times.

## Sprint 3 User Stories

#### As a recruiter, I would like to include questions from a question bank in my quizzes (in case I don’t want to upload my own questions).

_Tasks:_

1. In the quiz creation pages, add an option for the recruiter to select from a pool of questions that we have available from our database.

2. Application: Query and return pre-made questions when requests are received, and add these questions to Quizzes in the database.
   
3. Data: Update the quiz question table to add questions to a quiz.

_Acceptance Criteria:_
* A recruiter should be able to select from a bank of test questions when creating their quiz.
* A recruiter should be able to select multiple of these questions.


#### As a student, I would like to see the results of my quizzes on a leaderboard in order to see where I stand in comparison to other applicants (percentile).

_Tasks:_

1. Presentation: The leaderboard should have a list of users with their scores, from highest to lowest. It should also display other useful statistics such as change in position or total quizzes done.

2. Application: The backend should be able to receive HTTP requests to retrieve the leaderboard, and query the database to find users with top scores.

3. Data: Write a query to get all the scores related to a specific user. Also write a query to get a leaderboard for a specific quiz.

_Acceptance Criteria:_
* A student should be able to access a leaderboard page for a specific quiz.
* A student should be able to see where they rank amongst all other students who completed a specific quiz.


#### As a user, I want to see detailed statistics of another user’s history so I have a better understanding of the applicant.

_Tasks:_

1. Presentation: Each user will have their profile page, which will be affected by any profile edits and their quiz history. Must make API call to get user data to render the profile.

2. Application: The backend server should be able to query the database in order to retrieve data about user profiles, as well as quizzes that this user has previously completed.

3. Data: Write a query to get all the scores related to a specific user.

_Acceptance Criteria:_
* A user should be able to access a profile page of a specific student.
* A user should be able to see the results of quizzes that this specific student has completed.


#### As a student, I would like to filter quizzes by location of the poster, name of the poster, and tags to make finding quizzes I would like to complete easier.

_Tasks:_

1. Presentation: On the mock page, there should be a filter drop down menu, allowing the user to pick various filters.

2. Application: Query quizzes from the database that meet a certain criteria such as having a certain author and return them to the presentation layer.

3. Data: Write a query to get all the quizzes filtered by certain attributes.

_Acceptance Criteria:_
* A student should be able to access a page with quiz listings.
* A student should be able to filter these quizzes by attributes such as name of poster, company of poster, location of poster, tags, etc.


#### As a recruiter, I want to be able to filter all students by categories so I can find students that meet my requirements.

_Tasks:_

1. Presentation: On the explore page, there should be a filter drop down menu, with categories to choose from.

2. Application: Receive requests from presentation layer to fetch all students fitting a certain criteria e.g. location and return these students to the presentation layer.

3. Data: Write a query to get all the students filtered by certain attributes.

_Acceptance Criteria:_
* A recruiter should be able to access a page with a list of students.
* A recruiter should be able to filter these students by attributes such as location of student, school that the student attends/attended, student’s study level, etc.


The sub-tasks of the user stories were added to Jira and assigned to group members.
