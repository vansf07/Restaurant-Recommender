import os
from flask import Flask, send_from_directory, request, session
from pymongo import MongoClient

DB_URL = "mongodb://localhost:27017"

dbClient = MongoClient(DB_URL)
credentials = dbClient.restrecom.credentials
print("Mongo connected")

app = Flask(__name__, static_folder='../build/')
app.config["SESSION_TYPE"] = "mongodb"
app.config["SESSION_MONGODB"] = dbClient
app.secret_key = "thisissupposedtobeasecret"

# API Paths

def is_valid_login(username, password):
    p = credentials.find_one({"username": username, "password": password})
    if p is None:
        return False
    return True

@app.route('/api/login', methods=['POST'])
def login():
    username = str(request.args.get('username'))
    password = str(request.args.get('password'))
    
    if username is None or password is None:
        return {
            "success": False
        }
    
    if is_valid_login(username, password):
        session['name'] = username
        return {
            "success": True
        }
    else:
        return {
            "success": False
        }


@app.route('/api/logout', methods=['POST'])
def logout():
    if 'name'in session and session['name']:
        session.pop('name', default=None)

    return {
        "success": True
    }


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
