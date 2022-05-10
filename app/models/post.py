from .db import db



class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)


    user = db.relationship("User", back_populates="posts")
    photos = db.relationship("Photo", back_populates="post", cascade="all, delete")
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete")


    def photos_to_dict(self):
        return {"test":[photo.to_dict() for photo in self.photos]}


    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'user_id': self.user_id,
            'photos': [photo.to_dict() for photo in self.photos],
            'created_at': self.created_at,
            'updated_at': self.updated_at,

        }
