from flask import Blueprint, redirect, render_template, jsonify
from ..models import db, Review


reviews = Blueprint("reviews", __name__)


# # Get Individual Restaurant's Reviews
# @reviews.route("<int:restaurantId>/reviews")
# def get_restaurant_reviews(restaurantId):

#   restaurant_reviews = Review.query.filter_by(restaurant_id = restaurantId).all

#   all_reviews = {"reviews": [eachReview.to_dict() for eachReview in restaurant_reviews]}


#   return jsonify(all_reviews.to_dict())

# # Create Review for Restaurant
# @reviews.route("/restaurants/<int:restaurantId>/reviews", methods=["POST"])
# @login_required
# def create_review(restaurantId):

#   # Make a review form in forms folder and import it here
#   form = ReviewForm()


#   if form.validate_on_submit():
#     new_review = ReviewForm(
#       # user_id =
#       restaurant_id = restaurantId,
#       review = form.data["review"],
#       rating = form.data["rating"],
#     )

#   db.session.add(new_review)
#   db.session.commit()

#   return render_template("review_form.html", form = form)




# Update Review
@reviews.route("", methods=["GET", "POST"])
def update_review():
  pass


# Delete Review
@reviews.route("/api/restaurants/:restaurantId/reviews/<int:reviewId>")
def delete_review(reviewId):
  individual_review = Review.query.get(reviewId)

  db.session.delete(individual_review)
  db.session.commit()
  return redirect("/restaurants")
