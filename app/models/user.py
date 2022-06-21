from .db import db
from .follows import follows
from .post import likes
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'))
)

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

    liked_post = db.relationship(
        "Post",
        secondary=likes,
        back_populates="users_likes"
    )
    # followers = db.relationship(
    #     "User",
    #     secondary=follows,
    #     primaryjoin=(follows.c.follower_id == id),
    #     secondaryjoin=(follows.c.followed_id == id),
    #     backref=db.backref("following", lazy="dynamic"),
    #     lazy="dynamic"
    # )
    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic'
    )
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def like(self, post):
        self.liked_post.append(post)
        db.session.add(self)
        db.session.commit()

    def unlike(self, post):
        print(" ++++++++ in unlike ", post)
        self.liked_post.remove(post)
        db.session.add(self)
        db.session.commit()

    def liked_post_to_dict(self):
        liked_posts ={}
        return {"liked_posts": [post.to_dict() for post in self.liked_post]}

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def comments_to_dict(self):
        return [comment.to_dict() for comment in self.comments]

    def post_to_dict(self):
        return [post.to_dict() for post in self.posts]

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0

    def follow(self, user):
        if not self.is_following(user) and user.id != self.id:
            self.followed.append(user)
            db.session.add(self)
            db.session.commit()

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)
            db.session.add(self)
            db.session.commit()

    def followed_users(self):
        users = self.followed
        followed_ids = {}
        for user in users:
            followed_ids[user.id] = {
                'id': user.id,
                'username': user.username,
                'email': user.email,

            }
        return followed_ids

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            # 'followers': self.followers,
            # 'follows': self.following,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at),
            'comments': self.comments_to_dict(),
            'posts': self.post_to_dict(),



        }
