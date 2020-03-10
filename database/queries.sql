-- LAM-7: Quiz leaderboard
SELECT QuizRecord.uid, score, firstName, lastName FROM QuizRecord RIGHT JOIN AppUser ON QuizRecord.uid=AppUser.uid WHERE quizId={} ORDER BY score DESC LIMIT {};
SELECT title FROM Quiz WHERE quizId={};