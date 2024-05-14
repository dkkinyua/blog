from flask import jsonify, make_response, request
from flask_restx import Namespace, fields, Resource
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import User

user_namespace = Namespace("users", description="A namespace for users and their credentials")

user_model = user_namespace.model(
    "User", 
    {
        "id": fields.Integer(),
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
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
