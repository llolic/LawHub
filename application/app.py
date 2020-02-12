from flask import Flask
from flask_restful import Resource, Api, reqparse
import markdown, os

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
        return {'email': args['email'], 'password': args['password']}

    # add helper parse_args with for loop for adding arguments


api.add_resource(Index, '/')
api.add_resource(Login, '/api/v1/login')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)