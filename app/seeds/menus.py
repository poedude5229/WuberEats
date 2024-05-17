from app.models import Menu, db, environment, SCHEMA
from app.models.menu import Menu
from faker import Faker
from sqlalchemy.sql import text

fake = Faker()

def seed_menus():
    menus = []
    categories = ['Appetizers','Main Courses','Desserts','Beverages','Sides']

    # for _ in range (menu):
    #     menu = Menu(
    #         restaurant_id=fake.random_int(min=1, max=8),
    #         name=fake.sentence(nb_words=3),
    #         description=fake.paragraph(db_sentence=3),
    #         price=f"${fake.random_number(digits=2)}",
    #         category=fake.random_element(categories),
    #         is_available=fake.boolean(change_of_getting_true=75)
    #     )

    #     menus.append(menu)
    mikita_burger = Menu(
        restaurant_id=1,
        name="Mikita Burger",
        description="Creamy. Cheesy. Got that ranch on there. Maybe also some bacon on there. You decide how you want it",
        price=25,
        category="Main Courses",
        is_available=fake.boolean(chance_of_getting_true=75),
        image_url=""
    )

    bruh_fries = Menu(
        restaurant_id=1,
        name="Bruh Fries",
        description="Freezer Fresh. Never from scratch. We buy these from Sysco, and you buy them for 4 vbucks. We carefully add a pound of seasoned salt to each pound of fries straight out the fryer.",
        price=4,
        category="Sides",
        is_available=True,
        image_url=""
    )

    cup_of_ranch = Menu(
        restaurant_id=1,
        name="Cup of Ranch",
        description="Crispy. Crunchy. Ranch. We offer this",
        price=1,
        category="Sides",
        is_available=True,
        image_url=""
    )

    dr_thunder = Menu(
        restaurant_id=1,
        name="Dr. Thunder",
        description="We love Dr. Thunder around here. We love it so much that it's the only beverage we have.",
        price=0,
        category="Beverages",
        is_available=True,
        image_url="https://i5.walmartimages.com/asr/db486999-c71a-45a6-9f6b-8f988ac0bfb9.edd849a47fb7fa980eeb8b608caae97b.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
    )

    plywood = Menu(
        restaurant_id=2,
        name="Plywood",
        description="Mmmm plywood... Normally you build a house out of this, but today you can tear down your hunger and take a bite.",
        price=12,
        category="Main Courses",
        is_available=True,

    )

    for menu in menus:
        db.session.add(menu)

    db.session.commit()


def undo_menu():
    if environment == "production":
        db.session.execute(f"TRUCATE table {SCHEMA}.menu RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu"))

    db.session.commit()
