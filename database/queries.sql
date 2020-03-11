-- Fetch Quiz
SELECT title, author, numQuestions FROM QUIZ WHERE quizId={};
SELECT questionType, option1, option2, option3, option4, correctAnswer FROM Question RIGHT JOIN QuizContains ON Question.questionId=QuizContains.questionId WHERE quizId={};

-- Fetch Quiz List
SELECT quizId, title FROM Quiz;