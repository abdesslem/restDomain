from flask import jsonify, abort, make_response, request
import requests
from requests.auth import HTTPDigestAuth
from flask.ext.httpauth import HTTPBasicAuth
from flask import Blueprint
import json

domain = Blueprint('domain', __name__)
auth = HTTPBasicAuth()
domainUrl = "http://127.0.0.1:8080/api/domains/"

@domain.route('/check/<domain>', methods=['GET'])
@domain.route('/check/<domain>/', methods=['GET'])
def check(domain):
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    myResponse = requests.get(domainUrl+domain,verify=True)
    # For successful API call, response code will be 200 (OK)
    if(myResponse.ok):
        # Loading the response data into a dict variable
        jData = json.loads(myResponse.content)
        return jsonify(jData)
    else:
        # If response code is not ok (200), print the resulting http error code with description
        myResponse.raise_for_status()
    return render_template('index.html')

@domain.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@auth.get_password
def get_password(username):
    if username == 'ask3m':
        return 'ask3m'
    return None

@auth.error_handler
def unauthorized():
    return make_response(jsonify({'error': 'Unauthorized access'}), 401)
