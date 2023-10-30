from flask import Flask, request, render_template
from stories import *

app = Flask(__name__)

@app.route('/')
def madlibs_form():
    return render_template("home.html", prompts = story.prompts)

@app.route('/story')
def story_answer():
    answer = story.generate(request.args)
    return render_template("answer.html", ans = answer)