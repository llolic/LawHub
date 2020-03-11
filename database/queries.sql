-- LAM-7: Quiz leaderboard
SELECT QuizRecord.uid, score, firstName, lastName FROM QuizRecord RIGHT JOIN AppUser ON QuizRecord.uid=AppUser.uid WHERE quizId={} ORDER BY score DESC LIMIT {};
SELECT title FROM Quiz WHERE quizId={};

-- Notes: First query takes in a quizId and a limit and returns a list of {uid, score, firstName, lastName} in descending order limited to the specified number of rows.
--        Second query takes in a quizId and returns the title

-- LAM-6: Viewing user history and profile
SELECT QuizRecord.quizId, score, title FROM QuizRecord RIGHT JOIN Quiz ON QuizRecord.quizId=Quiz.quizId WHERE uid={} ORDER BY score DESC;
SELECT firstName, lastName, email, country, stateOrProvince, city, studyLevel, school FROM AppUser RIGHT JOIN Student ON AppUser.uid=Student.uid WHERE AppUser.uid={};

-- Notes: First query gets all the quiz records associated with a specified student
--        Second query gets all the information about a specified student
