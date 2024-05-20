from .db import db, environment,SCHEMA,add_prefix_for_prod
from datetime import datetime

class Restaurant(db.Model):
    __tablename__ = 'restaurant'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(10), nullable=False)
    cuisine = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    hours_of_operation = db.Column(db.String(255), nullable=False)
    delivery_radius = db.Column(db.Integer)
    cover_image = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    reviews = db.relationship('Review', back_populates='restaurants', cascade='all, delete-orphan')
    menus = db.relationship('Menu', back_populates='restaurants', cascade='all, delete-orphan', single_parent=True)
    # user = db.Relationship('User', back_populates='restaurant', cascade='all, delete-orphan')


    def to_dict(self):

        # reviews = [
        # {**review.to_dict(), "restaurant": review.user.to_dict()}
        # for review in self.reviews
        # ]

        return {
                'id': self.id,
                'owner_id': self.owner_id,
                'name': self.name,
                'address': self.address,
                'phone_number': self.phone_number,
                'cuisine': self.cuisine,
                "description": self.description,
                "hours_of_operation": self.hours_of_operation,
                "delivery_radius": self.delivery_radius,
                "cover_image": self.cover_image,
                'reviews': [review.to_dict() for review in self.reviews],
                'created_at': self.created_at,
                'updated_at': self.updated_at
            }
