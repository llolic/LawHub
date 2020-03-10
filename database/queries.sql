-- LAM-6: Viewing user history and profile
SELECT QuizRecord.quizId, score, title FROM QuizRecord RIGHT JOIN Quiz where QuizRecord.quizId=Quiz.quizId WHERE uid={} ORDER BY score DESC;
SELECT firstName, lastName, email, country, stateOrProvince, city, studyLevel, school FROM AppUser RIGHT JOIN Student ON AppUser.uid=Student.uid WHERE AppUser.uid={};