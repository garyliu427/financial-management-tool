import pymysql
from flask import Flask
from flask_restx import Api
from flask_cors import CORS
from exts import db, migrate
from utils.util import initialize_categories
from db.models import Expense_Category, Revenue_Category

MYSQL_HOST = 'localhost'
MYSQL_PORT = 3306
MYSQL_USER = 'root'
MYSQL_PASSWORD = '990427aBc'
MYSQL_DB = 'finance_management'
# Database URI for SQLAlchemy
DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8mb4'.format(MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT, MYSQL_DB)
SQLALCHEMY_DATABASE_URI_STRING = DB_URI


api = Api(
    title="Finance Management",
    version="1.0",
    description="Your personal finance management system",
)


class Config:
    SECRET_KEY = "your_secret_key"
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI_STRING


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI_STRING


def create_app(config_class=ProductionConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.url_map.strict_slashes = False

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)

    with app.app_context():
        if Expense_Category.query.count() == 0 or Revenue_Category.query.count() == 0:  # if Category is empty, initialize it
            initialize_categories()
        

    # Register your API routes here, e.g.
    from api import (
        auth,
        account,
        expense,
        revenue,
    )

    api.add_namespace(auth.api)
    api.add_namespace(account.api)
    api.add_namespace(expense.api)
    api.add_namespace(revenue.api)

    return app