from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_api import status
# see http://www.flaskapi.org/api-guide/status-codes/
import markdown, os, hashlib, binascii
import database


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
        db = database.Database()
        val = db.connect()
        if val == -1:
            #return 500
            return status.HTTP_500_INTERNAL_SERVER_ERROR

        #sanitize email input here, learn to escape the input
        row = db.execute("SELECT password FROM AppUser WHERE email = '{}'".format(args['email']))
        
        if verify_password(row[0], args['password']):
            #return 200 ok
            return status.HTTP_200_OK
        
        #return 404 unauthorized
        return status.HTTP_401_UNAUTHORIZED


    # add helper parse_args with for loop for adding arguments


api.add_resource(Index, '/')
api.add_resource(Login, '/api/v1/login')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)