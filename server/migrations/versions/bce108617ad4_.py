"""empty message

Revision ID: bce108617ad4
Revises: 
Create Date: 2023-06-06 17:57:45.530760

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bce108617ad4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('expense_category',
    sa.Column('expense_category_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('expense_category_name', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('expense_category_id')
    )
    op.create_table('revenue_category',
    sa.Column('revenue_category_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('revenue_category_name', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('revenue_category_id')
    )
    op.create_table('user',
    sa.Column('user_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('password', sa.String(length=100), nullable=False),
    sa.Column('create_time', sa.DateTime(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('expense_transaction',
    sa.Column('expense_transaction_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('expense_category_id', sa.Integer(), nullable=True),
    sa.Column('expense_transaction_amount', sa.Float(), nullable=False),
    sa.Column('expense_transaction_datetime', sa.DateTime(), nullable=True),
    sa.Column('expense_transaction_description', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['expense_category_id'], ['expense_category.expense_category_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('expense_transaction_id')
    )
    op.create_table('revenue_transaction',
    sa.Column('revenue_transaction_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('revenue_category_id', sa.Integer(), nullable=True),
    sa.Column('revenue_amount', sa.Float(), nullable=False),
    sa.Column('revenue_datetime', sa.DateTime(), nullable=True),
    sa.Column('revenue_description', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['revenue_category_id'], ['revenue_category.revenue_category_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('revenue_transaction_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('revenue_transaction')
    op.drop_table('expense_transaction')
    op.drop_table('user')
    op.drop_table('revenue_category')
    op.drop_table('expense_category')
    # ### end Alembic commands ###
