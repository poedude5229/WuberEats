from .db import db, environment, SCHEMA, add_prefix_for_prod

class Menu(db.Model):
    __tablename__ = "menu"

    if environment == "production":
        __table_args__ = {"schema":SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(55), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(55))
    is_available = db.Column(db.Boolean)
    image_url = db.Column(db.String, nullable=False)
