from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_api import status
import flask_bcrypt as bcrypt
from flask_cors import CORS
# see http://www.flaskapi.org/api-guide/status-codes/
import markdown, os
# http://zetcode.com/python/bcrypt/ for bcrypt methods
import database_lite
import sqlite3


app = Flask(__name__)
CORS(app)
api = Api(app)


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
        parser.add_argument('email', required=True)
        parser.add_argument('password', required=True)

        args = parser.parse_args()
        print(args)
        db = database_lite.DatabaseLite()
        val = db.connect()
        if val == -1:
            #return 500
            return {}, status.HTTP_500_INTERNAL_SERVER_ERROR

        #sanitize email input here, learn to escape the input
        row = db.execute("SELECT uid, password FROM AppUser WHERE email = '{}'".format(args['email']))
        db.close_connection()
        if len(row) == 0:
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
        # print("REQ DATA", request.data)
        
        parser = reqparse.RequestParser()
        parser.add_argument('email', required=True, location='json')
        parser.add_argument('password', required=True, location='json')
        parser.add_argument('firstName', required=True, location='json')
        parser.add_argument('lastName', required=True, location='json')
        parser.add_argument('country', location='json')
        parser.add_argument('state', location='json')
        parser.add_argument('city', location='json')

        args = parser.parse_args()
        print(args)
#         return {}

        db = database_lite.DatabaseLite()
        val = db.connect()
        if val == -1:
            #return 500
            return status.HTTP_500_INTERNAL_SERVER_ERROR
        # return {"sup":"alfonso"}, status.HTTP_200_OK
        password_hash = bcrypt.generate_password_hash(args['password']).decode('utf-8')
        try:
            row = db.execute('''INSERT INTO appuser (password, firstName, lastName, email, role, country, stateOrProvince, city) 
                            VALUES ("{}", "{}", "{}", "{}", "{}", "{}", "{}", "{}");'''
                            .format(password_hash, args['firstName'], args['lastName'], args['email'], role, args['country'], args['state'], args['city']))
        except:
             return {}, status.HTTP_401_UNAUTHORIZED

        db.close_connection()
        return {"message": ""}, status.HTTP_200_OK


class RegisterStudent(Register):
    def post(self):
        super().post('student')


    # add helper parse_args with for loop for adding arguments


api.add_resource(Index, '/')

api.add_resource(RegisterStudent, '/api/v1/register/student')
api.add_resource(Login, '/api/v1/login')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)