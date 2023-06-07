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
class Expense_Transaction(Resource):
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


@api.route("/<int:expense_transaction_id>")
class Edit_Expense_Transaction(Resource):
    @api.doc(description="edit expense")
    @api.expect(auth_header, edit_expense_model)
    @api.response(200, "Success")
    @api.response(403, "Incorrect email or password / No json body supplied")
    @api.response(500, "Database error")
    def put(self, expense_transaction_id):
        user_id = check_token(request)
        expense_transaction_id = validate_expense_transaction_id(user_id, expense_transaction_id)
        data = request.json
        if not data:
            abort(403, "No json supplied")

        amount = data.get("amount")
        category = data.get("category")
        description = data.get("description")
        date = data.get("date")

        if amount is None or category is None or description is None or date is None:
            abort(403, "Require amount, category, description, and date in the json")

        edit_expense_transaction(user_id, amount, category, description, date)
        return
    

@api.route("/transactions")
class Get_Expense_Transaction(Resource):
    @api.doc(description="get all transactions for the user")
    @api.expect(auth_header)
    @api.response(200, "Success")  # Assuming you have a transaction_model defined
    @api.response(403, "Incorrect email or password / Token not provided")
    @api.response(500, "Database error")
    def get(self):
        user_id = check_token(request)
        transactions = get_user_expense_transactions(user_id)
        serialized_transactions = [serialize_expense_transaction(transaction) for transaction in transactions]
        return jsonify(serialized_transactions)
    

@api.route("/<int:expense_transaction_id>")
class Delete_Expense_Transaction(Resource):
    @api.doc(description="delete a transaction")
    @api.expect(auth_header)
    @api.response(200, "Success")  # Assuming you have a transaction_model defined
    @api.response(403, "Incorrect email or password / Token not provided")
    @api.response(500, "Database error")
    def delete(self, expense_transaction_id):
        user_id = check_token(request)
        expense_transaction_id = validate_expense_transaction_id(user_id, expense_transaction_id)
        delete_expense_transaction(expense_transaction_id)
        return