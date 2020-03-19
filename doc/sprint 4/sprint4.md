# Sprint 4 Planning meeting

### Saturday, March 14th, 2020

## Participants

All 5 participants met to choose which user stories will be done in sprint 4. 

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

The goal for this sprint is to allow students to see specific postings which include quizzes that need to be done and for recruiters to create these postings.

## Spikes

Due to the current COVID-19 situation, all team members are in self-quarantine. Because of this, the team will not be able to have in-person meetings. Although alternatives exist, this will change the way we work and will require us to create a plan before we begin working on this sprint. The plan would need to include new meeting times and new means of communication. We will also need to decide how testing will be done, as testing that requires multiple layers of the architecture, will be more difficult in an online setting.

Another spike for this sprint is the fact that this is our last sprint before our first release. We would not be able to push any needed features to the next sprint if the need arises. Because of this, we will need to plan this sprint more carefully than past sprints which will require us to invest more time. We will also need to put aside more time for testing and finalizing due to this being a very important stage in our product development.

## Sprint 4 User Stories

#### As a student, I would like automatically generated posting suggestions based on my location in order to save time searching for jobs and quizzes.

_Tasks:_

1. Presentation: On the dashboard, display cards of suggested postings by recruiters in the same area. This will show the owner of the posting, short description and number of quizzes required. Clicking on a posting should expand to show the full posting.

2. Application: Respond to a retrieve postings request with a list of new/high profile.
   
3. Data: Write a query that filters postings based on decided and specified criteria.

_Acceptance Criteria:_
* A user should be able to see posting suggestions.
* Posting suggestions should be automatically generated based on criteria derived from the student’s profile information.


#### As a student, I would like to see postings (postings that are new, or from high profile employers) on an explore page in order to easily choose which quizzes to complete.

_Tasks:_

1. Presentation: In the explore tab, display the most relevant postings for the student. This will show the owner of the posting, post description and list the quizzes required.

2. Application: Respond to a retrieve postings request with a list of new/high profile quizzes.

3. Data: Write a query to get all postings from the database.

_Acceptance Criteria:_
* A student should be able to visit an “explore” page.
* A student should be able to see a list of postings made by various recruiters on this page.


#### As a recruiter, I would like to customize/update my profile by adding information so that my profile can stand out and students can see postings I have made.

_Tasks:_

1. Presentation: Provide text fields and drop down menus to allow a recruiter to edit their profile.

2. Application: Store their updated information and customized profile settings in the database.

3. Data: Write a query for updating the Recruiter and AppUser tables for a specific recruiter.

_Acceptance Criteria:_
* A recruiter should be able to visit a profile customization page.
* A recruiter should be able to see all his information on this page.
* A recruiter should be able to change some of his information and save the changes.


#### As a recruiter, I want to create postings so that students who are interested in the positions I offer can know which quizzes to complete.

_Tasks:_

1. Presentation: On the explore page, display a button for creating a posting. Clicking the button will direct recruiters to the posting form. This will allow recruiters to add a posting title, tags, description and identify quizzes for students to do.

2. Application: Store a posting into the database with corresponding quizzes to be completed.

3. Data: Create tables for postings and related information. Write a query for inserting postings into the database.

_Acceptance Criteria:_
* A recruiter should be able to access a posting creation page.
* A recruiter should be able to create a posting with a description and a list of quizzes that need to be completed.
* A recruiter should be able to add their own quizzes or publicly accessible pre-made quizzes to their posting.


#### As a student, I would like to be able to view a recruiter's profile so that I can see their info and the postings that they have created.

_Tasks:_

1. Presentation: Display recruiter information similar to the student’s profile. Instead of statistics, display recent postings made by the recruiter.

2. Application: Fetch all profile information for a given recruiter from the database and return it to the front end.

3. Data: Write a query to get all information about a specific recruiter from the database, as well as all postings that they have created.

_Acceptance Criteria:_
* A student should be able to visit a recruiter’s profile page.
* A student should be able to see the chosen recruiter’s information as well as a list of postings this recruiter has created.


The sub-tasks of the user stories were added to Jira and assigned to group members.
