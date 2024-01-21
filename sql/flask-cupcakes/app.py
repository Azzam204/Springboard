"""Flask app for Cupcakes"""
from flask import Flask, render_template, redirect, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import *

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY']= 'fartnoise'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

with app.app_context():
    db.create_all()

@app.route('/api/cupcakes')
def get_all_cupcakes():
    data = Cupcake.query.all()
    serialized = [cupcake.serialize() for cupcake in data]

    return jsonify(cupcakes=serialized)

@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    data = Cupcake.query.get_or_404(cupcake_id)

    return jsonify(cupcake=data.serialize())

@app.route('/api/cupcakes', methods=['POST'])
def add_cupcake():
    flavor = request.json['flavor']
    size = request.json['size']
    rating = request.json['rating']
    image = request.json['image']

    new_cupcake = Cupcake(flavor=flavor,size=size,rating=rating,image=image)

    db.session.add(new_cupcake)
    db.session.commit()

    return(jsonify(cupcake=new_cupcake.serialize()), 201)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def edit_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    
    cupcake.flavor = request.json['flavor']
    cupcake.size = request.json['size']
    cupcake.rating = request.json['rating']
    cupcake.image = request.json['image']

    db.session.commit()

    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    if(Cupcake.query.get_or_404(cupcake_id)):
        cupcake = Cupcake.query.filter_by(id=cupcake_id).delete()
        db.session.commit()
        return jsonify(message="Deleted")
    
@app.route('/')
def show_home():
    return render_template('index.html')