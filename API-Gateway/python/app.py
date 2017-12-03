"""
    module for handingly requests to the skitter microservices
"""
from flask import Flask, request, make_response
from config import SESSION_SECRET, NODE, PYTHON, RUBY, JAVA, PHP, ORIGIN
from proxy import proxy, is_authed

# this will need to change once we integrate with gunicorn/wsgi
APP = Flask(__name__)
# set secret key for signing session cookies
# change in production
APP.secret_key = SESSION_SECRET

# global unauthorized request
BADUSER = ('Not signed in!', 403)
PROPER_ORGIN = ORIGIN

def create_response(prox_resp):
    """ wrapper method for requests.response to flask.response """
    return make_response((prox_resp.text, dict(prox_resp.headers)))

def csrf_check(req):
    """ perform header checks to prevent csrf """
    valid = 0
    # first make sure the origin header is correct
    if req.headers.get('Origin') == PROPER_ORGIN:
        valid += 1
    # if it is missing, try checking the referer
    elif req.headers.get('Referer') == PROPER_ORGIN:
        valid += 1
    # finally check for the javascript header
    if req.headers.get('X-Requested-With') == "XMLHttpRequest":
        valid += 1
    return valid > 1

@APP.route('/signin', methods=['POST'])
def login():
    """ proxies a request to the auth server,
    also replaces bad java header """
    p_resp = proxy(JAVA, request)
    p_resp.headers['Transfer-Encoding'] = 'X-skitter-java-is-bad'
    return create_response(p_resp)

@APP.route('/AddSkit', methods=['POST'])
def add_skit():
    """ adds a skit as the currently logged in user """
    email = is_authed(request)
    if email:
        # same as args, form data is also immutable
        request.form = dict(request.form)
        request.form['author'] = email
        p_resp = proxy(NODE, request)
        return create_response(p_resp)
    return BADUSER

@APP.route('/GetSkits', methods=['GET'])
def get_skits():
    """ gets skits from all users the current user follows """
    email = is_authed(request)
    if email:
        # by default the args are an ImmutableMultiDict
        request.args = dict(request.args)
        # add the trusted email parameter
        # this will overwrite anything provided by the client
        request.args['email'] = email
        p_resp = proxy(NODE, request)
        return create_response(p_resp)
    return BADUSER

@APP.route('/RemoveSkit', methods=['POST'])
def remove_skit():
    """ removes a skit if authored by the current user """
    email = is_authed(request)
    if email:
        # same as args, form data is also immutable
        request.form = dict(request.form)
        request.form['email'] = email
        p_resp = proxy(NODE, request)
        return create_response(p_resp)
    return BADUSER

# just testing auth with the barebones node endpoint
@APP.route('/')
def test_auth():
    """ a feature testing endpoint """
    #if isAuthed(request) and csrf_check(request):
    if csrf_check(request):
        p_resp = proxy(NODE, request)
        return create_response(p_resp)
    return BADUSER


# PHP ROUTES
@APP.route('/getProfileInformation', methods=['GET'])
def get_profile_information():
    """ gets skits from all users the current user follows """
    email = is_authed(request)
    if email:
        # by default the args are an ImmutableMultiDict
        request.args = dict(request.args)
        # add the trusted email parameter
        # this will overwrite anything provided by the client
        request.args['email'] = email
        request.path += ".php"
        p_resp = proxy(PHP, request)
        return create_response(p_resp)
    return BADUSER

@APP.route('/changeDisplayName', methods=['POST'])
def get_profile_information():
    """ gets skits from all users the current user follows """
    email = is_authed(request)
    if email:
        # by default the args are an ImmutableMultiDict
        request.args = dict(request.args)
        # add the trusted email parameter
        # this will overwrite anything provided by the client
        request.args['email'] = email
        request.path += ".php"
        p_resp = proxy(PHP, request)
        return create_response(p_resp)
    return BADUSER

@APP.route('/changeProfileImage', methods=['POST'])
def get_profile_information():
    """ gets skits from all users the current user follows """
    email = is_authed(request)
    if email:
        # by default the args are an ImmutableMultiDict
        request.args = dict(request.args)
        # add the trusted email parameter
        # this will overwrite anything provided by the client
        request.args['email'] = email
        request.path += ".php"
        p_resp = proxy(PHP, request)
        return create_response(p_resp)
    return BADUSER

#FLASK ROUTES
@APP.route('/FollowUser', methods=['POST'])
def remove_skit():
    """ removes a skit if authored by the current user """
    email = is_authed(request)
    if email:
        # same as args, form data is also immutable
        request.form = dict(request.form)
        request.form['email'] = email
        p_resp = proxy(PYTHON, request)
        return create_response(p_resp)
    return BADUSER

@APP.route('/UnfollowUser', methods=['POST'])
def remove_skit():
    """ removes a skit if authored by the current user """
    email = is_authed(request)
    if email:
        # same as args, form data is also immutable
        request.form = dict(request.form)
        request.form['email'] = email
        p_resp = proxy(PYTHON, request)
        return create_response(p_resp)
    return BADUSER

#RUBY ROUTES
@APP.route('/FollowUser', methods=['POST'])
def remove_skit():
    """ removes a skit if authored by the current user """
    email = is_authed(request)
    if email:
        # same as args, form data is also immutable
        request.form = dict(request.form)
        request.form['email'] = email
        p_resp = proxy(RUBY, request)
        return create_response(p_resp)
    return BADUSER

@APP.route('/UnfollowUser', methods=['POST'])
def remove_skit():
    """ removes a skit if authored by the current user """
    email = is_authed(request)
    if email:
        # same as args, form data is also immutable
        request.form = dict(request.form)
        request.form['email'] = email
        p_resp = proxy(RUBY, request)
        return create_response(p_resp)
    return BADUSER