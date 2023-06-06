import jwt
from flask import abort
from exts import db
from db.models import User, Expense_Category, Revenue_Category, Expense_transaction, Revenue_transaction
from sqlalchemy import inspect

key = "W~_2uc9p!K~'$NGB=s~^ABs[`"

def to_dict(obj):
    if type(obj) is tuple:
        return {o.__tablename__: to_dict(o) for o in obj}
    else:
        return {
            c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs
            if c.key != "password"
        }


all_types = [
    User,
    Expense_Category,
    Expense_transaction,
    Revenue_Category,
    Revenue_transaction,
]


def to_list(obj_list):
    if len(obj_list) == 0:
        return []

    if type(obj_list[0]) not in all_types:
        return [to_dict(tuple(obj)) for obj in obj_list]
    else:
        return [to_dict(obj) for obj in obj_list]
    

def check_token(request):
    token = request.headers.get("Authorization")
    if not token:
        abort(403, "Auth token not supplied")

    try:
        # the token should contain the user_id
        # check with database
        payload = jwt.decode(token, key, algorithms=["HS256"])
        user_id = payload["user_id"]
        user = db.session.query(User).get(user_id)
        if not user:
            abort(404, "Token is invalid")

        return user_id

    except Exception as e:
        abort(404, "Token is invalid")


def get_token(email, password):
    try:
        user = (
            db.session.query(User)
            .filter(User.email == email)
            .filter(User.password == password)
            .one()
        )

        payload = {"user_id": user.user_id}
        token = jwt.encode(payload, key, algorithm="HS256")
        return token
    except Exception as e:
        # print(e)
        abort(403, "Incorrect email or password")


# check if the user_id exist
def validate_user_id(user_id):
    try:
        user_id = int(user_id)
    except:
        abort(401, "User_id {} is not an integer".format(user_id))

    user = db.session.query(User).get(user_id)
    if not user:
        abort(401, "User_id {} does not exist".format(user_id))

    return user_id


def delete_token(email):
    try:
        user = db.session.query(User).filter(User.email == email).one()
        user.token = None
        db.session.commit()
    except Exception as e:
        abort(500, "Database error")
    

def initialize_categories():
    expense_categories = [
        {'expense_category_name': 'Eating Out'},
        {'expense_category_name': 'Shopping'},
        {'expense_category_name': 'Groceries'},
        {'expense_category_name': 'Utilities'},
        {'expense_category_name': 'Entertainment'},
        {'expense_category_name': 'Transport'},
        {'expense_category_name': 'Health'},
        {'expense_category_name': 'Travel'},
        {'expense_category_name': 'Education'},
        {'expense_category_name': 'Others'}
    ]

    revenue_categories = [
        {'revenue_category_name': 'Salary'},
        {'revenue_category_name': 'Bonus'},
        {'revenue_category_name': 'Investment'},
        {'revenue_category_name': 'Others'}
    ]

    for category_data in expense_categories:
        category = Expense_Category(expense_category_name=category_data['expense_category_name'])
        db.session.add(category)

    for category_data in revenue_categories:
        category = Revenue_Category(revenue_category_name=category_data['revenue_category_name'])
        db.session.add(category)

    db.session.commit()


# check if the user_id exist
def validate_expense_transaction_id(user_id, expense_transaction_id):
    try:
        expense_transaction_id = int(expense_transaction_id)
    except:
        abort(401, "User_id {} is not an integer".format(expense_transaction_id))

    expense_transaction = db.session.query(Expense_transaction).get(expense_transaction_id)

    if expense_transaction.user_id != user_id:
        abort(
            401, "review_id {} does not belong to user_id {}".format(expense_transaction_id, user_id)
        )
    return expense_transaction_id


def get_user_expense_transactions(user_id):
    transactions = Expense_transaction.query.filter_by(user_id=user_id).all()
    return transactions

def get_user_revenue_transactions(user_id):
    transactions = Revenue_transaction.query.filter_by(user_id=user_id).all()
    return transactions

def serialize_expense_transaction(transaction):
    return {
        "expense_transaction_id": transaction.expense_transaction_id,
        "date": transaction.expense_transaction_datetime.strftime("%Y-%m-%d"),  # Convert date to string format
        "category": transaction.expense_category_id,
        "amount": transaction.expense_transaction_amount,
        "description": transaction.expense_transaction_description,
    }

def delete_expense_transaction(expense_transaction_id):
    transaction = db.session.get(Expense_transaction, expense_transaction_id)
    if transaction is None:
        raise ValueError("Transaction not found for ID: {}".format(expense_transaction_id))
    db.session.delete(transaction)
    db.session.commit()


def delete_revenue_transaction(revenue_transaction_id):
    transaction = db.session.get(Expense_transaction, revenue_transaction_id)
    if transaction is None:
        raise ValueError("Transaction not found for ID: {}".format(revenue_transaction_id))
    db.session.delete(transaction)
    db.session.commit()


def validate_revenue_transaction_id(user_id, revenue_transaction_id):
    try:
        revenue_transaction_id = int(revenue_transaction_id)
    except:
        abort(401, "User_id {} is not an integer".format(revenue_transaction_id))

    expense_transaction = db.session.query(Revenue_transaction).get(revenue_transaction_id)

    if expense_transaction.user_id != user_id:
        abort(
            401, "review_id {} does not belong to user_id {}".format(revenue_transaction_id, user_id)
        )
    return revenue_transaction_id


def serialize_revenue_transaction(transaction):
    return {
        "revenue_transaction_id": transaction.revenue_transaction_id,
        "date": transaction.revenue_transaction_datetime.strftime("%Y-%m-%d"),  # Convert date to string format
        "category": transaction.revenue_category_id,
        "amount": transaction.revenue_transaction_amount,
        "description": transaction.revenue_transaction_description,
    }