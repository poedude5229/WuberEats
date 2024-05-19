from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text



def seed_reviews():

  review1 = Review(
    user_id = 1,
    restaurant_id = 1,
    review = "Ordered from here multiple times, and every time the food has been amazing. Quick delivery and friendly service. Highly recommend it!",
    rating = 5,
  )

  review2 = Review(
    user_id = 2,
    restaurant_id = 2,
    review = "Love the options available. Prices are reasonable, and the delivery was on time.",
    rating = 4,
  )

  review3 = Review(
    user_id = 3,
    restaurant_id = 3,
    review = "I order from this place regularly, and they never disappoint. Food is always fresh, and the packaging is neat. Keep up the good work!",
    rating = 5,
  )

  review4 = Review(
    user_id = 4,
    restaurant_id = 4,
    review = "The food was good, but it took much longer than expected to arrive. Would have been a 5-star review if not for the delay.",
    rating = 3
  )

  review5 = Review(
    user_id = 1,
    restaurant_id = 5,
    review = "Food was mediocre, and the delivery was slow. Also, the packaging was not great; some items spilled during transit. Not ordering from here again.",
    rating = 2,
  )

  review6 = Review(
    user_id = 2,
    restaurant_id = 6,
    review = "I keep coming back to this restaurant for their amazing food. Always flavorful, the delivery is fast and such great service!",
    rating = 5,
  )

  review7 = Review(
    user_id = 3,
    restaurant_id = 1,
    review = "The food tasted good, but the portion size was much smaller than I expected for the price. I left feeling a bit hungry. Probably won't order from here again.",
    rating = 3
  )

  review8 = Review(
    user_id = 4,
    restaurant_id = 2,
    review = "Had an issue with my order, but customer service was quick to respond and resolve the issue. Impressed with their professionalism and how they handled the situation.",
    rating = 5
  )

  review9 = Review(
    user_id = 1,
    restaurant_id = 3,
    review = "Sometimes the food is great, but other times it is just average. It is hit or miss, which is disappointing. Wish they could maintain consistency.",
    rating = 3,
  )

  review10 = Review(
    user_id = 2,
    restaurant_id = 4,
    review = "The food was delicious, but delivery took longer than expected.",
    rating = 4,
  )

  review11 = Review(
    user_id = 3,
    restaurant_id = 5,
    review = "WuberEats makes it so easy to order food from here. Delivery is always on time.",
    rating = 5
  )

  review12 = Review(
    user_id = 4,
    restaurant_id = 6,
    review = "The delivery was quick, and the service was good, but the food was just okay. Nothing special, but it filled me up. Might try a different place next time.",
    rating = 3
  )

  review13 = Review(
    user_id = 1,
    restaurant_id = 6,
    review = "Ordered specific items, but some were missing from the delivery. Double-check your orders before confirming. Disappointing experience overall.",
    rating = 2
  )

  review14 = Review(
    user_id = 2,
    restaurant_id = 5,
    review = "It was good.",
    rating = 4
  )

  review15 = Review(
    user_id = 3,
    restaurant_id = 4,
    review = "They always get my order right and the food is delicious. The delivery driver was courteous and arrived right on time.",
    rating = 5
  )

  review16 = Review(
    user_id = 4,
    restaurant_id = 3,
    review = "The food is great, but the packaging needs improvement. My food spilled in the bag. The driver was apologetic, but it wasn't their fault.",
    rating = 3
  )

  review17 = Review(
    user_id = 1,
    restaurant_id = 2,
    review = "Consistently provides high-quality meals. Everything is fresh and flavorful. The delivery driver was also very polite and prompt.",
    rating = 5
  )

  review18 = Review(
    user_id = 2,
    restaurant_id = 1,
    review = "The food took forever to be prepared and arrived cold. The delivery driver was friendly, but the delay was disappointing.",
    rating = 2
  )

  review19 = Review(
    user_id = 3,
    restaurant_id = 6,
    review = "I love ordering from here! The portions are generous and the flavors are amazing. Delivery is usually quick and reliable.",
    rating = 4
  )

  review20 = Review(
    user_id = 4,
    restaurant_id = 5,
    review = "The food is just okay for the price. Portions are small, and the taste is average. The delivery driver was on time, but I expected more.",
    rating = 3
  )

  review21 = Review(
    user_id = 1,
    restaurant_id = 4,
    review = "The food quality has gone down. It used to be my favorite spot, but now the meals are bland. The delivery was late as well.",
    rating = 2
  )

  review22 = Review(
    user_id = 2,
    restaurant_id = 3,
    review = "Sometimes the food is great, other times it is not so good. Delivery times also vary a lot, which is frustrating.",
    rating = 3
  )

  review23 = Review(
    user_id = 3,
    restaurant_id = 2,
    review = "This has become my go-to for takeout. The food is consistently good, and the delivery drivers are always friendly.",
    rating = 5
  )

  review24 = Review(
    user_id = 4,
    restaurant_id = 1,
    review = "Amazing!",
    rating = 5
  )


  db.session.add(review1)
  db.session.add(review2)
  db.session.add(review3)
  db.session.add(review4)
  db.session.add(review5)
  db.session.add(review6)
  db.session.add(review7)
  db.session.add(review8)
  db.session.add(review9)
  db.session.add(review10)
  db.session.add(review11)
  db.session.add(review12)
  db.session.add(review13)
  db.session.add(review14)
  db.session.add(review15)
  db.session.add(review16)
  db.session.add(review17)
  db.session.add(review18)
  db.session.add(review19)
  db.session.add(review20)
  db.session.add(review21)
  db.session.add(review22)
  db.session.add(review23)
  db.session.add(review24)
  db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM review"))

    db.session.commit()
