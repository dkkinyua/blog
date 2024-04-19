from flask import Flask
from flask_restx import Api, Resource
from flask_migrate import Migrate
from config import DevelopmentConfig
from models import User, Post
from exts import db


app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app, doc="/docs")

@api.route("/hello")
class HelloResource(Resource):
    def get(self):
        message = {
            "message": "Hello World"
        }

        return message
    
@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "User": User,
        "Post": Post
    }

if __name__ == "__main__":
    app.run()