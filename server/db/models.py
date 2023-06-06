from datetime import datetime
from config import db

class User(db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    create_time = db.Column(db.DateTime, default=datetime.now)
    is_active = db.Column(db.Boolean, default=True)
    

class Expense_Category(db.Model):
    __tablename__ = 'expense_category'
    expense_category_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    expense_category_name = db.Column(db.String(50), nullable=False)


class Expense_transaction(db.Model):
    __tablename__ = 'expense_transaction'
    expense_transaction_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    expense_category_id = db.Column(db.Integer, db.ForeignKey('expense_category.expense_category_id'))
    expense_transaction_amount = db.Column(db.Float, nullable=False)
    expense_transaction_datetime = db.Column(db.DateTime, default=datetime.now)
    expense_transaction_description = db.Column(db.String(100), nullable=False)


class Revenue_Category(db.Model):
    __tablename__ = 'revenue_category'
    revenue_category_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    revenue_category_name = db.Column(db.String(50), nullable=False)


class Revenue_transaction(db.Model):
    __tablename__ = 'revenue_transaction'
    revenue_transaction_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    revenue_category_id = db.Column(db.Integer, db.ForeignKey('revenue_category.revenue_category_id'))
    revenue_transaction_amount = db.Column(db.Float, nullable=False)
    revenue_transaction_datetime = db.Column(db.DateTime, default=datetime.now)
    revenue_transaction_description = db.Column(db.String(100), nullable=False)

