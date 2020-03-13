-- LAM-10: Filter students
SELECT AppUser.uid, firstName, lastName FROM AppUser RIGHT JOIN Student ON AppUser.uid=Student.uid WHERE studyLevel={} AND school={} AND country={} AND stateOrProvince={} AND city={};

-- Notes: The query takes in a studyLevel, school, country, stateOrProvince, and city, and returns all students that satisfy that criteria (uid, firstName, lastName)


-- Fetch Quiz
SELECT title, author, numQuestions FROM QUIZ WHERE quizId={};
SELECT questionType, option1, option2, option3, option4, correctAnswer FROM Question RIGHT JOIN QuizContains ON Question.questionId=QuizContains.questionId WHERE quizId={};

-- Fetch Quiz List
SELECT quizId, title FROM Quiz;