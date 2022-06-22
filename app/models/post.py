from .db import db
from .tagged_post import tagged_posts

likes = db.Table('likes',
    db.Column('post_id', db.Integer, db.ForeignKey('posts.id', ondelete="CASCADE"), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"),primary_key=True))


class Post(db.Model):
    __tablename__ = 'posts'
    # __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)


    user = db.relationship("User", back_populates="posts")
    photos = db.relationship("Photo", back_populates="post", cascade="all, delete")
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete")
    tags = db.relationship("Tag", back_populates="posts",secondary=tagged_posts )
    users_likes = db.relationship("User",secondary=likes, back_populates="liked_post")

    def post_likes(self):
        users = self.users_likes
        all_users ={}
        for user in users:
            all_users[user.id] = {
                "username": user.username,
                "id": user.id,
                "email": user.email
            }
        return all_users

    def photos_to_dict(self):
        return {"test":[photo.to_dict() for photo in self.photos]}

    def tags_to_dict(self):
        return {"tags": [tag.to_dict() for tag in self.tags]}

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'user_id': self.user_id,
            "username": self.user.username,
            'photos': [photo.to_dict() for photo in self.photos],
            'likes': self.post_likes(),
            'comments': [comment.to_dict() for comment in self.comments],
            'tags': [tag.to_dict() for tag in self.tags],
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at),

        }
