# Put your app in here.
from flask import Flask
from operations import *
from flask import request
app = Flask(__name__)

math = {
        "add": add,
        "sub": sub,
        "mult": mult,
        "div": div,
        }

@app.route('/<opp>')
def calc(opp):
    a = int(request.args['a'])
    b = int(request.args['b'])
    ans = math[opp](a,b)
    return str(ans)