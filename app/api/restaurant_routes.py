from flask import Blueprint, jsonify, json, request, redirect
from app.models import Restaurant, Review, Menu, db
from flask_login import login_required, current_user
from app.forms.reviews_form import ReviewForm
from app.forms.menu_form import MenuForm
restaurant_routes = Blueprint('restaurants', __name__)


# Get all the restaurants
@restaurant_routes.route("/")
def restaurants():

    fetched_restaurants = Restaurant.query.all()
    restaurant_menus = []
    for restaurant in fetched_restaurants:
       restaurant_dict = restaurant.to_dict()
       print(len(restaurant_dict['reviews']))
       menu_items = Menu.query.filter(Menu.restaurant_id == restaurant.id).all()
       restaurant_dict['menu_items'] = [item.to_dict() for item in menu_items]
       total_rating = 0
       if len(restaurant_dict['reviews']) > 0:
          total_rating = (sum(review['rating'] for review in restaurant_dict['reviews']) / len(restaurant_dict['reviews'])) or 0
       restaurant_dict['avgrating'] = total_rating
       restaurant_menus.append(restaurant_dict)
    return {'restaurants':restaurant_menus}

    # return {'restaurants': [restaurant.to_dict() for restaurant in fetched_restaurants]}


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
@restaurant_routes.route("/<int:id>", methods=["GET"])
def get_restaurant_by_id(id):
    fetched = Restaurant.query.get(id)
    restmenu = []
    if fetched:
        restaurant_dict = fetched.to_dict()
        total_rating = (sum(review['rating'] for review in restaurant_dict['reviews']) / len(restaurant_dict['reviews']))
        # print(total_rating)
        menu_items = Menu.query.filter(Menu.restaurant_id == fetched.id).all()
        restaurant_dict['menu_items'] = [item.to_dict() for item in menu_items]
        restaurant_dict['avgrating'] = total_rating
        restmenu.append(restaurant_dict)
        return jsonify(restmenu)
    else: return {  "message": "Restaurant couldn't be found" }, 404


@restaurant_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_restaurant_by_id(id):
   got_restaurant = Restaurant.query.get(id)
   if not got_restaurant:
      return {"message":"Can't find the restaurant to delete"}, 404
   else:
      db.session.delete(got_restaurant)
      db.session.commit()
      return redirect("/api/restaurants/<int:id>")


# Get Individual Restaurant's Reviews
@restaurant_routes.route("<int:id>/reviews")
def get_restaurant_reviews(id):

  restaurant_reviews = Review.query.filter_by(restaurant_id = id).all

  all_reviews = {"reviews": [eachReview.to_dict() for eachReview in restaurant_reviews]}


  return jsonify(all_reviews.to_dict())


# Create Review for Restaurant
@restaurant_routes.route("/<int:id>/reviews", methods=["POST"])
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
@restaurant_routes.route("/<int:id>/reviews/<int:reviewId>", methods=["PUT"])
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
@restaurant_routes.route("/<int:id>/reviews/<int:reviewId>", methods=["DELETE"])
@login_required
def delete_review(reviewId):
  individual_review = Review.query.get(reviewId)

  if not individual_review:
    return {"message": "Review couldn't be found"}, 404
  else:
    db.session.delete(individual_review)
    db.session.commit()

  return redirect(f"/{id}"), 200


@restaurant_routes.route("/<int:id>/menu/new", methods =["POST"])
@login_required
def menu_poster(id):
  selected = Restaurant.query.get(id)
  if not selected:
      return {"message": "Restaurant to post menu couldnt be found"}, 404
  form = MenuForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    new_menu = Menu(
      restaurant_id = id,
      name = form.data["name"],
      description = form.data["description"],
      price = form.data["price"],
      category = form.data["category"],
      is_available = form.data["is_available"],
      image_url = form.data["image_url"]
    )
    db.session.add(new_menu)
    db.session.commit()

    return redirect(f"/{id}"), 201
  
@restaurant_routes.route("/<int:id>/menu/<int:menu_id>", methods =["PUT"])
@login_required
def menu_updated(menu_id, id):
  selected = Restaurant.query.get(id)
  if not selected:
      return {"message": "Restaurant to post menu couldnt be found"}, 404
  menu_to_update = Menu.query.get(menu_id)
  form = MenuForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():

      menu_to_update["name"] = form.data['name']
      menu_to_update["description"] = form.data["description"],
      menu_to_update["price"] = form.data["price"],
      menu_to_update["category"] = form.data["category"],
      menu_to_update["is_available"] = form.data["is_available"],
      menu_to_update["image_url"] = form.data["image_url"]

  
      db.session.commit()

  return redirect(f"/{id}"), 200


@restaurant_routes.route("/<int:id>/menu/<int:menu_id>", methods=["DELETE"])
@login_required
def delete_menu_by_id(id,menu_id):
   get_menu = Menu.query.get(id)
   if not get_menu:
      return {"message":"Can't find the menu to delete"}, 404
   else:
      db.session.delete(get_menu)
      db.session.commit()
      return redirect("/api/restaurants/<int:id>")