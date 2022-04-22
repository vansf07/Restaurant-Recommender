from flask import Flask, send_from_directory

app = Flask(__name__, static_url_path='', static_folder='../build/')

@app.route('/')
def send_index():
    return send_from_directory('../build/', 'index.html')
