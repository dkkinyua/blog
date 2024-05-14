from flask import Flask
from flask_cors import CORS
from flask_restx import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from models import User, Post
from exts import db
from auth import auth_namespace
from posts import post_namespace
from users import user_namespace



def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    db.init_app(app)

    CORS(app)

    migrate = Migrate(app, db)
    JWTManager(app)

    api = Api(app, doc="/docs")
    api.add_namespace(auth_namespace)
    api.add_namespace(post_namespace)
    api.add_namespace(user_namespace)

        
    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "User": User,
            "Post": Post
        }

    return app