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

@app.route('/users/<username>')
def show_user(username):

    if 'user' not in session:
        flash("Please login", "danger")
        return redirect('/login')
    
    user = User.query.get_or_404(username)

    if user.username != session['user']:
        flash('You do not have access to this page', 'danger')
        return redirect(f'/users/{session["user"]}')
    
    return render_template('user_details.html', user = user)

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
        session['user'] = new_user.username
        flash('Succesfully Created Account!','success')
        return redirect(f'/users/{new_user.username}')
    
    return render_template('register.html', form=form)

@app.route('/login', methods = ['POST', 'GET'])
def login_user():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username.lower(),password)
        if user:
            flash(f'Welcome Back, {user.first_name.title()}!','primary')
            session['user'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors.append('Invalid username or password.')
        
    return render_template('login.html', form=form)

@app.route('/logout')
def logout_user():
    if 'user' not in session:
        flash('Please sign in', 'primary')
        return redirect('/login')
    session.pop('user')
    flash("Goodbye!","info")
    return redirect('/login')