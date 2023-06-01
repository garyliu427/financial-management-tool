from flask_restx import Resource, Namespace
from flask import request, abort, jsonify
from db.util import *
from utils.models import *
from utils.util import *


api = Namespace(
    "expense",
    description="record expense",
)


@api.route("")
class Expense(Resource):
    @api.doc(description="record expense")
    @api.expect(auth_header, add_expense_model)
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


        insert_new_expense(user_id, amount, category, description, date)
        return

@api.route("/<int:expense_transacation_id>")
class Expense(Resource):
    @api.doc(description="edit expense")
    @api.expect(auth_header, edit_expense_model)
    @api.response(200, "Success")
    @api.response(403, "Incorrect email or password / No json body supplied")
    @api.response(500, "Database error")
    def put(self, expense_transacation_id):
        user_id = check_token(request)
        expense_transacation_id = validate_expense_transacation_id(expense_transacation_id)
        data = request.json
        if not data:
            abort(403, "No json supplied")

        amount = data.get("amount")
        category = data.get("category")
        description = data.get("description")
        date = data.get("date")

        if amount is None or category is None or description is None or date is None:
            abort(403, "Require amount, category, description, and date in the json")


        edit_transacation(user_id, amount, category, description, date)
        return
    

@api.route("/transactions")
class Transactions(Resource):
    @api.doc(description="get all transactions for the user")
    @api.expect(auth_header)
    @api.response(200, "Success")  # Assuming you have a transaction_model defined
    @api.response(403, "Incorrect email or password / Token not provided")
    @api.response(500, "Database error")
    def get(self):
        user_id = check_token(request)
        transactions = get_user_transactions(user_id)  # Implement this function to fetch transactions from the database
        return jsonify(transactions)