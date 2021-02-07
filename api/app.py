from flask import Flask, request, Response
from database.db import initialize_db
from database.models import User
import json

# To run:
# `pipenv shell`
# `python app.py`
# then use postman to test the apis

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/users'
}

initialize_db(app)

# get all user docs
@app.route('/users')
def get_users():
    users = User.objects().to_json()
    return Response(users, mimetype="application/json", status=200)

# get one user doc
@app.route('/users/<id>')
def get_User(id):
    users = User.objects.get(id=id).to_json()
    return Response(users, mimetype="application/json", status=200)

# add a user doc
@app.route('/users', methods=['POST'])
def add_user():
    body = request.get_json()
    user =  User(**body).save()
    id = user.id
    return {'id': str(id)}, 200

# update a user doc
@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    body = request.get_json()
    User.objects.get(id=id).update(**body)
    return '', 200

# delete a user doc
@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    user = User.objects.get(id=id).delete()
    return '', 200

app.run()