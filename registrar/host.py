from flask import jsonify, abort, make_response, request
import requests
from requests.auth import HTTPDigestAuth
from flask.ext.httpauth import HTTPBasicAuth
from flask import Blueprint
import json
import tortilla

host = Blueprint('host',__name__)
auth = HTTPBasicAuth()
dominy = tortilla.wrap('http://127.0.0.1:8080/api')


@host.route('/check/<host>', methods=['GET','POST'])
def check(host):
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    if (host):
        dom = dominy.hostCheck.get(host)
        return jsonify(dom)
    return '{}'

@host.route('/update/<host>', methods=['GET','POST'])
def update(host):
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    if (host):
        dom = dominy.hostUpdate.put(host)
        return jsonify(dom)
    return '{}'

@host.route('/info/<host>', methods=['GET','POST'])
def info(host):
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    if (host):
        dom = dominy.hostInfo.get(host)
        return jsonify(dom)
    return '{}'

@host.route('/create/', methods=['GET','POST'])
def create():
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    data = {"name":"soko.com"}
    dom = dominy.hosts.post(data=data)
    return jsonify(dom)

@host.route('/delete/<host>', methods=['GET','POST'])
def delete(host):
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    if (host):
        dom = dominy.hostDelete.delete(host)
        return jsonify(dom)
    return '{}'

@host.errorhandler(404)
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
