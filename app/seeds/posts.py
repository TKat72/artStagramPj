from app.models import db, Post
from datetime import datetime
import pytz

def seed_posts():
    p1 = Post(
        user_id=1,
        description=" This firts seed for post ",
        created_at=datetime.now(), updated_at=datetime.now()
    )
    p2 = Post(
        user_id=1,
        description=" This second seed for post ",
       created_at=datetime.now(), updated_at=datetime.now()
    )
    p3 = Post(
        user_id=2,
        description=" This therd seed for post ",
        created_at=datetime.now(), updated_at=datetime.now()
    )
    p4 = Post(
        user_id=4,
        description=" somthing somthing somthing",
        created_at=datetime.now(), updated_at=datetime.now()
    )
    p5 = Post(
        user_id=4,
        description=" somthing2 somthing2 somthing2",
        created_at=datetime.now(), updated_at=datetime.now()
    )

    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.add(p5)
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
