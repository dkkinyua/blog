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
    
@api.route("/post")
class PostResource(Resource):
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
    
@api.route("/posts/<int:id>")
class PostsResource(Resource):
    @api.marshal_list_with(post_model)
    # Get all posts by a user
    def get(self, id):
        get_posts = Post.query.filter_by(id=id).all()

        return get_posts
    
    # Gte one post by its id
    def get(self, id):
        get_post = Post.query.get_or_404(id)

        return get_post
    
    # Update a post
    def put(self, id):
        update_post = Post.query.get_or_404(id)
        data = request.get_json()

        update_post.update(
            title = data.get("title"),
            content = data.get("content")
        )

        return jsonify({
            "message": "Post has been updated."
        })
    
    def delete(self, id):
        delete_post = Post.query.get_or_404(id)

        delete_post.delete()

        return jsonify({
            "message": "Post deleted."
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