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
import sqlite3
import json


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
            print("about to query db")
            row = db.execute("SELECT uid, password FROM AppUser WHERE email = '{}'".format(args['email']))
            db.close_connection()
            print("done querying db")
        except:
            #return 500
            return {}, status.HTTP_500_INTERNAL_SERVER_ERROR

        if row == []:
            return {}, status.HTTP_401_UNAUTHORIZED
        uid = row[0][0]
        password_hash = row[0][1]
        if bcrypt.check_password_hash(password_hash.encode(), args['password']):
            #return 200 ok
            return {"uid": uid, "sessId": "0"}
        
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

        # return {"sup":"alfonso"}, status.HTTP_200_OK
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
        parser.add_argument('userId', required=True, location='json')
        uid = parser.parse_args()['userId']
        return super().post('Student', uid, args)

class addQuiz(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        print(parser)
        reqParser(parser, ['title', 'author', 'tags', 'numQuestions'])
        parser.add_argument('questions', action='append') # to parse an argument as a list, we add action='append'
        args = parser.parse_args()
        # questionIds = addQuestions(args['questions']) -> returns list of questionIds
        # quizId = createQuiz(author, title, numQuestions)
        # updateQuizContains(questionIds, quizId)
        # addTags(quizId, args['tags'])
        return 200



api.add_resource(Index, '/')
api.add_resource(RegisterStudent, '/api/v1/register/student')
api.add_resource(RegisterRecruiter, '/api/v1/register/recruiter')
api.add_resource(Login, '/api/v1/login')
api.add_resource(EditProfileStudent, '/api/v1/editProfile/student')
api.add_resource(addQuiz, '/api/v1/addQuiz')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
