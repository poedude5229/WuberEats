from .db import db, environment, SCHEMA, add_prefix_for_prod

class Reviews(db.Model):
  __tablename__ = 'reviews'

  if environment == 'production':
    __table_args__ = {'schema' : SCHEMA}

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, nullable = False)
  restaurant_id = db.Column(db.Integer, nullable = False)
  review = db.Column(db.String(255), nullable = False)
  rating = db.Column(db.Integer, nullable = False)
