from flask import jsonify, abort, make_response, request
import requests
from requests.auth import HTTPDigestAuth
from flask.ext.httpauth import HTTPBasicAuth
from flask import Blueprint
import json
import tortilla

domain = Blueprint('domain',__name__)
auth = HTTPBasicAuth()
dominy = tortilla.wrap('http://127.0.0.1:8080/api')


@domain.route('/check/<domain>', methods=['GET','POST'])
def check(domain):
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    if (domain):
        dom = dominy.domainCheck.get(domain)
        return jsonify(dom)
    return '{}'

@domain.route('/update/<domain>', methods=['PUT'])
def update(domain):
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    if (domain):
        dom = dominy.domainUpdate.put(domain)
        return jsonify(dom)
    return '{}'

@domain.route('/info/<domain>', methods=['GET','POST'])
def info(domain):
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    if (domain):
        dom = dominy.domainInfo.get(domain)
        return jsonify(dom)
    return '{}'

@domain.route('/create/', methods=['GET','POST'])
def create():
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    data = request.json
    # parse json validator function to validate fields
    dom = dominy.domains.post(data=data)
    return jsonify(dom)

@domain.route('/delete/<domain>', methods=['DELETE'])
def delete(domain):
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    if (domain):
        dom = dominy.domainDelete.delete(domain)
        return jsonify(dom)
    return '{}'

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
