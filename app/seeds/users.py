from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Joe', firstname="Joe", lastname="Mama", email='Joe@gmail.com', address='123 Maple Avenue', role="owner", password='password')
    veronica = User(
        username='Veronica', firstname="Veronica", lastname="Flatto", email='veronica@gmail.com', address='456 Elm Street',  role="owner", password='password')
    andres = User(
        username='andres', firstname="Andres", lastname="Mercado", email='andres@gmail.com', address='789 Oak Lane',  role="owner",   password='password')
    sleepyzach = User(
        username='zach', firstname="Sick", lastname="Lad", email='sleepboy@gmail.com', address='101 Pine Road', role="owner", password='takesomevitamins'
    )
    demo_user = User(
        username='bot', firstname="botfirst", lastname="botsecond", email='bot@gmail.com', address='202 Birch Boulevard', role="user", password='password1'
    )
    db.session.add(demo)
    db.session.add(veronica)
    db.session.add(andres)
    db.session.add(sleepyzach)
    db.session.add(demo_user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user"))

    db.session.commit()
