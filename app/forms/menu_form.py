from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField,BooleanField,SelectField
from wtforms.validators import DataRequired
from app.models import Menu

class MenuForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    price = IntegerField("Price", validators=[DataRequired()])
    category = SelectField("Category", choices=[("Main Courses", "Main Courses"),("Appetizers", "Appetizers"),("Sides", "Sides"),("Beverages", "Beverages"),("Breakfast", "Breakfast"),("Entrees","Entrees")])
    is_available = BooleanField("Is available")
    image_url = StringField("Image url", validators=[DataRequired()])


class EditMenuForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    price = IntegerField("Price", validators=[DataRequired()])
    category = SelectField("Category", choices=[("Main Courses", "Main Courses"),("Appetizers", "Appetizers"),("Sides", "Sides"),("Beverages", "Beverages"),("Breakfast", "Breakfast"),("Entrees","Entrees")])
    is_available = BooleanField("Is available")
    image_url = StringField("Image url", validators=[DataRequired()])
