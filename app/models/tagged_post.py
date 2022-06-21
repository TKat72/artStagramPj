from .db import db

tagged_posts = db.Table(
    "tagged_posts",
    db.Column("tag_id",db.Integer, db.ForeignKey("tags.id"), primary_key=True),
    db.Column("post_id",db.Integer, db.ForeignKey("posts.id"), primary_key=True)
)
