"""
    This provides the proxy interface to access the microservices
"""
import requests
from flask import request, session
from config import node, python, ruby, java, php

# takes the microservice, the initial request object and session
def proxy(service, req, ses):
    # rebuild request path for the microservice
    url = "http://{}{}".format(service, req.path)
    proxResp = None
    s = requests.Session()
    if req.method == "GET":
        print('getting {}'.format(url))
        proxResp = requests.get(url, headers=req.headers, cookies=req.cookies, params=req.args)
    elif req.method == "POST":
        print('posting {} with'.format(url))
        req = requests.Request('POST', url, cookies=req.cookies, data=req.form)
        prep_req = req.prepare()
        proxResp = s.send(prep_req)
    else:
        print('uh oh')

    print(proxResp)
    return '123'

def isAuthed(sid):
    # request java api with given sid
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