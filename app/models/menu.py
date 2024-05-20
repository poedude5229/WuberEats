from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
class Menu(db.Model):
    __tablename__ = "menu"

    if environment == "production":
        __table_args__ = {"schema":SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurant.id')), nullable=False)
    name = db.Column(db.String(55), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(55))
    is_available = db.Column(db.Boolean)
    image_url = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    restaurants = db.relationship('Restaurant', back_populates='menus')
    carts = db.relationship('Cart', back_populates='menus')


    def to_dict(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category': self.category,
            'is_available': self.is_available,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at


        }
