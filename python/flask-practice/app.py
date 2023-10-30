from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/')
def home_page():
    html = '''
    <html>
        <body>
            <h1>
                <b>
                    Home Page!
                </b>
            </h1>
            <a href='/hello'> KLK
            </a>
        </body>
    </html>
    '''
    return html

@app.route('/hello')
def say_hello():
    html = '''
    <html>
        <body>
            <h1>
                <b>
                    KLK BABOSO!
                </b>
            </h1>
            <p>
                tamo aprendiendo
            </p>
            <a href='/goodbye'> nos vemos
            </a>
        </body>
    </html>
    '''
    return html

@app.route('/goodbye')
def say_goodbye():
    return "Hasta la vista baby"

@app.route("/add-comment")
def add_comment_form():
    """Show form for adding a comment."""

    return """
      <form method="POST">
        <input type= 'text' placeholder= 'comment' name='comment'>
        <button>Submit</button>
      </form>
      """

@app.route("/add-comment", methods=["POST"])
def add_comment():
    """Handle adding comment."""

    comment = request.form["comment"]

    # TODO: save that into a database!

    return f'<h1>Received "{comment}".</h1>'