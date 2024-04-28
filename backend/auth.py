# A namespace for authentication logic.
from flask import request, jsonify, make_response
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, create_access_token, create_refresh_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import User

auth_namespace = Namespace("auth", description="A namespace for authentication")

user_model = auth_namespace.model(
    "User",
    {
        "id": fields.Integer(),
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)

# Signup route and logic
@auth_namespace.route("/signup", methods=["POST"])
class SignupResource(Resource):
    @auth_namespace.expect(user_model)
    def post(self):
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        db_email = User.query.filter_by(email=email).first()
        db_user = User.query.filter_by(username=username).first()

        if db_user is not None:
            return jsonify(
                    {
                        "message": f"Oops, a user has already created an account with {username}. Try using another username"
                    }
            )
        
        if db_email is not None:
            return jsonify(
                    {
                        "message": f"Oops, a user has already created an email with {email}. Try using another email."
                    }
            )
    
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
@auth_namespace.route("/login", methods=["POST"])
class LoginResource(Resource):
    @auth_namespace.expect(user_model)
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        user_db = User.query.filter_by(username=username).first()

        if user_db and check_password_hash(user_db.password, password):
            access_token = create_access_token(identity=user_db.username)
            refresh_token = create_refresh_token(identity=user_db.username)

            return jsonify (
                {
                    "access_token": access_token,
                    "refresh_token": refresh_token
                }
            )
        
# Refresh tokens route
@auth_namespace.route("/refresh")
class RefreshTokenResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)

        return make_response(jsonify({
            "access_token": access_token
        }), 200)


