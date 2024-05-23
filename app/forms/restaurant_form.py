from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Restaurant

# Back in restaurant routes, the owner id will be the current user id.


class RestaurantForm(FlaskForm):
    name = StringField('Name: ', validators=[DataRequired()])
    address = StringField("Address: ", validators=[DataRequired()])
    phone_number = StringField("Phone Number: ", validators=[DataRequired()])
    cuisine = StringField("Cuisine Type: ", validators=[DataRequired()])
    description = StringField("Description: ", validators=[DataRequired()])
    hours_of_operation = StringField("Hours of operation: ", validators=[DataRequired()])
    delivery_radius = IntegerField("Delivery Radius")
    cover_image = StringField('Restaurant Image')


class EditRestaurantForm(FlaskForm):
    name = StringField('Name: ', validators=[DataRequired()])
    address = StringField("Address: ", validators=[DataRequired()])
    phone_number = StringField("Phone Number: ", validators=[DataRequired()])
    cuisine = StringField("Cuisine Type: ", validators=[DataRequired()])
    description = StringField("Description: ", validators=[DataRequired()])
    hours_of_operation = StringField("Hours of operation: ", validators=[DataRequired()])
    delivery_radius = IntegerField("Delivery Radius")
    cover_image = StringField('Restaurant Image')