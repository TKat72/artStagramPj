from app.models import db, User, Post

def seed_likes():
    demo = User.query.get(1)
    kat = User.query.get(4)
    post1 = Post.query.get(1)
    post2 = Post.query.get(2)
    post4Kat = Post.query.get(4)
    post3 = Post.query.get(3)
    post4Kat = Post.query.get(5)

    demo.like(post4Kat)
    demo.like(post3Kat)

    kat.like(post1)
    kat.like(post2)

    db.session.add(demo)
    db.session.add(kat)
    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
