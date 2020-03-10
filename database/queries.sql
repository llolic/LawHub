-- LAM-7: Quiz leaderboard
SELECT QuizRecord.uid, score, firstName, lastName FROM QuizRecord RIGHT JOIN AppUser ON QuizRecord.uid=AppUser.uid WHERE quizId={} ORDER BY score DESC LIMIT {};
SELECT title FROM Quiz WHERE quizId={};

-- Notes: First query takes in a quizId and a limit and returns a list of {uid, score, firstName, lastName} in descending order limited to the specified number of rows.
--        Second query takes in a quizId and returns the title