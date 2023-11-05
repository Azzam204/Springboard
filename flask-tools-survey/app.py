from flask import Flask, request, render_template , session, redirect, flash
from surveys import satisfaction_survey as survey

app = Flask(__name__)
responses = []
app.config['SECRET_KEY'] = 'balls'

@app.route('/')
def show_home():
    return render_template('home.html', survey = survey)

@app.route('/questions/<int:id>')
def show_question(id):
    if (len(responses) != id):
        flash('invalid question id')
        return redirect(f'/questions/{len(responses)}')
    
    question = survey.questions[id]
    return render_template('question.html', question = question, survey = survey, id = id)

@app.route('/answer', methods = ["POST"])
def logans_nextquest():

    choice = request.form['answer']
    responses.append(choice)
    
    if len(responses) == len(survey.questions):
        responses.clear()
        return redirect('/done')

    return redirect(f'/questions/{len(responses)}')

@app.route('/done')
def done():
    return render_template('done.html')