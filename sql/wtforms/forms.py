from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,TextAreaField,SelectField,BooleanField
from wtforms.validators import InputRequired, Optional, URL, NumberRange

class PetForm(FlaskForm):

    name = StringField('Pet Name', validators=[InputRequired(message='Name required')])
    species = SelectField('Species', 
                          choices=[('dog','Dog'),('cat','Cat'),('porcupine','Porcupine')],
                          validators=[InputRequired(message='Pick a species')])
    photo_url = StringField('Photo URL', validators=[Optional(),URL()])
    age = IntegerField('Age', validators=[Optional(),NumberRange(min=0, max=30)])
    notes = TextAreaField('Notes', validators=[Optional()])


class EditPet(FlaskForm):

    photo_url = StringField('Photo URL', validators=[Optional(),URL()])
    notes = TextAreaField('Notes', validators=[Optional()])
    available = BooleanField('Available')
