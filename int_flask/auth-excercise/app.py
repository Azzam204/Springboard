from flask import Flask, request, render_template,  redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import *
from forms import UserForm, LoginForm
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///flask_feedback'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY']= 'fartnoise'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

with app.app_context():
    db.create_all()

@app.route('/')
def handle_home():
    return redirect('/register')

@app.route('/secret')
def show_secret():

    if 'user_id' not in session:
        flash("Please login", "danger")
        return redirect('/login')

    return render_template('secret.html')

@app.route('/register', methods = ['POST','GET'])
def register_page():
    form = UserForm()
    if form.validate_on_submit():
        first_name = form.first_name.data
        last_name = form.last_name.data
        email = form.email.data
        username = form.username.data
        password = form.password.data
        new_user = User.register(first_name.lower(),
                                 last_name.lower(),
                                 email.lower(),
                                 username.lower(),
                                 password)

        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username Taken')
            form.email.errors.append('Email already exists')
            return render_template('register.html', form=form)
        session['user_id'] = new_user.id
        flash('Succesfully Created Account!','success')
        return redirect('/secret')
    
    return render_template('register.html', form=form)

@app.route('/login', methods = ['POST', 'GET'])
def login_user():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username.lower(),password)
        if user:
            flash(f'Welcome Back, {user.first_name}','primary')
            session['user_id'] = user.id
            return redirect('/secret')
        else:
            form.username.errors.append('Invalid username or password.')
        
    return render_template('login.html', form=form)

@app.route('/logout')
def logout_user():
    session.pop('user_id')
    flash("Goodbye!","info")
    return redirect('/login')