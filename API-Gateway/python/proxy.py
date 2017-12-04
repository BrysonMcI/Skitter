"""
    This provides the proxy interface to access the microservices
"""
import requests
from config import JAVA

def proxy(service, req):
    """ proxies a request to the given microservice """
    # rebuild request path for the microservice
    url = "http://{}{}".format(service, req.path)
    sess = requests.Session()
    # build our request to pass to X microservice
    req = requests.Request(req.method, url, cookies=req.cookies, data=req.form, files=req.files, params=req.args)
    prep_req = req.prepare()
    prox_resp = sess.send(prep_req)

    return prox_resp

# simple cache for sid's
SID_CACHE = {}

def is_authed(req):
    """ checks to see if a request is from an authorized user """
    # request java api with given sid
    sid = req.cookies.get('sid')
    if not sid:
        return False
    # reduce requests to the auth server
    # one day have this expire, maybe once the backend db does
    if SID_CACHE.get(sid):
        return SID_CACHE.get(sid)

    url = "http://{}/{}".format(JAVA, "isAuthenticated")
    resp = requests.post(url, data={'sid': sid})
    content = resp.json()
    if content.get('email') == "invalid session":
        return False
    SID_CACHE[sid] = content.get('email')
    print('added sid to cache:', sid, SID_CACHE[sid])
    return SID_CACHE[sid]
