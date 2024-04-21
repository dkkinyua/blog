from flask import Flask, request, jsonify, make_response
from flask_restx import Api, Resource, fields
from flask_migrate import Migrate
from flask_jwt_extended import get_jwt_identity, create_access_token, create_refresh_token, jwt_required, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash
from config import DevelopmentConfig
from models import User, Post
from exts import db




app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
db.init_app(app)

migrate = Migrate(app, db)
JWTManager(app)

api = Api(app, doc="/docs")



post_model = api.model(
    "Post", 
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "content": fields.String(),
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
    @jwt_required()
    @api.marshal_with(post_model)
    @api.expect(post_model)
    def post(self):
        current_user_id = get_jwt_identity()
        data = request.get_json()
        title = data.get("title")
        new_post = Post(
            title = data.get("title"),
            content = data.get("content"),
            user_id = current_user_id
        )

        new_post.save()
        return make_response(jsonify({
            "message": f"Post: {title} has been posted."
        }), 201)

@api.route("/posts/<int:user_id>")
class GetPostResource(Resource):
    @jwt_required()
    @api.marshal_list_with(post_model)
    # Get all posts by a user
    def get(self, user_id):
        get_posts = Post.query.filter_by(user_id=user_id).all()
        return get_posts



@api.route("/posts/<int:id>")
class PostsResource(Resource):    
    # Get one post by its id
    @jwt_required()
    @api.marshal_with(post_model)
    def get(self, id):
        get_post = Post.query.get_or_404(id)

        return get_post
    
    # Update a post
    @jwt_required()
    @api.marshal_with(post_model)
    @api.expect(post_model)
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
    @jwt_required()
    @api.marshal_with(post_model)
    def delete(self, id):
        delete_post = Post.query.get_or_404(id)

        delete_post.delete()

        return jsonify({
            "message": "Post deleted."
        })

# Signup route and logic
@api.route("/login")
class SignupResource(Resource):
    @api.expect(user_model)
    def post(self):
        data = request.get_json()
        username = data.get("username")
        new_user = User(
            username = data.get("username"),
            email = data.get("email"),
            password = generate_password_hash(data.get("password"))
        )
        new_user.save()
        return make_response(jsonify(
            {
                "message": f"User {username} has been created."
            }
        ), 201)

# Login routes and logic
@api.route("/login", methods=["POST"])
class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        user_db = User.query.filter_by(username=username).first()

        if user_db and check_password_hash(user_db.password, password):
            access_token = create_access_token(identity=user_db)
            refresh_token = create_refresh_token(identity=user_db)

            return jsonify({
                "access_token": access_token,
                "refresh_token": refresh_token
            })
        
# Refresh tokens route
@api.route("/refresh-token")
class RefreshTokenResource(Resource);
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)

        return make_response(jsonify({
            "access_token": access_token
        }), 200)

    
@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "User": User,
        "Post": Post
    }

if __name__ == "__main__":
    app.run()