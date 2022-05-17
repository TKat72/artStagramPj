from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    posts = db.relationship("Post", back_populates="user", cascade="all, delete")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    def comments_to_dict(self):
        return [comment.to_dict() for comment in self.comments]
    def post_to_dict(self):
        return [post.to_dict() for post in self.posts]
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at),
            'comments': self.comments_to_dict(),
            'posts': self.post_to_dict(),



        }
