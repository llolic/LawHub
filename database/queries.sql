-- LAM-9: Quiz Filter
(SELECT DISTINCT Quiz.quizId, title, numQuestions FROM HasTags RIGHT JOIN Quiz ON HasTags.quizId=Quiz.quizId WHERE tag={} OR tag={} OR tag={}) INTERSECT
(SELECT DISTINCT quizId, title, numQuestions FROM Quiz WHERE author={}) INTERSECT
(SELECT DISTINCT quizId, title, numQuestions FROM Quiz WHERE title LIKE '%{}%');

-- Notes: takes 3 tags, an author, and a string and returns a list of {quizId, title, numQuestions}