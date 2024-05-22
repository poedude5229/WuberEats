from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    menu_item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('menu.id')), nullable=False)
    total_price = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    status = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # user = db.Relationship('User', back_populates='cart')
    menus = db.relationship('Menu', back_populates='carts', cascade='all, delete-orphan',single_parent=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'menu_item_id': self.menu_item_id,
            'total_price': self.total_price,
            'quantity': self.quantity,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at

        }
