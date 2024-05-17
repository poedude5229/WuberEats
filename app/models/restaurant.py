from .db import db, environment,SCHEMA,add_prefix_for_prod


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)
    cuisine = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    hours_of_operation = db.Column(db.String(255), nullable=False)
    delivery_radius = db.Column(db.Integer)
    cover_image = db.Column(db.String, nullable=False)
