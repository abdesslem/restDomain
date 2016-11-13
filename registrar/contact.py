from flask import jsonify, abort, make_response, request
import requests
from requests.auth import HTTPDigestAuth
from flask.ext.httpauth import HTTPBasicAuth
from flask import Blueprint
import json
import tortilla

contact = Blueprint('contact',__name__, url_prefix='/contact')
auth = HTTPBasicAuth()
dominy = tortilla.wrap('http://127.0.0.1:8080/api')


@contact.route('/check/<contact>', methods=['GET','POST'])
def check(contact):
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    if (contact):
        dom = dominy.contactCheck.get(contact)
        return jsonify(dom)
    return '{}'

@contact.route('/update/<contact>', methods=['GET','POST'])
def update(contact):
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    if (contact):
        dom = dominy.contactUpdate.get(contact)
        return jsonify(dom)
    return '{}'

@contact.route('/info/<contact>', methods=['GET','POST'])
def info(contact):
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    if (contact):
        dom = dominy.contactInfo.get(contact)
        return jsonify(dom)
    return '{}'

@contact.route('/create/', methods=['GET'])
def create():
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    data = {"name": "s","organization": "ovh","email": "t@t","street": "a","city": "a","country": "a","phone": "a","authcode": "a"}
    #data = jsonify(data)
    dom = dominy.contacts.post(data=data)
    return jsonify(dom)

@contact.route('/delete/<contact>', methods=['DELETE'])
def delete(contact):
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    if (contact):
        dom = dominy.contactDelete.get(contact)
        return jsonify(dom)
    return '{}'

@contact.errorhandler(404)
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
