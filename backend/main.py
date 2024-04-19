from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
from flask_migrate import Migrate
from config import DevelopmentConfig
from models import User, Post
from exts import db




app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app, doc="/docs")



post_model = api.model(
    "Post", 
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "content": fields.String()
    }
)

user_model = api.model(
    "User",
    {
        "id": fields.Integer(),
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)


@api.route("/hello")
class HelloResource(Resource):
    def get(self):
        message = {
            "message": "Hello World"
        }

        return message
    
@api.route("/posts")
class PostResource(Resource):
    # Get all posts [in a list]
    @api.marshal_list_with(post_model)
    def get(self):
        get_posts = Post.query.all()

        return get_posts
    
    @api.marshal_with(post_model)
    @api.expect(post_model)
    def post(self):
        data = request.get_json()
        title = data.get("title")
        new_post = Post(
            title = data.get("title"),
            content = data.get("content")
        )

        new_post.save()
        return jsonify({
            "message": f"Post: {title} has been posted."
        })
    
@app.shell_context_processor()
def make_shell_context():
    return {
        "db": db,
        "User": User,
        "Post": Post
    }

if __name__ == "__main__":
    app.run()