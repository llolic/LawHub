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

		if questionType == 2: # existing question
			questionIds.append(questions[i]["questionId"])
		else:

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

def queryQuestions():
	db = database_mysql.DatabaseMySql()
	query = "SELECT * FROM Question;"
	try:
		db.connect()
		rows = db.execute(query)
		db.close_connection()
	except:
		return -1
	if rows == []:
		return 0

	questions = []
	for row in rows:
		question = {}
		question['questionId'] = row[0]
		question['question'] = row[1]
		question['questionType'] = row[2]
		question['option1'] = row[3]
		question['option2'] = row[4]
		question['option3'] = row[5]
		question['option4'] = row[6]
		question['correctAnswer'] = row[7]
		questions.append(question)

	return questions

def queryStudent(args):
	study_level = args['studyLevel']
	school = args['school']
	country = args['country']
	state = args['state']
	city = args['city']

	query = generateStudentQuery(study_level, school, country, state, city)
	db = database_mysql.DatabaseMySql()
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
	# if city != "":
	# 	if add_and:
	# 		query+= " AND"
	# 	query += " city='"+city+"'"
	query += ";"
	return query

def insertPosting(uid, title, description, state, quizzes):
	insert_posting = '''INSERT INTO Posting (recruiterId, title, description, stateOrProvince) VALUES ({}, "{}", "{}", "{}");
	'''.format(uid, title, description, state)

	db = database_mysql.DatabaseMySql()
	try:
		db.connect()
		db.execute(insert_posting)
	except Exception as e:
		print(e)
		return {"message": "insert into Posting failed"}, status.HTTP_500_INTERNAL_SERVER_ERROR

	select_posting = '''SELECT postingId FROM Posting WHERE recruiterId = {} AND title = "{}" AND description = "{}" AND stateOrProvince = "{}";
	'''.format(uid, title, description, state)

	try:
		row = db.execute(select_posting)
	except Exception as e:
		print(e)
		return {"message": "select failed"}, status.HTTP_500_INTERNAL_SERVER_ERROR
	
	postingId = row[0][0]
	for quiz in quizzes:
		insert_posting = "INSERT INTO PostingContains (postingId, quizId) VALUES ({}, {});".format(postingId, quiz)
		try:
			db.execute(insert_posting)
		except Exception as e:
			print(e)
			return {"message": "failed inserting into PostingContains quizId " + quiz}, status.HTTP_500_INTERNAL_SERVER_ERROR
	
	try:
		db.close_connection()
	except Exception as e:
		print(e)
		return {"message": "insert into postingContains failed"}, status.HTTP_500_INTERNAL_SERVER_ERROR
	
	return {}, status.HTTP_200_OK