from app.models import db, User

def seed_follows():
    demo = User.query.get(1)
    kat = User.query.get(4)
    marnie = User.query.get(2)
    bobbie = User.query.get(3)
    kat2 = User.query.get(5)
    kat3 = User.query.get(6)

    demo.follow(kat)
    demo.follow(marnie)
    demo.follow(bobbie)

    kat.follow(demo)
    kat.follow(marnie)

    db.session.add(demo)
    db.session.add(kat)
    db.session.commit()
