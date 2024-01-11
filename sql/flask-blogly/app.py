"""Blogly application."""
from flask import Flask, request, render_template,  redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post, Tag, PostTag

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY']= 'fartnoise'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

with app.app_context():
    db.create_all()

@app.route('/')
def go_to_users():
    return redirect('/users')

@app.route('/users')
def list_users():
    users = User.query.all()
    return render_template('users.html', users = users)

@app.route('/users/new', methods = ['POST','GET'])
def create_user():
    if request.form.get('first_name'):
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        image_url = request.form['image_url']

        new_user = User(first_name=first_name,
                        last_name=last_name,
                        image_url=image_url if image_url else None)
        
        db.session.add(new_user)
        db.session.commit()
        return redirect('/users')
    else:
        return render_template('add_user.html')
    
@app.route('/users/<int:user_id>')
def show_user(user_id):
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter_by(user_id = user_id).all()
    return render_template('user_details.html', user=user, posts = posts)

@app.route('/users/<int:user_id>/edit', methods = ['POST','GET'])
def edit_user(user_id):
    if request.form.get('first_name'):
        user = User.query.get_or_404(user_id)
        user.first_name = request.form['first_name']
        user.last_name = request.form['last_name']
        user.image_url = request.form['image_url'] if request.form['image_url'] else user.image_url
        db.session.add(user)
        db.session.commit()
        return redirect('/users')
    else:
        user = User.query.get_or_404(user_id)
        return render_template('edit_user.html', user = user)
    
@app.route('/users/<int:user_id>/delete')
def delete_user(user_id):
    user = User.query.filter_by(id = user_id)
    user.delete()
    db.session.commit()
    return redirect('/users')

@app.route('/users/<int:id>/posts/new', methods= ['POST','GET'])
def add_post(id):
    if request.form.get('title'):
        title = request.form['title']
        content = request.form['content']

        new_post = Post(title=title,
                        content=content,
                        user_id=id)
        db.session.add(new_post)
        db.session.commit()

        for tag in request.form.getlist('tags'):
            new_tag = Tag.query.get(tag)
            new_post.tags.append(new_tag)
            db.session.commit()
        return redirect(f'/users/{id}')
    else:
        user = User.query.get_or_404(id)
        tags = Tag.query.all()
        return render_template('post_form.html', user=user, tags = tags)
    
@app.route('/posts/<int:post_id>')
def show_post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post_details.html', post=post)

@app.route('/posts/<int:post_id>/edit', methods = ['POST','GET'])
def edit_post(post_id):
    if request.form.get('title'):
        post = Post.query.get_or_404(post_id)
        post.title = request.form['title']
        post.content = request.form['content']
        PostTag.query.filter_by(post_id = post_id).delete()

        db.session.add(post)
        db.session.commit()
        
        for tag in request.form.getlist('tags'):
            new_tag = Tag.query.get(tag)
            if new_tag not in post.tags:
                post.tags.append(new_tag)
                db.session.commit()
        return redirect(f'/posts/{post_id}')
    else:
        post = Post.query.get_or_404(post_id)
        tags = Tag.query.all()
        return render_template('edit_post.html', post = post, tags = tags)


@app.route('/posts/<int:post_id>/delete')
def delete_post(post_id):
    post_q = Post.query.filter_by(id = post_id)
    post = Post.query.get(post_id)
    user_id = post.user_id
    post_q.delete()
    db.session.commit()
    return redirect(f'/users/{user_id}')

@app.route('/tags')
def list_tags():
    tags = Tag.query.all()
    return render_template('tags.html', tags = tags)

@app.route('/tags/<int:tag_id>')
def show_tag(tag_id):
    tag = Tag.query.get(tag_id)
    return render_template('tag_details.html', tag = tag)

@app.route('/tags/new', methods = ['POST','GET'])
def add_tag():
    if request.form.get('name'):
        name = request.form['name']

        new_tag = Tag(name=name)

        db.session.add(new_tag)
        db.session.commit()
        return redirect('/tags')
    else:
        return render_template('tag_form.html')
    
@app.route('/tags/<int:tag_id>/edit', methods = ['POST','GET'])
def edit_tag(tag_id):
    if request.form.get('name'):
        tag = Tag.query.get_or_404(tag_id)
        tag.name = request.form['name']
        
        db.session.add(tag)
        db.session.commit()
        return redirect('/tags')
    else:
        tag = Tag.query.get_or_404(tag_id) 
        return render_template('edit_tag.html', tag = tag)
    
@app.route('/tags/<int:tag_id>/delete')
def delete_tag(tag_id):
    tag = Tag.query.filter_by(id = tag_id)
    tag.delete()
    db.session.commit()
    return redirect('/tags')