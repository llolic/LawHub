import database_mysql
from flask_api import status

'''
adds questions to the question table in the db
questions is a list of dicts, each dict a "question" object
returns list of questionIds added to db, -1 in case of server error
'''
def addQuestions(questions):
    questionIds = []
    db = database_mysql.DatabaseMySql()
    try:
            db.connect()
    except:
            return -1

    for i in range(len(questions)):
        question = questions[i]['question']
        questionType = int(questions[i]['questionType'])

        if questionType == 1:
            option1 = "NULL"
            option2 = "NULL"
            option3 = "NULL"
            option4 = "NULL"
            correctAnswer = "NULL"
            insert = '''INSERT INTO Question (question, questionType, option1, option2, option3, option4, correctAnswer) 
                VALUES ("{}", {}, {}, {}, {}, {}, {});
                '''.format(question, questionType, option1, option2, option3, option4, correctAnswer)
            select = '''SELECT questionID FROM Question 
                    WHERE question = "{}" AND questionType = {} AND option1 = {} AND option2 = {} AND option3 = {} AND option4 = {} AND correctAnswer = {};
                    '''.format(question, questionType, option1, option2, option3, option4, correctAnswer)
        else:
            option1 = questions[i]['answers'][0]
            option2 = questions[i]['answers'][1]
            option3 = questions[i]['answers'][2]
            option4 = questions[i]['answers'][3]
            correctAnswer = int(questions[i]['correct'])
            insert = '''INSERT INTO Question (question, questionType, option1, option2, option3, option4, correctAnswer) 
                VALUES ("{}", {}, "{}", "{}", "{}", "{}", {});
                '''.format(question, questionType, option1, option2, option3, option4, correctAnswer)
            select = '''SELECT questionID FROM Question 
                    WHERE question = "{}" AND questionType = {} AND option1 = "{}" AND option2 = "{}" AND option3 = "{}" AND option4 = "{}" AND correctAnswer = {};
                    '''.format(question, questionType, option1, option2, option3, option4, correctAnswer)

        #queries made twice here since if option1-4 is null, then we need to set to NULL, not "NULL".  option columns is varchar.
        try:
            db.execute(insert)
            row = db.execute(select)
            db.close_connection()
        except:
            return -1
        
        questionIds.append(row[0][0])

    return questionIds

'''
adds quiz to Quiz table in db
returns quizId on success, -1 in case of a server error
'''
def createQuiz(author, title, numQuestions):
    insert = '''INSERT INTO Quiz (author, title, numQuestions) VALUES ({}, "{}", {});
    '''.format(author, title, numQuestions)
    select = '''SELECT quizId FROM Quiz WHERE author = {} AND title = "{}" AND numQuestions = {};
    '''.format(author, title, numQuestions)
    db = database_mysql.DatabaseMySql()
    try:
            db.connect()
            db.execute(insert)
            row = db.execute(select)
            quizId = row[0][0]
            db.close_connection()
    except:
            return -1
    
    return quizId

'''
adds to QuizContains table in db
returns 1 on success, -1 on server error
'''
def updateQuizContains(quizId, questionIds):
    db = database_mysql.DatabaseMySql()
    try:
            db.connect()
    except:
            return -1

    for question in questionIds:
        insert = '''INSERT INTO QuizContains (quizId, questionId) VALUES ({}, {});'''.format(quizId, question)
        try:
                db.execute(insert)
        except:
                return -1
    
    try:
            db.close_connection()
    except:
            return -1
    return 1

'''
adds to HasTags table in db
returns 1 on success, -1 on server error
'''
def addTags(quizId, tags):
    db = database_mysql.DatabaseMySql()
    try:
            db.connect()
    except:
            return -1

    tags = tags.split(',')
    for tag in tags:
        tag = tag.strip()
        insert = '''INSERT INTO HasTags (quizId, tag) VALUES ({}, "{}");'''.format(quizId, tag)
        try:
                db.execute(insert)
        except:
                return -1

    try:
            db.close_connection()
    except:
            return -1

    return 1