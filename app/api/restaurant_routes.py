from flask import Blueprint, jsonify
from app.models import Restaurant

restaurant_routes = Blueprint('restaurants', __name__)

@restaurant_routes.route("/")
def restaurants():

    fetched_restaurants = Restaurant.query.all()
    return {'restaurants': [restaurant.to_dict() for restaurant in fetched_restaurants]}
