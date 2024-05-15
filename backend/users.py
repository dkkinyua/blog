from flask import jsonify, make_response, request
from flask_restx import Namespace, fields, Resource
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import User, Post

user_namespace = Namespace("users", description="A namespace for users and their credentials")

# A model serializer for User's model
user_model = user_namespace.model(
    "User", 
    {
        "id": fields.Integer(),
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)

# A model serializer for Posts' model
post_model = user_namespace.model(
        "Post", 
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "content": fields.String(),
    }
)
# This route is to get the user's details from the db
@user_namespace.route("/<int:user_id>")
class DetailsResource(Resource):
    # Gets the user's details from the db by the user_id
    @jwt_required()
    @user_namespace.marshal_with(user_model)
    def get(self, user_id):
        try:
            current_user = get_jwt_identity()

            details = User.query.filter_by(username=current_user).first()

            if details.id == user_id:
                return details, 200
            
            else:
                return jsonify(
                    {
                        "msg": "Hey, you are not supposed to do that! Check your permissions and try again"
                    }
                ), 403
        
        except Exception as e:
            return jsonify(
                {
                    "msg": str(e)
                }
            )
        
    # This is to update the user's details in the db 
    @jwt_required()
    @user_namespace.expect(user_model)
    @user_namespace.marshal_with(user_model) 
    def put(self, user_id):
        try:
            current_user = get_jwt_identity()
            data = request.get_json()

            details = User.query.filter_by(username=current_user).first()

            if details.id == user_id:
                details.update(
                    username = data.get("username"),
                    email = data.get("email")
                   # password = data.get("password") #Will use a feature to send an email incase you forget your password to send instructions on how to reset it, soon.
                )
                return details, 200
            
            else:
                return jsonify(
                    {
                        "msg": "Error updating details"
                    }
                )


        except Exception as e:
            return jsonify(
                {
                    "msg": str(e)
                }
            )
    
    #This functions permanently deletes the user from the database, protected route. In the frontend be sure to warn the user of this action.
    @jwt_required()
    @user_namespace.expect(user_model)
    def delete(self, user_id):
        try:
            current_user = get_jwt_identity()
            
            details = User.query.filter_by(username=current_user).first()

            if details.id == user_id:
                details.delete()

                return jsonify(
                    {
                        "msg": "User deleted"
                    }
                ), 200
            
            if not details.id:

                return jsonify({
                    "msg": "User doesnt exist!"
                })

        except Exception as e:
            return jsonify(
                {
                    "msg": str(e)
                }
            )

# This API resource is used to map all the posts by a user, and returning them as a list.
@user_namespace.route("/posts/<int:user_id>")
class PostResource(Resource):
    @jwt_required()
    @user_namespace.marshal_list_with(post_model)
    def get(self, user_id):
        try:
            current_user = get_jwt_identity() #Fetches the current user of the session {username}
            details = User.query.filter_by(username=current_user).first()

            if details.id == user_id:
                user_posts = Post.query.get_or_404(user_id=details.id)

                return user_posts

        except Exception as e:
            return jsonify({
                "msg": str(e)
            })

