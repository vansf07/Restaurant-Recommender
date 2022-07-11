import os
from flask import Flask, send_from_directory, request, session
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import numpy as np 
import pandas as pd 
import json
import re
import os
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords

DB_URL = os.environ["DB_URL"]

dbClient = MongoClient(DB_URL)
db = dbClient.sample_restaurants
print("Mongo connected")

app = Flask(__name__, static_folder='../build/')
app.config["SESSION_TYPE"] = "mongodb"
app.config["SESSION_MONGODB"] = dbClient
app.secret_key = "thisissupposedtobeasecret"

app.config["CORS_ORIGINS"] = "http://localhost"
CORS(app, supports_credentials=True)

f= open('restaurant_dataset.json')
restaurants = json.load(f)
df = pd.DataFrame.from_dict(restaurants)
# df["combined_text"] =  df["Cuisine"] + " " + df["Address"]
df["combined_text"] =  df["Cuisine"]

"""stopwords = stopwords.words('english')
df['text_without_stopwords'] = df['combined_text'].apply(lambda x: ' '.join([word for word in x.split() if word not in (stopwords)]))
cv = CountVectorizer()
count_matrix = cv.fit_transform(df['text_without_stopwords'])"""

tf = TfidfVectorizer(analyzer = "word", ngram_range=(1,2), min_df=0, stop_words='english')
tfidf_matrix = tf.fit_transform(df['combined_text'])
cosine =  cosine_similarity(tfidf_matrix, tfidf_matrix)

def get_name_from_index(Index):
    return df[df.restaurant_id == Index]["Name"].values[0]
def get_index_from_name(Name):
    return df[df.Name == Name]["restaurant_id"].values[0]

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
        'tel': tel,
        'visited': []
    })
    
    db.credentials.insert_one({ '_id':  username, "username": username, "password": password })

def updateProfilePref(name, cuisine, address):
    fl = { 'username': name }
    upd = {
        'diet': diet,
        'cuisine': cuisine,
        'address': address
    }
    db.profiles.update_one(fl, { '$set': upd })

def getRestaurantFromDB(id):
    return db.restaurants.find_one({ "restaurant_id": id }, {"_id": 0})

def getVisitedRest(username):
    x = db.profiles.find_one({ "username": username })
    print(username, x)
    return x

def setProfileVisit(username, id):
    x = getVisitedRest(username)['visited']
    x.append(id)
    upd = {
        'visited': x
    }
    db.profiles.update_one({"username": username}, { '$set': upd } )

def getAIRecommendation(username):

    user = db.profiles.find_one({ "username": username })
    restaurant_list = []
    visited = user['visited']
    print("AI", username, visited)
    diet = user['diet']
    cuisine = user['cuisine']


    def get_recommendations(rest):
        restaurant_index = rest
        similar_restaurants = list(enumerate(cosine[restaurant_index]))
        sortedrestaurants = sorted(similar_restaurants, key = lambda x:x[1], reverse=True)[1:]
        # sortedrestaurants = similar_restaurants
        i = 0
        for restaurant in sortedrestaurants:
            if restaurant[0] in visited or restaurant[0] in restaurant_list:
                continue
            restaurant_list.append(restaurant[0])
            if len(restaurant_list) > 5:
                break
            i = i+1
            if i>2:
                break
        return
    
    temp_name = 5
    
    if not visited:
        food = cuisine
        j = 0
        for i in df['Cuisine']:
            if i.find(food)!=-1:
                ind = j
                temp_name = df['restaurant_id'][j]
                break
            j += 1
        get_recommendations(temp_name)
    else:
        for rid in visited:
            get_recommendations(rid)

    # def recommend(json_object):
    #     temp_name = ""
    #     print('Your recommendations are:')
    #     if not json_object['restaurants_visited']:
    #         food = json_object['cuisine']
    #         j = 0
    #         for i in df['Cuisine']:
    #             if i.find(food)!=-1:
    #                 ind = j
    #                 temp_name = get_name_from_index(df.restaurant_id)
    #                 break
    #             j += 1
    #         get_recommendations(temp_name)
    #     else:
    #         for title in json_object['restaurants_visited']:
    #             get_recommendations(title)
    #     print('Which of these restaurants are you choosing today? Enter the name: ')
    #     chosen = input()
    #     return chosen

    # temp = {'name': name , 'password': password, 'cuisine': food, 'address': address, 'restaurants_visited': []}
    # json_object = json.dumps(temp, indent = 4)
    # with open("user.json", "w") as outfile:
    #         outfile.write(json_object)
    # with open('user.json', 'r') as openfile:
    #     json_object = json.load(openfile)
    #     print(json_object)
    #     a = recommend(json_object)
    #     temp = temp['restaurants_visited'].append(a)
    #     json_object = json.dumps(temp, indent = 4)
    #     with open("user.json", "w") as outfile:
    #         outfile.write(json_object)

    return restaurant_list

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
        
        updateProfilePref(session['name'],  cuisine, address)
        
        return {
            "success": True,
        }
    
    return {
        "success": False
    }

@app.route('/api/restaurant', methods=['GET'])
@cross_origin(supports_credentials=True)
def getRestInfo():
    rid = int(request.args.get('id'))
    info = getRestaurantFromDB(rid)
        
    return {
        'success': True,
        'info': info
    }

@app.route('/api/recommendations', methods=['GET'])
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

@app.route('/api/setVisit', methods=['GET'])
@cross_origin(supports_credentials=True)
def setVisited():
    if 'name' in session and session['name']:
        rid = int(request.args.get('id'))
        setProfileVisit(session['name'], rid)
        
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
