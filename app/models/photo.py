from .db import db

class Photo(db.Model):
    __tablename__ = 'photos'

    id  = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    photo_url = db.Column(db.String(500), nullable=False)

    post = db.relationship("Post",back_populates="photos")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'photo_url': self.photo_url
        }
