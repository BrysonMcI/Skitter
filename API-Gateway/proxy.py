"""
    This provides the proxy interface to access the microservices
"""
import requests
from flask import request, session
from config import node, python, ruby, java, php

# takes the microservice, the initial request object and session
def proxy(service, req):
    # rebuild request path for the microservice
    url = "http://{}{}".format(service, req.path)
    s = requests.Session()
    # build our request to pass to X microservice
    req = requests.Request(req.method, url, cookies=req.cookies, data=req.form)
    prep_req = req.prepare()
    prox_resp = s.send(prep_req)

    return prox_resp

# simple cache for sid's
sid_cache = {}

def isAuthed(req):
    # request java api with given sid
    sid = req.cookies.get('sid')
    if not sid:
        return False
    # reduce requests to the auth server
    # one day have this expire, maybe once the backend db does
    if sid_cache.get(sid):
        return True

    url = "http://{}/{}".format(java, "isAuthenticated")
    resp = requests.post(url, data={'sid': sid})
    content = resp.json()
    if content.get('email') == "invalid session":
        return False
    sid_cache[sid] = True
    print('added sid to cache:', sid)
    return True

### for debug ###
def pretty_print_POST(req):
    """
    At this point it is completely built and ready
    to be fired; it is "prepared".

    However pay attention at the formatting used in 
    this function because it is programmed to be pretty 
    printed and may differ from the actual request.
    """
    print('{}\n{}\n{}\n\n{}'.format(
        '-----------START-----------',
        req.method + ' ' + req.url,
        '\n'.join('{}: {}'.format(k, v) for k, v in req.headers.items()),
        req.body,
    ))