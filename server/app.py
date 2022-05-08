import os
from flask import Flask, send_from_directory, request, session
from flask_cors import CORS, cross_origin
from pymongo import MongoClient

# DB_URL = "mongodb+srv://ranjana:HR0xrwSLVIrpEjSZ@clusterrrs.kmsjh.mongodb.net/test"
DB_URL = "mongodb://tejaswi:ehVg5Gz5mKhHEweA@cluster0-shard-00-00.l3sve.mongodb.net:27017,cluster0-shard-00-01.l3sve.mongodb.net:27017,cluster0-shard-00-02.l3sve.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-4n7rhb-shard-0&authSource=admin&retryWrites=true&w=majority"

dbClient = MongoClient("localhost", 27017)
db = dbClient.restrecom
print("Mongo connected")

app = Flask(__name__, static_folder='../build/')
app.config["SESSION_TYPE"] = "mongodb"
app.config["SESSION_MONGODB"] = dbClient
app.secret_key = "thisissupposedtobeasecret"

app.config["CORS_ORIGINS"] = "http://localhost"
CORS(app, supports_credentials=True)

# API Paths

def is_valid_login(username, password):
    print("Checking login for", username)
    p = db.credentials.find_one({"username": username, "password": password})
    # p = (username == "a@b" and password == "asdf")
    # return p
    if p is None:
        return False
    return True

def fetchProfileFromDB(username):
    print("Fetching profile for", username)
    return db.profiles.find_one({ "username": username })

def registerUser(name, tel, username, password):
    db.profiles.insert_one({
        '_id':  username,
        'username': username,
        'name': name,
        'tel': tel
    })
    
    db.credentials.insert_one({ '_id':  username, "username": username, "password": password })

def updateProfilePref(name, diet, cuisine, address):
    fl = { 'username': name }
    upd = {
        'diet': diet,
        'cuisine': cuisine,
        'address': address
    }
    db.profiles.update_one(fl, { '$set': upd })

def getRestaurantFromDB(id):
    return db.restaurant.find_one({ '_id': id })

def getAIRecommendation(username):
    user = db.profiles.find_one({ "username": username })
    visited = user['visited']
    diet = user['diet']
    cuisine = user['cuisine']
    
    return [1, 2, 3]

@app.route('/api/signup', methods=['POST'])
@cross_origin(supports_credentials=True)
def signup():
    body = request.get_json()
    name = body['name']
    tel = body['tel']
    username = body['username']
    password = body['password']
    
    try:
        registerUser(name, tel, username, password)
        session['name'] = username
        return {
            'success': True,
        }
        
    except:
        return {
            'success': False
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

@app.route('/api/prefs', methods=['PUT'])
@cross_origin(supports_credentials=True)
def updatePrefs():
    if 'name' in session and session['name']:
        body = request.get_json()
        diet = str(body['diet'])
        cuisine = str(body['cuisine'])
        address = str(body['address'])
        
        updateProfilePref(session['name'], diet, cuisine, address)
        
        return {
            "success": True,
        }
    
    return {
        "success": False
    }

@app.route('/api/restaurant', methods=['GET'])
@cross_origin(supports_credentials=True)
def getRestInfo():
    rid = request.args.get('id')
    
    info = getRestaurantFromDB(rid)
    
    return {
        'success': True,
        'info': info
    }

@app.route('/api/restaurant', methods=['GET'])
@cross_origin(supports_credentials=True)
def getRecommendation():
    if 'name' in session and session['name']:
        return {
            'success': True,
            'recommendations': getAIRecommendation(session['name'])
        }
    
    return {
        'success': False
    }

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@cross_origin(supports_credentials=True)
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
