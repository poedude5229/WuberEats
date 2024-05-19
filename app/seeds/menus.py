from app.models import Menu, db, environment, SCHEMA
from sqlalchemy.sql import text



def seed_menus():
    

    menu_items = [
    {
        "restaurant_id": 1,
        "name": "Mikita Burger",
        "description": "Creamy. Cheesy. Got that ranch on there. Maybe also some bacon on there. You decide how you want it",
        "price": 25,
        "category": "Main Courses",
        "is_available": True,
        "image_url": ""
    },
    {
        "restaurant_id": 1,
        "name": "Bruh Fries",
        "description": "Freezer Fresh. Never from scratch. We buy these from Sysco, and you buy them for 4 vbucks. We carefully add a pound of seasoned salt to each pound of fries straight out the fryer.",
        "price": 4,
        "category": "Sides",
        "is_available": True,
        "image_url": ""
    },
    {
        "restaurant_id": 1,
        "name": "Cup of Ranch",
        "description": "Crispy. Crunchy. Ranch. We offer this",
        "price": 1,
        "category": "Sides",
        "is_available": True,
        "image_url": ""
    },
    {
        "restaurant_id": 1,
        "name": "Dr. Thunder",
        "description": "We love Dr. Thunder around here. We love it so much that it's the only beverage we have.",
        "price": 0,
        "category": "Beverages",
        "is_available": True,
        "image_url": "https://i5.walmartimages.com/asr/db486999-c71a-45a6-9f6b-8f988ac0bfb9.edd849a47fb7fa980eeb8b608caae97b.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
    },
    {
        "restaurant_id": 2,
        "name": "Plywood",
        "description": "Mmmm plywood... Normally you build a house out of this, but today you can tear down your hunger and take a bite.",
        "price": 12,
        "category": "Main Courses",
        "is_available": True,
        "image_url": ""
    }
]

    for item in menu_items:
        menu = Menu(
            restaurant_id=item["restaurant_id"],
            name=item["name"],
            description=item["description"],
            price=item["price"],
            category=item["category"],
            is_available=item["is_available"],
            image_url=item["image_url"]
        )
        db.session.add(menu)
    db.session.commit()


def undo_menus():
    if environment == "production":
        db.session.execute(f"TRUCATE table {SCHEMA}.menu RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu"))

    db.session.commit()
