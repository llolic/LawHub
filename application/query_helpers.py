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
			print("connection failed")
			return -1

	for i in range(len(questions)):
		question = questions[i]['question']
		questionType = int(questions[i]['questionType'])

		if questionType == 1:
			insert = '''INSERT INTO Question (question, questionType) 
				VALUES ("{}", {});
				'''.format(question, questionType)
			select = '''SELECT questionID FROM Question 
					WHERE question = "{}" AND questionType = {};
					'''.format(question, questionType)
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
		except:
				return -1         
				
		questionIds.append(row[0][0])

	try:
			db.close_connection()
	except:
			return -1
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
	except Exception as e:
			print(e)
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


# query_helpers.submitQuiz('userId', 'quizId', score)

def submitQuiz(userId, quizId, score):
	db = database_mysql.DatabaseMySql()
	try:
		db.connect()
	except:
		return -1

	insertQuery = f"INSERT INTO QuizRecord (uid, quizId, score, hasLongAnswer) VALUES ({userId}, {quizId}, {score}, FALSE)"
	try:
		db.execute(insertQuery)
	except Exception as e:
		print(e)
		return -1
	return 1

def submitEmptyQuiz(userId, quizId):
	db = database_mysql.DatabaseMySql()
	try:
		db.connect()
	except:
		return -1

	insertQuery = f"INSERT INTO QuizRecord (uid, quizId, hasLongAnswer) VALUES ({userId}, {quizId}, FALSE)"
	try:
		db.execute(insertQuery)
	except:
		return -1
	return 1

def queryStudent(args):
	study_level = args['studyLevel']
	school = args['school']
	country = args['country']
	state = args['state']
	city = args['city']

	query = generateStudentQuery(study_level, school, country, state, city)
	db = database_mysql.DatabaseMySql()
	try:
		db.connect()
		rows = db.execute(query)
		db.close_connection()
	except:
		return -1
		
	if rows == []:
		return 0

	matches = []
	for row in rows:
		match = {}
		match["uid"] = row[0]
		match["studentName"] = row[1] + " " + row[2]
		matches.append(match)

	return matches

def generateStudentQuery(study_level, school, country, state, city):
	add_and = False
	query = "SELECT AppUser.uid, firstName, lastName FROM AppUser RIGHT JOIN Student ON AppUser.uid=Student.uid WHERE"
	if study_level != "":
		query += " studyLevel="+study_level
		add_and = True
	if school != "":
		if add_and:
			query+= " AND"
		query += " school='"+school+"'"
		add_and = True
	if country != "":
		if add_and:
			query+= " AND"
		query += " country='"+country+"'"
		add_and = True
	if state != "":
		if add_and:
			query+= " AND"
		query += " stateOrProvince='"+state+"'"
		add_and = True
	if city != "":
		if add_and:
			query+= " AND"
		query += " city='"+city+"'"
	query += ";"
	return query
