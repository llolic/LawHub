from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_api import status
import flask_bcrypt as bcrypt
# see http://www.flaskapi.org/api-guide/status-codes/
import markdown, os
# http://zetcode.com/python/bcrypt/ for bcrypt methods
import database_lite


app = Flask(__name__)
api = Api(app)


class Index(Resource):
    def get(self):
        # Output our documentation
        with open('./README.md') as fd:
            content = fd.read()
            return markdown.markdown(content) # convert to HTML

class Login(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', required=True)
        parser.add_argument('password', required=True)

        args = parser.parse_args()

        db = database_lite.DatabaseLite()
        val = db.connect()
        if val == -1:
            #return 500
            return {}, status.HTTP_500_INTERNAL_SERVER_ERROR

        #sanitize email input here, learn to escape the input
        row = db.execute("SELECT uid, password FROM AppUser WHERE email = '{}'".format(args['email']))
        db.close_connection()
        uid = row[0][0]
        password_hash = row[0][1]
        if bcrypt.check_password_hash(password_hash.encode(), args['password']):
            #return 200 ok
            return {"uid": uid, "sessId": "0"}
        
        #return 401 unauthorized
        return {}, status.HTTP_401_UNAUTHORIZED


class Register(Resource):
    def post(self, role):
        parser = reqparse.RequestParser()
        parser.add_argument('email', required=True)
        parser.add_argument('password', required=True)
        parser.add_argument('firstName', required=True)
        parser.add_argument('lastName', required=True)
        parser.add_argument('country')
        parser.add_argument('state')
        parser.add_argument('city')

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

        row = db.execute('''INSERT INTO appuser (password, firstName, lastName, email, role, country, stateOrProvince, city) 
                            VALUES ("{}", "{}", "{}", "{}", "{}", "{}", "{}", "{}");'''
                            .format(password_hash, args['firstName'], args['lastName'], args['email'], role, args['country'], args['state'], args['city']))
        db.close_connection()
        return {}, status.HTTP_200_OK


class RegisterStudent(Register):
    def post(self):
        super().post('student')


    # add helper parse_args with for loop for adding arguments


api.add_resource(Index, '/')

api.add_resource(RegisterStudent, '/api/v1/register/student')
api.add_resource(Login, '/api/v1/login')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)