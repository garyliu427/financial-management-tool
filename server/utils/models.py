from flask_restx import fields, reqparse
from config import api


# authorization token header
auth_header = reqparse.RequestParser()

auth_header.add_argument(
    "Authorization",
    type=str,
    help="Authorization token in the header",
    required=True,
    location="headers",
)


# when login, give the email and password
login_model = api.model(
    "login",
    {
        "email": fields.String(required=True, example="cblxxlx@gmail.com"),
        "password": fields.String(required=True, example="12345678aBc"),
    },
)


# when signup, give email, password, username
signup_model = api.model(
    "signup",
    {
        "email": fields.String(required=True, example="lhodges@example.net"),
        "password": fields.String(required=True, example="(%2!RcUZk^sdfsfds"),
        "username": fields.String(required=True, example="shiny day"),
    },
)


# reset password, require the email
reset_pwd_model = api.model(
    "reset password",
    {"email": fields.String(required=True, example="oscott@example.net")},
)


logout_model = api.model(
    "logout",
    {"email": fields.String(required=True, example="cblxxlx@gmail.com")},
)


# edit profile, provide username, email, password
edit_profile_model = api.model(
    "edit_profile",
    {
        "username": fields.String(required=False),
        "password": fields.String(required=False),
    },
)

add_expense_model = api.model(
    "add_expense",
    {
        "amount": fields.Float(required=True, example=123.45),
        "category": fields.Integer(required=True, example=1),
        "description": fields.String(required=True, example="buy a burger"),
        "date": fields.String(required=True, example="2021-01-01"),
    },
)

edit_expense_model = api.model(
    "edit_expense",
    {   
        "amount": fields.Float(required=True, example=150.45),
        "category": fields.Integer(required=True, example=1),
        "description": fields.String(required=True, example="buy a burger"),
        "date": fields.String(required=True, example="2021-01-01"),
    },
)

add_revenue_model = api.model(
    "add_revenue",
    {
        "amount": fields.Float(required=True, example=1000.45),
        "category": fields.Integer(required=True, example=1),
        "description": fields.String(required=True, example="payslip"),
        "date": fields.String(required=True, example="2023-02-01"),
    },
)

edit_revenue_model = api.model(
    "edit_revenue",
    {
        "amount": fields.Float(required=True, example=123.45),
        "category": fields.Integer(required=True, example=1),
        "description": fields.String(required=True, example="buy a burger"),
        "date": fields.String(required=True, example="2021-01-01"),
    },
)