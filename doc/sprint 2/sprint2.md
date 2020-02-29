# Sprint 1 Planning meeting

### Thursday, February 13th, 2020

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

For this sprint, we want a recruiter to be able to register as well as have both a student and recruiter be able to customize their profiles. By the end of this sprint, a recruiter would be able to create a quiz and a student would be able to complete a quiz.

## Spikes

One of the spikes for this sprint will be the database schema. We will need to find a simple and efficient way to store quizzes, and the questions associated with them. Because MySQL does not allow attributes in tables to be lists, we will need to create relations that link other tables and have the appropriate foreign key constraints.

Another spike will be time management. The team members all have multiple other computer science courses with assignments and/or midterms during this sprint. We will need to work efficiently and plan our time well to be able to complete everything correctly and on time.

Further, we will most likely run into some issues with our VM and downloading libraries as the VM is a bit different than a regular OS. We might also have issues transferring our program or pieces of code onto the VM if developing was done on our own PCs. We will need to read documentation specifically for VMs to make sure we install the libraries correctly from the start to save time that would otherwise be wasted on debugging.

## Sprint 1 User Stories

#### As a non-registered recruiter, I want to register as a recruiter so that I can post quizzes.

_Tasks:_

1. Presentation: User should be able to enter username, password (need to verify twice), and email (verify twice), etc. 5 text fields for the above information, and a submit button.

2. Application: Verify that password entries match, hash+salt password and store with corresponding username in database. Initialize a blank student profile and send a 200 OK response. Send an error response if the username already exists.
   
3. Data: Make a table to store the registered recruiter’s username, email, and hashed password.

_Acceptance Criteria:_
* a user should be able to choose to register as a recruiter
* after registering, the user should be able to use the application as a recruiter
* the recruiter's account information should be stored in the database


#### As a user, I would like to customize/update my profile by adding a biography, a resume, and a showcase of quiz scores so that my profile can stand out more to employers and change my skills as I develop as a professional.

_Tasks:_

1. Presentation: User should be able to change their profile picture, edit their summary, school, and location. Send POST request with all edited info.

2. Application: Sends data to DB and returns appropriate response.

3. Data: Stores new profile information corresponding to the user.

_Acceptance Criteria:_
* a user should be able to access a profile customization page
* a user should be able to customize their profile by adding or editing information
* a user and a recruiter should each have different fields in their profile
* the user's profile information should be stored in the database


#### As a recruiter, I would like to create a quiz with my own custom questions so that I can have questions tailored to the job requirements associated with my job offer(s). Questions can be multiple choice or written answers.

_Tasks:_

1. Presentation: Create pages for recruiters to create quizzes where questions can be multiple choice or written in a text box and communicate with the application layer to store these quizzes to be available for students to complete.

2. Application: Handle create a quiz requests and update database accordingly.

3. Data: Store quiz information in a new table. Information will all include poster information and tags. Questions need to be stored in a separate table.

_Acceptance Criteria:_
* a recruiter should be able to access a page to create a quiz
* a recruiter should be able to create a quiz by creating questions and entering them into the fields
* quiz creation should allow the creation of multiple choice and long answer questions
* the created quiz should be stored in the database


#### As developers, we would like to ensure users have proper authentication to various pages on the website so that we can allow certain users to access certain parts of our application.

_Tasks:_

1. Presentation: Replace storing cookies on browser with requests to back end to verify session id

2. Application: Create sessionid tables in sqlite and check validity of sessionid when requested by presentation layer

_Acceptance Criteria:_
* a user should only be able to access certain parts of the application
* only a recruiter should be able to create a quiz
* only a student should be able to complete a quiz


#### As a student, I want to be able to complete a selected quiz so that my score can be saved and made public to other students and most importantly, the recruiters.

_Tasks:_

1. Presentation: Create pages for when a student is taking a quiz and communicate with application layer to store their results

2. Application: Receive quiz completion stats and update information in the database accordingly

3. Data: Store quiz records in a new table.

_Acceptance Criteria:_
* a student should be able to access a page to complete a quiz
* a student should be able to complete a quiz by answering the questions presented to them
* upon completing a quiz, the student should be given their score for just the multiple choice portion of the quiz (if the quiz contains multiple choice questions)
* the score and answers for a quiz record should be inserted into the database


The sub-tasks of the user stories were added to Jira and assigned to group members.
