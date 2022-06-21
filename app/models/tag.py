from .db import db
from .tagged_post import tagged_posts



class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(25))

    posts = db.relationship("Post", back_populates="tags",secondary=tagged_posts)

    def to_dict(self):
        return {
            'id': self.id,
            'tag_name': self.tag_name

        }
