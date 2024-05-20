from flask import Blueprint, jsonify, json, request
from app.models import Restaurant, db
from flask_login import login_required, current_user
restaurant_routes = Blueprint('restaurants', __name__)

@restaurant_routes.route("/")
def restaurants():

    fetched_restaurants = Restaurant.query.all()
    return {'restaurants': [restaurant.to_dict() for restaurant in fetched_restaurants]}


# @restaurant_routes.route("/new")
# def newrestaurant():


@restaurant_routes.route("/", methods=["POST"])
@login_required
def restaurant_post():
    data = request.get_json()
    new = Restaurant(
        owner_id=current_user.id,
        name=data['name'],
        address=data['address'],
        phone_number=data['phone_number'],
        cuisine=data['cuisine'],
        description=data['description'],
        hours_of_operation=data['hours_of_operation'],
        delivery_radius=data['deliver_radius',1],
        cover_image=data['cover_image']
    )

    db.session.add(new)
    db.session.commit()

    return jsonify(new.to_dict()), 201

@restaurant_routes.route("/<int:id>")
def get_restaurant_by_id(id):
    fetched = Restaurant.query.get(id)
    if fetched:
        return jsonify(fetched.to_dict())
    else: return {  "message": "Restaurant couldn't be found" }, 404
