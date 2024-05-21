from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange


class ReviewForm(FlaskForm):
  review = StringField("Review", validators=[DataRequired("Review Required.")])
  rating = IntegerField("Rating", validators=[DataRequired("Rating Required. Choose from 1-5"), NumberRange(min=1, max=5)])


class EditReviewForm(FlaskForm):
  review = StringField("Review", validators=[DataRequired("Review Required.")])
  rating = IntegerField("Rating", validators=[DataRequired("Rating Required. Choose from 1-5"), NumberRange(min=1, max=5)])
