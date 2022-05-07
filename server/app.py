import os
from flask import Flask, send_from_directory, request, session
from flask_cors import CORS, cross_origin
from pymongo import MongoClient

DB_URL = "mongodb+srv://ranjana:HR0xrwSLVIrpEjSZ@clusterrrs.kmsjh.mongodb.net/test"

dbClient = MongoClient(DB_URL)
db = dbClient.restrecom
print("Mongo connected")

app = Flask(__name__, static_folder='../build/')
app.config["SESSION_TYPE"] = "mongodb"
app.config["SESSION_MONGODB"] = dbClient
app.secret_key = "thisissupposedtobeasecret"

app.config["CORS_ORIGINS"] = "*"
CORS(app)

# API Paths

def is_valid_login(username, password):
    # p = db.credentials.find_one({"username": username, "password": password})
    p = (username == "a@b" and password == "asdf")
    return p
    if p is None:
        return False
    return True

def fetchProfileFromDB(username):
    # db.profiles.find_one({ "username": username })
    return {
        "name": "Rani Kumar",
        "age": "16",
        "foodPreference": "whatever"
    }

@app.route('/api/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    body = request.get_json()
    username = str(body['username'])
    password = str(body['password'])
    
    if username is None or password is None:
        return {
            "success": False
        }
    
    if is_valid_login(username, password):
        session['name'] = username
        session.modified = True
        return {
            "success": True,
            "username": username
        }
    else:
        return {
            "success": False
        }


@app.route('/api/logout', methods=['POST'])
@cross_origin(supports_credentials=True)
def logout():
    if 'name' in session and session['name']:
        session.pop('name', default=None)

    return {
        "success": True
    }

@app.route('/api/profile', methods=['GET'])
@cross_origin(supports_credentials=True)
def getProfile():
    if 'name' in session and session['name']:
        return {
            "success": True,
            "profile": fetchProfileFromDB(session['name'])
        }
    
    return {
        "success": False
    }


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@cross_origin(supports_credentials=True)
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
