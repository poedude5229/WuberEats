from flask import Blueprint, jsonify, json, request, redirect
from app.models import Restaurant, Review, Menu, db
from flask_login import login_required, current_user
from app.forms.reviews_form import ReviewForm, EditReviewForm
from app.forms.menu_form import MenuForm, EditMenuForm
from app.forms.restaurant_form import RestaurantForm, EditRestaurantForm
restaurant_routes = Blueprint('restaurants', __name__)


# Get all the restaurants CHECKED
@restaurant_routes.route("/")
def restaurants():
    fetched_restaurants = Restaurant.query.all()
    restaurant_menus = []
    for restaurant in fetched_restaurants:
        restaurant_dict = restaurant.to_dict()
        # print(len(restaurant_dict['reviews']))

        menu_items = Menu.query.filter(Menu.restaurant_id == restaurant.id).all()
        # Adding restaurant name to each menu item dictionary
        menu_items_with_restaurant = []
        for item in menu_items:
            item_dict = item.to_dict()
            item_dict['restaurant'] = restaurant_dict['name']
            menu_items_with_restaurant.append(item_dict)

        restaurant_dict['menu_items'] = menu_items_with_restaurant

        total_rating = 0
        if len(restaurant_dict['reviews']) != 0:
            total_rating = sum(review['rating'] for review in restaurant_dict['reviews']) / len(restaurant_dict['reviews'])
        else:
            total_rating = 0

        restaurant_dict['avgrating'] = total_rating
        restaurant_menus.append(restaurant_dict)

    return {'restaurants': restaurant_menus}



# Create a Restaurant CHECKED

@restaurant_routes.route("/new", methods=["POST"])
@login_required
def restaurant_post():
    form = RestaurantForm()
    
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        new = Restaurant(
            owner_id=current_user.id,
            name=form.data['name'],
            address=form.data['address'],
            phone_number=form.data['phone_number'],
            cuisine=form.data['cuisine'],
            description=form.data['description'],
            hours_of_operation=form.data['hours_of_operation'],
            delivery_radius=form.data['delivery_radius'],
            cover_image=form.data['cover_image']
        )

        db.session.add(new)
        db.session.commit()

        return new.to_dict(), 201
    else:
        return form.errors, 400

#Update a resaurant based of the resaurant id
@restaurant_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_a_restaurant(id):
   selected = Restaurant.query.get(id)
   if not selected:
      return {"message": "Restaurant to edit menu couldnt be found"}, 404

   form = EditRestaurantForm()
   form["csrf_token"].data = request.cookies["csrf_token"]

   if form.validate_on_submit():
      selected.name = form.data['name']
      selected.address = form.data['address']
      selected.phone_number = form.data["phone_number"]
      selected.cuisine = form.data["cuisine"]
      selected.description = form.data['description']
      selected.hours_of_operation = form.data['hours_of_operation']
      selected.delivery_radius = form.data['delivery_radius']
      selected.cover_image = form.data['cover_image']


      db.session.commit()

   return selected.to_dict(), 200





# Get Individual Restaurant CHECKED
@restaurant_routes.route("/<int:id>", methods=["GET"])
def get_restaurant_by_id(id):
    fetched = Restaurant.query.get(id)
    restmenu = []
    if fetched:
        restaurant_dict = fetched.to_dict()
        if len(restaurant_dict['reviews']) != 0:
          total_rating = (sum(review['rating'] for review in restaurant_dict['reviews']) / len(restaurant_dict['reviews']))
        else:
          total_rating = 0
        menu_items = Menu.query.filter(Menu.restaurant_id == fetched.id).all()
        restaurant_dict['menu_items'] = [item.to_dict() for item in menu_items]
        restaurant_dict['avgrating'] = total_rating
        restmenu.append(restaurant_dict)
        return restmenu
    else: return {  "message": "Restaurant couldn't be found" }, 404



# DELETE A restaurant based off id
@restaurant_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_restaurant_by_id(id):
   got_restaurant = Restaurant.query.get(id)
   if not got_restaurant:
      return {"message":"Can't find the restaurant to delete"}, 404
   else:
      db.session.delete(got_restaurant)
      db.session.commit()
      return json.dumps({"message": "Succesfully Deleted your restaurant"}), 202


# Get Individual Restaurant's Reviews #CHECKED
@restaurant_routes.route("<int:id>/reviews")
def get_restaurant_reviews(id):

  restaurant_reviews = Review.query.filter_by(restaurant_id = id).all()

  if restaurant_reviews is not None:
    all_reviews = {"reviews": [eachReview.to_dict() for eachReview in restaurant_reviews]}
  else:
    all_reviews = {"reviews": []}


  return all_reviews


# Create Review for Restaurant CHECKED
@restaurant_routes.route("/<int:id>/reviews/new", methods=["POST"])
@login_required
def create_review(id):

  form = ReviewForm()

  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    new_review = Review(
      user_id = current_user.id,
      restaurant_id = id,
      review = form.data["review"],
      rating = form.data["rating"],
    )

    db.session.add(new_review)
    db.session.commit()

  return new_review.to_dict()


# Update Review CHECKED
@restaurant_routes.route("/<int:id>/reviews/<int:reviewId>", methods=["PUT"])
@login_required
def update_review(reviewId, id):

  form = EditReviewForm()

  indvReview = Review.query.get(reviewId)

  if not indvReview:
    return {"message": "Review couldn't be found"}, 404

  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    indvReview.review = form.data["review"]
    indvReview.rating = form.data["rating"]


    db.session.commit()
  return indvReview.to_dict(), 200




# Delete Review CHECKED
@restaurant_routes.route("/<int:id>/reviews/<int:reviewId>", methods=["DELETE"])
@login_required
def delete_review(reviewId, id):
  individual_review = Review.query.get(reviewId)

  if not individual_review:
    return {"message": "Review couldn't be found"}, 404
  else:
    db.session.delete(individual_review)
    db.session.commit()

  return json.dumps({"message": "Succesfully Deleted your restaurant"}), 202



# Get all menus based on a reasaurant id
@restaurant_routes.route("/<int:id>/menus", methods=["GET"])
def get_menus(id):
   selected = Restaurant.query.get(id)
   print(selected)


   if not selected:
      {"message": "Restaurant to post menu couldnt be found"}, 404


   menu_items_all = []
   for item in selected.menus:
      menu_items_all.append(item.to_dict())

   return {"menus": menu_items_all}, 200


# Post a new menu based on a restaurant CHECKED
@restaurant_routes.route("/<int:id>/menus/new", methods =["POST"])
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
  form = EditMenuForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():

      menu_to_update.name = form.data['name']
      menu_to_update.description = form.data["description"]
      menu_to_update.price = form.data["price"]
      menu_to_update.category = form.data["category"]
      menu_to_update.is_available = form.data["is_available"]
      menu_to_update.image_url = form.data["image_url"]


      db.session.commit()

  return menu_to_update.to_dict(), 200

# Delete a menu based on a restaurant with the menu_id CHECKED
@restaurant_routes.route("/<int:id>/menu/<int:menu_id>", methods=["DELETE"])
@login_required
def delete_menu_by_id(id,menu_id):
    get_menu = Menu.query.get(menu_id)
    if not get_menu:
       return {"message":"Can't find the menu to delete"}, 404
    elif get_menu:
        db.session.delete(get_menu)
        db.session.commit()
        return json.dumps({"message": "Succesfully Deleted your menu item"}), 202 
    else: 
       return {"message": "Bad Request"}, 400