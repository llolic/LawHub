-- LAM-53: Quiz Filter
(SELECT DISTINCT Quiz.quizId, title FROM HasTags RIGHT JOIN Quiz ON HasTags.quizId=Quiz.quizId WHERE tag={} OR tag={} OR tag={}) UNION
(SELECT DISTINCT quizId, title FROM Quiz WHERE author={}) UNION
(SELECT DISTINCT quizId, title FROM Quiz WHERE title LIKE '%{}%');