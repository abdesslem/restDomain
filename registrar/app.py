import sqlite3
import hashlib
import time
import os
from werkzeug import secure_filename
from flask import Flask, render_template,session, g, redirect, url_for, request, flash, jsonify
import requests
from requests.auth import HTTPDigestAuth
import json
from domain import domain
from contact import contact
#from user import user
try:
    import configparser
except ImportError:
    import ConfigParser as configparser

# configuration
config = configparser.SafeConfigParser()
config.readfp(open('registrar.conf'))

SECRET_KEY = config.get('session', 'secret')
DEBUG = config.getboolean('global', 'debug')
DATABASE = config.get('database', 'file')
ADDRESS = config.get('global', 'address')
PORT = int(config.get('global', 'port'))
url = "http://127.0.0.1:8080/api/"


app = Flask(__name__)
app.config.from_object(__name__)
app.register_blueprint(domain)
app.register_blueprint(contact)


@app.route('/home')
@app.route('/')
def home():
    #if 'username' in session :
    #     return render_template('index.html')  # render a template
    return render_template('index.html')


@app.route('/about')
def about():
    '''
    about page
    '''

    if 'logged_in' in session:
        return render_template('about.html')
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)
