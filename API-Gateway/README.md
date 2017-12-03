# API Gateway
The API gateway servers as a proxy between the client (browsers) and diverse backend microservice APIs.
Configuration is fairly straight forward:
* Make sure all the required microservice addresses are defined in the `config.py` file
* Create the route you wish to be passed to the backend within the `app.py` file. 
* Helper methods are defined within `proxy.py` and may be added to as needed, however they are kept rather generic on purpose
* the current design is to have all "middleware" processing take place in the routes defined in `app.py`.
  - For example: if you need a header removed/added/changed, you can do it once the proxied request has been served back to the route in `app.py`
