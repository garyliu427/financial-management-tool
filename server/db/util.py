from db.models import *
from sqlalchemy import func
from math import ceil
import random
import string

# generate a random password that meet the constraints
def generate_password():
    uppercase_letters = string.ascii_uppercase
    lowercase_letters = string.ascii_lowercase
    numbers = string.digits

    password = []

    password.append(random.choice(uppercase_letters))
    password.append(random.choice(lowercase_letters))
    password.append(random.choice(numbers))

    for _ in range(7):
        char_set = random.choice([uppercase_letters, lowercase_letters, numbers])
        password.append(random.choice(char_set))

    random.shuffle(password)

    return "".join(password)



# check if the email is unique
def is_email_taken(email):
    query = db.session.query(User).filter(User.email == email).all()

    return len(query) != 0


# insert new user
def insert_new_user(username, password, email):
    new_user = User(username=username, password=password, email=email)

    db.session.add(new_user)
    db.session.commit()



# reset an account with the given email,
# password change to a random generated one,
# assume the email is valid
def reset_password(email):
    user = db.session.query(User).filter(User.email == email).first()

    new_password = generate_password()
    user.password = new_password
    db.session.commit()
    return new_password


def get_user_detail(user_id):
    user = db.session.get(User, user_id)
    return user


def update_profile(user_id, password, username):
    user = db.session.get(User, user_id)

    if password is not None:
        user.password = password
    if username is not None:
        user.username = username

    db.session.commit()


def delete_profile(user_id):
    db.session.query(User).filter(User.user_id == user_id).delete()

    db.session.commit()


def insert_new_expense(user_id, amount, category, description, date):
    new_expense = Expense_transaction(
        user_id=user_id,
        expense_category_id=category,
        expense_transaction_amount=amount,
        expense_transaction_description=description,
        expense_transaction_datetime=date,
    )

    db.session.add(new_expense)
    db.session.commit()


def edit_expense_transaction(expense_transaction_id, amount, category, description, date):
    expense = db.session.get(Expense_transaction, expense_transaction_id)
    if amount is not None:
        expense.expense_transaction_amount = amount
    if date is not None:
        expense.expense_transaction_datetime = date
    if description is not None:
        expense.expense_transaction_description = description
    if category is not None:
        expense.expense_category_id = category
    db.session.commit()


def insert_new_revenue(user_id, amount, category, description, date):
    new_revenue = Revenue_transaction(
        user_id=user_id,
        revenue_category_id=category,
        revenue_transaction_amount=amount,
        revenue_transaction_description=description,
        revenue_transaction_datetime=date,
    )

    db.session.add(new_revenue)
    db.session.commit()


def edit_expense_transaction(expense_transaction_id, amount, category, description, date):
    expense = db.session.get(Expense_transaction, expense_transaction_id)
    if amount is not None:
        expense.expense_transaction_amount = amount
    if date is not None:
        expense.expense_transaction_datetime = date
    if description is not None:
        expense.expense_transaction_description = description
    if category is not None:
        expense.expense_category_id = category
    db.session.commit()