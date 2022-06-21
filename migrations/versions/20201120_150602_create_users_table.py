"""create_users_table

Revision ID: ffdc0a98111c
Revises:
Create Date: 2020-11-20 15:06:02.230689

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ffdc0a98111c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at',sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete="CASCADE")
    )
    op.create_table('photos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('photo_url', sa.String(500), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'],  onupdate="CASCADE", ondelete="SET NULL")
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.Column('comment',sa.String(1000), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], onupdate="CASCADE", ondelete="SET NULL"),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], onupdate="CASCADE", ondelete="SET NULL"),

    )
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tag_name',sa.String(),nullable=False, unique=True),
    sa.PrimaryKeyConstraint('id'),
    )
    op.create_table('tagged_posts',
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id']),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id']),
    )
    # op.create_table('follows',
    # sa.Column('followed_id', sa.Integer(), nullable=False),
    # sa.Column('follower_id', sa.Integer(), nullable=False),
    # sa.ForeignKeyConstraint(['followed_id'], ['users.id']),
    # sa.ForeignKeyConstraint(['follower_id'], ['users.id']),
    # )
    op.create_table('followers',
    sa.Column('follower_id', sa.Integer(), nullable=False),
    sa.Column('followed_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id']),
    sa.ForeignKeyConstraint(['followed_id'], ['users.id']),
    )
    op.create_table('likes',
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id']),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    )



def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    op.drop_table('tagged_posts')
    op.drop_table('tags')
    op.drop_table('followers')
    op.drop_table('comments')
    op.drop_table('photos')
    op.drop_table('posts')
    op.drop_table('users')




    # ### end Alembic commands ###
