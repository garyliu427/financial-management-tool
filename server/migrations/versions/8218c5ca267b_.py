"""empty message

Revision ID: 8218c5ca267b
Revises: bce108617ad4
Create Date: 2023-06-06 18:18:13.584899

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '8218c5ca267b'
down_revision = 'bce108617ad4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('revenue_transaction', schema=None) as batch_op:
        batch_op.add_column(sa.Column('revenue_transaction_amount', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('revenue_transaction_datetime', sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column('revenue_transaction_description', sa.String(length=100), nullable=False))
        batch_op.drop_column('revenue_description')
        batch_op.drop_column('revenue_amount')
        batch_op.drop_column('revenue_datetime')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('revenue_transaction', schema=None) as batch_op:
        batch_op.add_column(sa.Column('revenue_datetime', mysql.DATETIME(), nullable=True))
        batch_op.add_column(sa.Column('revenue_amount', mysql.FLOAT(), nullable=False))
        batch_op.add_column(sa.Column('revenue_description', mysql.VARCHAR(length=100), nullable=False))
        batch_op.drop_column('revenue_transaction_description')
        batch_op.drop_column('revenue_transaction_datetime')
        batch_op.drop_column('revenue_transaction_amount')

    # ### end Alembic commands ###
