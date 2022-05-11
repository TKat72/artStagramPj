from app.models import db,Comment
from datetime import datetime
import pytz


def seed_comments():
    c1= Comment(post_id=1,user_id=3, comment=" Very pritty",created_at=datetime.now(), updated_at=datetime.now())
    c2= Comment(post_id=2,user_id=1, comment="impresive work, great job", created_at=datetime.now(), updated_at=datetime.now())

    c4 = Comment(post_id=1,user_id=1, comment="Love my work", created_at=datetime.now(), updated_at=datetime.now())

    db.session.add(c1)
    db.session.add(c2)

    db.session.add(c4)
    db.session.commit()
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
