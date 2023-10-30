from flask import Flask

app = Flask(__name__)

@app.route('/welcome')
def greet():
    return 'Welcome'

@app.route('/welcome/<greet_end>')
def greeting(greet_end):
    return f'Welcome {greet_end}'