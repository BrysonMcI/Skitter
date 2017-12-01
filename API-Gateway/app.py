"""
    module for handingly requests to the skitter microservices
"""
from flask import Flask, request, make_response, session, escape
from config import session_secret, node, python, ruby, java, php
from proxy import proxy

# this will need to change once we integrate with gunicorn/wsgi
app = Flask(__name__)
# set secret key for signing session cookies
# change in production
app.secret_key = session_secret

# this actually might only need to happen on the backend
@app.route('/isAuthenticated')
def isAuthed():
    return 'in progress'

@app.route('/signin', methods=['POST'])
def login():
    print('hit me')
    print(request.form)
    resp = make_response('hii')
    proxy(java, request, session)
    return resp
