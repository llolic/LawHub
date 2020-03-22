-- LAM-10: Filter students
SELECT AppUser.uid, firstName, lastName FROM AppUser RIGHT JOIN Student ON AppUser.uid=Student.uid WHERE studyLevel={} AND school={} AND country={} AND stateOrProvince={} AND city={};

-- Notes: The query takes in a studyLevel, school, country, stateOrProvince, and city, and returns all students that satisfy that criteria (uid, firstName, lastName)


-- Fetch Quiz
SELECT title, author, numQuestions FROM QUIZ WHERE quizId={};
SELECT Question.questionId, question, questionType, option1, option2, option3, option4, correctAnswer FROM Question RIGHT JOIN QuizContains ON Question.questionId=QuizContains.questionId WHERE quizId={};


-- Fetch Quiz List
SELECT quizId, title FROM Quiz;


-- LAM-9: Quiz Filter
(SELECT DISTINCT Quiz.quizId, title, numQuestions FROM HasTags RIGHT JOIN Quiz ON HasTags.quizId=Quiz.quizId WHERE tag={} OR tag={} OR tag={});
(SELECT DISTINCT quizId, title, numQuestions FROM Quiz WHERE author={});
(SELECT DISTINCT quizId, title, numQuestions FROM Quiz WHERE title LIKE '%{}%');
SELECT quizId, title, numQuestions FROM Quiz;

-- Notes: takes 3 tags, an author, and a string and returns a list of {quizId, title, numQuestions}

 
-- LAM-7: Quiz leaderboard
SELECT QuizRecord.uid, score, firstName, lastName FROM QuizRecord RIGHT JOIN AppUser ON QuizRecord.uid=AppUser.uid WHERE quizId={} ORDER BY score DESC LIMIT {};
SELECT title FROM Quiz WHERE quizId={};

-- Notes: First query takes in a quizId and a limit and returns a list of {uid, score, firstName, lastName} in descending order limited to the specified number of rows.
--        Second query takes in a quizId and returns the title


 
-- LAM-6: Viewing user history and profile
SELECT QuizRecord.quizId, score, title FROM QuizRecord RIGHT JOIN Quiz ON QuizRecord.quizId=Quiz.quizId WHERE uid={} ORDER BY score DESC;
SELECT firstName, lastName, email, country, stateOrProvince, city, studyLevel, school, bio FROM AppUser RIGHT JOIN Student ON AppUser.uid=Student.uid WHERE AppUser.uid={};

-- Notes: First query gets all the quiz records associated with a specified student
--        Second query gets all the information about a specified student




-- LAM-4: posting suggestions
SELECT DISTINCT postingId, title, description, Posting.stateOrProvince, recruiterId, firstName, lastName FROM Posting RIGHT JOIN AppUser ON Posting.recruiterId=AppUser.uid WHERE Posting.stateOrProvince={};
SELECT quizId FROM PostingContains WHERE postingId={};