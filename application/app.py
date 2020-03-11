from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_api import status
import flask_bcrypt as bcrypt
from flask_cors import CORS
# see http://www.flaskapi.org/api-guide/status-codes/
import markdown, os
# http://zetcode.com/python/bcrypt/ for bcrypt methods
import database_lite
import database_mysql
import database_auth
from helpers import *
import query_helpers
import sqlite3
import json

TIMEOUT_MINS = 5

app = Flask(__name__)
CORS(app)
api = Api(app)

def reqParser(parser, args):
    for i in range(len(args)):
        parser.add_argument(args[i], required=True, location='json')
    return


class Index(Resource):
    def get(self):
        # Output our documentation
        with open('./README.md') as fd:
            content = fd.read()
            return markdown.markdown(content) # convert to HTML

class Login(Resource):
    def post(self):
        # print("REQUEST DATA", request.data)
        # print("REQUEST HEADERS", request.headers)
        # return
        parser = reqparse.RequestParser()
        reqParser(parser, ['email', 'password'])
        # parser.add_argument('email', required=True)
        # parser.add_argument('password', required=True)

        args = parser.parse_args()
        print(args)
        db = database_mysql.DatabaseMySql()

        try:
            val = db.connect()
            #sanitize email input here, learn to escape the input
            row = db.execute("SELECT uid, password FROM AppUser WHERE email = '{}'".format(args['email']))
            db.close_connection()
        except:
            #return 500
            return {}, status.HTTP_500_INTERNAL_SERVER_ERROR

        if row == []:
            return {}, status.HTTP_401_UNAUTHORIZED
        uid = row[0][0]
        password_hash = row[0][1]
        if bcrypt.check_password_hash(password_hash.encode(), args['password']):
            #return 200 ok
            sessId = generate_auth_token()
            insert_auth_uid(uid, sessId)
            return {"uid": uid, "sessId": sessId}
        
        #return 401 unauthorized
        return {}, status.HTTP_401_UNAUTHORIZED


class Register(Resource):
    def post(self, role):
        print("REQ DATA", request.data)
        
        parser = reqparse.RequestParser()
        reqParser(parser, ['email', 'password', 'firstName', 'lastName'])
        # add non-required arguments
        # parser.add_argument('country', location='json')
        # parser.add_argument('state', location='json')
        # parser.add_argument('city', location='json')

        args = parser.parse_args()

        db = database_mysql.DatabaseMySql()
        try:
            db.connect()
        except:
            #return 500
            return {}, status.HTTP_500_INTERNAL_SERVER_ERROR

        password_hash = bcrypt.generate_password_hash(args['password']).decode('utf-8')
        print(password_hash, args['firstName'], args['lastName'], args['email'])
        
        # try:
        row = db.execute('''INSERT INTO AppUser (password, firstName, lastName, email, role, country, stateOrProvince, city) 
                        VALUES ("{}", "{}", "{}", "{}", "{}", "{}", "{}", "{}");'''
                        .format(password_hash, args['firstName'], args['lastName'], args['email'], role, "country", "state", "city"))
        # except Exception as e:
        #     print(e)
        #     return {}, status.HTTP_401_UNAUTHORIZED
        
        try:
            db.close_connection()
        except:
            return {}, status.HTTP_500_INTERNAL_SERVER_ERROR    

        return {"message": ""}, status.HTTP_200_OK


class RegisterStudent(Register):
    def post(self):
        return super().post('Student')

class RegisterRecruiter(Register):
    def post(self):
        return super().post('Recruiter')

class EditProfile(Resource):
    def post(self, role, uid, args):
        query = "UPDATE " + role + " SET "

        for key in args.keys():
            query += key + ' = "' + args[key] + '", '
        
        query = query[0:-2] #truncate extra comma and space
        query += " WHERE uid = " + uid + ";"

        db = database_mysql.DatabaseMySql()
        try:
            db.connect()
            db.execute(query)
            db.close_connection()
        except:
            #return 500
            return {}, status.HTTP_500_INTERNAL_SERVER_ERROR

        return {}, status.HTTP_200_OK

        

class EditProfileStudent(EditProfile):
    def post(self):
        parser = reqparse.RequestParser()
        reqParser(parser, ['studyLevel', 'school', 'bio'])
        args = parser.parse_args()
        parser.add_argument('uid', required=True, location='json')
        uid = parser.parse_args()['uid']
        return super().post('Student', uid, args)

class addQuiz(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        reqParser(parser, ['title', 'author', 'tags', 'numQuestions'])
        parser.add_argument('questions', action='append', type=dict) # to parse an argument as a list and convert the values to dicts
        args = parser.parse_args()
        
        questionIds = query_helpers.addQuestions(args['questions']) # -> returns list of questionIds
        if questionIds == -1:
            return {"message": "internal server error in addQuestions"}, status.HTTP_500_INTERNAL_SERVER_ERROR

        quizId = query_helpers.createQuiz(args['author'], args['title'], args['numQuestions'])
        if quizId == -1:
            return {"message": "internal server error in createQuiz"}, status.HTTP_500_INTERNAL_SERVER_ERROR
        
        retval = query_helpers.updateQuizContains(quizId, questionIds)
        if retval == -1:
            return {"message": "internal server error in updateQuizContains"}, status.HTTP_500_INTERNAL_SERVER_ERROR
        
        retval = query_helpers.addTags(quizId, args['tags'])
        if retval == -1:
            return {"message": "internal server error in addTags"}, status.HTTP_500_INTERNAL_SERVER_ERROR
        return {}, status.HTTP_200_OK

class SubmitQuiz(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        reqParser(parser, ['uid', 'quizId', 'userAnswers', 'correct', 'numMultChoice'])
        args = parser.parse_args()

        # if (int(args['score']) == 0):
        #     retval = query_helpers.submitEmptyQuiz('userId', 'quizId')
        # else:
        score = int(args['correct']) / int(args['numMultChoice'])
        retval = query_helpers.submitQuiz('uid', 'quizId', score)

        if (retval == -1):
            return {"message": "error submitting quiz"}, status.HTTP_500_INTERNAL_SERVER_ERROR

        return {}, status.HTTP_200_OK
        


class VerifyUser(Resource):
    def post(self):
        # return {}, status.HTTP_200_OK
        parser = reqparse.RequestParser()
        reqParser(parser, ['uid', 'sessId'])
        args = parser.parse_args()
        if (is_authenticated(args['uid'], args['sessId'], TIMEOUT_MINS)):
            return {}, status.HTTP_200_OK
        return {}, status.HTTP_401_UNAUTHORIZED

class FetchQuizScores(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        reqParser(parser, ['quizId', 'numScores'])
        args = parser.parse_args()
        quizId = args['quizId']
        numScores = args['numScores']
        # return {'quizName': 'TestQuiz', 'scores': [{'uid': 0, 'userName': 'TestUser1', 'score': 5}, {'uid': 1, 'userName': 'TestUser2', 'score': 10}]}

        quizNameQuery = f'SELECT title FROM Quiz WHERE quizId={quizId}'
        leaderboardQuery = f'SELECT QuizRecord.uid, score, firstName, lastName FROM QuizRecord RIGHT JOIN AppUser ON QuizRecord.uid=AppUser.uid WHERE quizId={quizId} ORDER BY score DESC LIMIT {numScores};'

        db = database_auth.DatabaseMySql()
        db.connect()

        try:
            quizNameRows = db.execute(quizNameQuery)
            leaderboardRows = db.execute(leaderboardQuery)
        except:
            return {'message': 'Error when executing queries'}, status.HTTP_500_INTERNAL_SERVER_ERROR

        if quizNameRows == []:
            return {}, status.HTTP_404_NOT_FOUND
        scores = []
        for row in leaderboardRows:
            scores.append({'uid': row[0], 'userName': row[2]+ " " + row[3], 'score': row[1]})
        
        return {'quizName': quizNameRows[0][0], 'scores': scores}, status.HTTP_200_OK

class GetUserHistory(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        reqParser(parser, ['uid', 'numScores'])
        args = parser.parse_args()
        uid = args['uid']
        numScores = args['numScores']

        db = database_auth.DatabaseMySql()
        db.connect()

        userHistoryQuery = f"SELECT QuizRecord.quizId, score, title FROM QuizRecord RIGHT JOIN Quiz ON QuizRecord.quizId=Quiz.quizId WHERE uid={uid} ORDER BY score DESC;"

        try:
            userHistoryRows = db.execute(userHistoryQuery)
        except: 
            return {'message': 'Error when executing queries'}, status.HTTP_500_INTERNAL_SERVER_ERROR

        if userHistoryQuery == []:
            return {}, status.HTTP_404_NOT_FOUND

        scores = []
        for row in userHistoryRows:
            scores.append({'quizId': row[0], 'score': row[1], 'quizName': row[2]})

        return {'scores': scores}, status.HTTP_200_OK

class GetUserInfo(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        reqParser(parser, ['uid'])
        args = parser.parse_args()
        uid = args['uid']

        db = database_auth.DatabaseMySql()
        db.connect()

        userInfoQuery = f"SELECT firstName, lastName, email, country, stateOrProvince, city, studyLevel, school FROM AppUser RIGHT JOIN Student ON AppUser.uid=Student.uid WHERE AppUser.uid={uid};"

        try:
            userInfoRows = db.execute(userInfoQuery)
        except: 
            return {'message': 'Error when executing queries'}, status.HTTP_500_INTERNAL_SERVER_ERROR

        if userInfoQuery == []:
            return {}, status.HTTP_404_NOT_FOUND


        return {'firstName': userInfoRows[0],
                'lastName': userInfoRows[1],
                'email': userInfoRows[2],
                'country': userInfoRows[3],
                'stateOrProvince': userInfoRows[4],
                'city': userInfoRows[5],
                'studyLevel': userInfoRows[6],
                'school': userInfoRows[7]}, status.HTTP_200_OK





# add helper parse_args with for loop for adding arguments
api.add_resource(Index, '/')
api.add_resource(RegisterStudent, '/api/v1/register/student')
api.add_resource(RegisterRecruiter, '/api/v1/register/recruiter')
api.add_resource(Login, '/api/v1/login')
api.add_resource(EditProfileStudent, '/api/v1/editProfile/student')
api.add_resource(VerifyUser, '/api/v1/verifyUser')
api.add_resource(addQuiz, '/api/v1/addQuiz')
api.add_resource(SubmitQuiz, '/api/v1/submitQuiz')
api.add_resource(FetchQuizScores, '/api/v1/fetchQuizScores')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
