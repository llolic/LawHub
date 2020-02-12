from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_api import status
# see http://www.flaskapi.org/api-guide/status-codes/
import markdown, os, bcrypt
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
        print(args['password'])
        db = database_lite.DatabaseLite()
        val = db.connect()
        if val == -1:
            #return 500
            return status.HTTP_500_INTERNAL_SERVER_ERROR

        #sanitize email input here, learn to escape the input
        row = db.execute("SELECT password FROM AppUser WHERE email = '{}'".format(args['email']))

        if bcrypt.checkpw(args['password'], row[0]):
            #return 200 ok
            return status.HTTP_200_OK
        
        #return 401 unauthorized
        return status.HTTP_401_UNAUTHORIZED 


    # add helper parse_args with for loop for adding arguments


api.add_resource(Index, '/')
api.add_resource(Login, '/api/v1/login')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)