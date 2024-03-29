from flask_restx import Resource, Namespace
from flask import request, abort, jsonify
from db.util import *
from utils.models import *
from utils.util import *


api = Namespace(
    "account",
    description="get my profile & all rating & all reviews, edit my profile, close my account",
)


@api.route("")
class MyAccount(Resource):
    @api.doc(
        description="update my details, can update username, email (require unique), require the token"
    )
    @api.expect(auth_header, edit_profile_model)
    @api.response(200, "Success, return new set of {username, email, avatar}")
    @api.response(401, "The new email has been taken")
    @api.response(403, "The token is invalid / Not supplied / Other errors")
    @api.response(500, "Database error")
    def put(self):
        # get user id
        user_id = check_token(request)

        # check json, same as /signup
        data = request.json
        if not data:
            abort(403, "No json supplied")

        email = data.get("email")
        password = data.get("password")
        username = data.get("username")

        if email is None and password is None and username is None:
            abort(
                403, "Need to provide at least one of email, password, username, avatar"
            )
            
        # password at least 6 characters
        if password is not None and len(password) < 6:
            abort(403, "Password at least 6 characters length")

        if email is not None and len(email) == 0:
            abort(403, "Provided email should not be empty")

        if email is not None and is_email_taken(email):
            abort(401, "Email has been taken")

        if username is not None and len(username) == 0:
            abort(403, "Provided username should not be empty")

        update_profile(user_id, password, username)
        return

    @api.doc(
        description="completely close my account, will erase all my profile, reviews, wishlist, banlist etc"
    )
    @api.expect(auth_header)
    @api.response(200, "Success: the account is closed")
    @api.response(403, "The token is invalid / Not supplied")
    @api.response(500, "Database error")
    def delete(self):
        user_id = check_token(request)
        delete_profile(user_id)
        return
    
