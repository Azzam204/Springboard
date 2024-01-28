from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField , EmailField
from wtforms.validators import *

class UserForm(FlaskForm):
    first_name = StringField("First name", validators=[InputRequired(),Length(max=30)])

    last_name = StringField("Last name", validators=[InputRequired(),Length(max=30)])

    email = EmailField("Email", validators=[InputRequired(),Email(),Length(max=50)])

    username = StringField("Username", validators=[InputRequired(),Length(max=20)])

    password = PasswordField("Password", validators=[InputRequired()])

class LoginForm(FlaskForm):
    
    username = StringField("Username", validators=[InputRequired(),Length(max=20)])

    password = PasswordField("Password", validators=[InputRequired()])