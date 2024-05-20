from flask import Blueprint, jsonify, json, request, redirect
from app.models import Restaurant, Review, db
from flask_login import login_required, current_user
from ..forms import ReviewForm
restaurant_routes = Blueprint('restaurants', __name__)


# Get all the restaurants
@restaurant_routes.route("/")
def restaurants():

    fetched_restaurants = Restaurant.query.all()
    return {'restaurants': [restaurant.to_dict() for restaurant in fetched_restaurants]}


# @restaurant_routes.route("/new")
# def newrestaurant():



# Create a Restaurant
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



# Get Individual Restaurant
@restaurant_routes.route("/<int:id>")
def get_restaurant_by_id(id):
    fetched = Restaurant.query.get(id)
    if fetched:
        return jsonify(fetched.to_dict())
    else: return {  "message": "Restaurant couldn't be found" }, 404



# Get Individual Restaurant's Reviews
@restaurant_routes.route("<int:id>/reviews")
def get_restaurant_reviews(id):

  restaurant_reviews = Review.query.filter_by(restaurant_id = id).all

  all_reviews = {"reviews": [eachReview.to_dict() for eachReview in restaurant_reviews]}


  return jsonify(all_reviews.to_dict())


# Create Review for Restaurant
@restaurant_routes.route("<int:id>/reviews", methods=["POST"])
@login_required
def create_review(id):

  form = ReviewForm()

  if form.validate_on_submit():
    new_review = Review(
      user_id = current_user.id,
      restaurant_id = id,
      review = form.data["review"],
      rating = form.data["rating"],
    )

  db.session.add(new_review)
  db.session.commit()

  return [new_review.to_dict()]


# Update Review
@restaurant_routes.route("<int:id>/reviews/<int:reviewId>", methods=["PUT"])
@login_required
def update_review(reviewId):

  form = ReviewForm()

  form["csrf_token"].data = request.cookies["csrf_token"]

  indvReview = Review.query.get(reviewId)

  if not indvReview:
    return {"message": "Review couldn't be found"}, 404

  if form.validate_on_submit():
    indvReview.review = form.data["review"],
    indvReview.rating = form.data["rating"],

    db.session.commit()
    return indvReview.to_dict(), 200

  return form.errors, 400


# Delete Review
@restaurant_post.route("<int:id>/reviews/<int:reviewId>")
@login_required
def delete_review(reviewId):
  individual_review = Review.query.get(reviewId)

  if not individual_review:
    return {"message": "Review couldn't be found"}, 404
  else:
    db.session.delete(individual_review)
    db.session.commit()

  return redirect("/restaurants"), 200
