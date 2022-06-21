from app.models import db, User
from datetime import datetime
import pytz

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', created_at=datetime.now(pytz.timezone('US/Pacific')), updated_at=datetime.now(pytz.timezone('US/Central')))
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', created_at=datetime.now(pytz.timezone('US/Central')), updated_at=datetime.now(pytz.timezone('US/Central')))
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', created_at=datetime.now(pytz.timezone('US/Central')), updated_at=datetime.now(pytz.timezone('US/Central')))

    kat = User(
        username='kat', email='kat@gaa.io' password='password', created_at=datetime.now(pytz.timezone('US/Central')), updated_at=datetime.now(pytz.timezone('US/Central')))

    kat2 = User(
        username='kat2', email='kat2@gaa.io' password='password', created_at=datetime.now(pytz.timezone('US/Central')), updated_at=datetime.now(pytz.timezone('US/Central')))

    kat3 = User(
        username='kat3', email='kat3@gaa.io' password='password', created_at=datetime.now(pytz.timezone('US/Central')), updated_at=datetime.now(pytz.timezone('US/Central')))

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kat)
    db.session.add(kat2)
    db.session.add(kat3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
