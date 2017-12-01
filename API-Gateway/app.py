"""
    module for handingly requests to the skitter microservices
"""
from flask import Flask, request, make_response, session, escape
from config import session_secret, node, python, ruby, java, php
from proxy import proxy, isAuthed

# this will need to change once we integrate with gunicorn/wsgi
app = Flask(__name__)
# set secret key for signing session cookies
# change in production
app.secret_key = session_secret

# global unauthorized request
BADUSER = ('Not signed in!', 403)

# wrapper method for requests.response to flask.response
def create_response(prox_resp):
    return make_response((prox_resp.text, dict(prox_resp.headers)))

@app.route('/signin', methods=['POST'])
def login():
    p_resp = proxy(java, request)
    p_resp.headers['Transfer-Encoding'] = 'X-skitter-java-is-bad'
    return create_response(p_resp)

# needs testing
@app.route('/changeDisplayName', methods=['POST'])
def changeDisplayName():
    # some auth check first
    p_resp = proxy(php, request)
    return create_response(p_resp)

# just testing auth with the barebones node endpoint
@app.route('/')
def test_auth():
    if isAuthed(request):
        p_resp = proxy(node, request)
        return create_response(p_resp)
    else:
        return BADUSER
