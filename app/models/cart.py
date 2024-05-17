from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    menu_item_id = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    status = db.Column(db.String)
