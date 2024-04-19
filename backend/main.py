from flask import Flask
from flask_restx import Api, Resource
from config import DevelopmentConfig

app = Flask(__name__)
api = Api(app, doc="/docs")

@api.route("/hello")
class HelloResource(Resource):
    def get(self):
        message = {
            "message": "Hello World"
        }

        return message

if __name__ == "__main__":
    app.run()