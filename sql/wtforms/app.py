from flask import Flask, request, render_template,  redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import *
from forms import PetForm, EditPet

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY']= 'fartnoise'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

with app.app_context():
    db.create_all()

@app.route('/')
def show_home():
    pets = Pet.query.all()
    return render_template('index.html', pets = pets)

@app.route('/add', methods = ['POST','GET'])
def show_pet_form():

    form = PetForm()

    if form.validate_on_submit():
        new_pet = Pet(name = form.name.data, species = form.species.data, photo_url = form.photo_url.data, age = form.age.data , notes = form.notes.data)

        db.session.add(new_pet)
        db.session.commit()
        flash(f'Added {new_pet.name}')
        return redirect('/')
    
    else:
        return render_template('add_form.html', form = form)
    
@app.route('/<int:pet_id>', methods = ['POST','GET'])
def show_pet_details(pet_id):
    
    pet = Pet.query.get_or_404(pet_id)
    form = EditPet(obj=pet)

    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.commit()
        flash(f'{pet.name} has been updated!')
        return redirect('/')
    else:
        return render_template('pet_details.html', form = form, pet = pet)
    
@app.route('/<int:pet_id>/delete')
def delete_pet(pet_id):
    Pet.query.filter_by(id=pet_id).delete()
    db.session.commit()
    return redirect('/')