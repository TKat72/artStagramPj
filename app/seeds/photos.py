from app.models import db, Photo


def seed_photos():
    p1= Photo(photo_url="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.cartoondistrict.com%2Fwp-content%2Fuploads%2F2017%2F03%2Fdifferent-types-of-paintings-and-techniques-830x450.jpg&f=1&nofb=1", user_id=1, post_id=1)
    p2= Photo(photo_url="https://www.timeoutdubai.com/public/images/2019/12/17/outdoors-art-uae3.jpg", user_id=1, post_id=1)
    p3= Photo(photo_url="http://cdn.designbump.com/wp-content/uploads/2014/08/street-art-17.jpg", user_id=1, post_id=1)
    p4= Photo(photo_url="https://i.etsystatic.com/15747752/r/il/8e1565/2248241385/il_fullxfull.2248241385_49gw.jpg", user_id=1, post_id=2)
    p5= Photo(photo_url="https://artcollider.net/wp-content/uploads/2014/11/AC-AU003-1.jpg", user_id=2, post_id=3)
    p6= Photo(photo_url="https://artstargarm2-backet.s3.amazonaws.com/000e25f809fb48bb8f5756d5d1f86f56.jpeg", user_id=4, post_id=4)
    p7= Photo(photo_url="https://artstargarm2-backet.s3.amazonaws.com/0011a7fb910f4f1b923e012fb9b4e642.png", user_id=4, post_id=5)

    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.add(p5)
    db.session.add(p6)
    db.session.add(p7)
    db.session.commit()

def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
