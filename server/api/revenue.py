from flask_restx import Resource, Namespace
from flask import request, abort, jsonify
from db.util import *
from utils.models import *
from utils.util import *


api = Namespace(
    "revenue",
    description="record revenue",
)


@api.route("")
class Revenue(Resource):
    @api.doc(description="record revenue")
    @api.expect(auth_header, add_revenue_model)
    @api.response(200, "Success")
    @api.response(403, "Incorrect email or password / No json body supplied")
    @api.response(500, "Database error")
    def post(self):
        user_id = check_token(request)
        data = request.json
        if not data:
            abort(403, "No json supplied")


        amount = data.get("amount")
        category = data.get("category")
        description = data.get("description")
        date = data.get("date")

        if amount is None or category is None or description is None or date is None:
            abort(403, "Require amount, category, description, and date in the json")


        insert_new_revenue(user_id, amount, category, description, date)
        return

@api.route("/<int:revenue_transaction_id>")
class Revenue(Resource):
    @api.doc(description="edit revenue")
    @api.expect(auth_header, edit_revenue_model)
    @api.response(200, "Success")
    @api.response(403, "Incorrect email or password / No json body supplied")
    @api.response(500, "Database error")
    def put(self, revenue_transaction_id):
        user_id = check_token(request)
        revenue_transaction_id = validate_revenue_transaction_id(user_id, revenue_transaction_id)
        data = request.json
        if not data:
            abort(403, "No json supplied")

        amount = data.get("amount")
        category = data.get("category")
        description = data.get("description")
        date = data.get("date")

        if amount is None or category is None or description is None or date is None:
            abort(403, "Require amount, category, description, and date in the json")


        edit_transaction(user_id, amount, category, description, date)
        return
    

@api.route("/transactions")
class Revenue_Transactions(Resource):
    @api.doc(description="get all transactions for the user")
    @api.expect(auth_header)
    @api.response(200, "Success")  # Assuming you have a transaction_model defined
    @api.response(403, "Incorrect email or password / Token not provided")
    @api.response(500, "Database error")
    def get(self):
        user_id = check_token(request)
        transactions = get_user_revenue_transactions(user_id)
        serialized_transactions = [serialize_revenue_transaction(transaction) for transaction in transactions]
        return jsonify(serialized_transactions)
    

@api.route("/<int:revenue_transaction_id>")
class Revenue_Transactions(Resource):
    @api.doc(description="delete a transaction")
    @api.expect(auth_header)
    @api.response(200, "Success")  # Assuming you have a transaction_model defined
    @api.response(403, "Incorrect email or password / Token not provided")
    @api.response(500, "Database error")
    def delete(self, revenue_transaction_id):
        user_id = check_token(request)
        revenue_transaction_id = validate_revenue_transaction_id(user_id, revenue_transaction_id)
        delete_revenue_transaction(revenue_transaction_id)
        return