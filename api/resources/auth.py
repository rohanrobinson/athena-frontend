from flask import Response, request
from flask_jwt_extended import create_access_token
from database.models import User
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
import datetime

class SignupApi(Resource):
    def post(self):
        body = request.get_json()
        user =  User(**body)
        user.hash_password()
        user.save()
        id = user.id
        return {'id': str(id)}, 200

class LoginApi(Resource):
    def post(self):
        body = request.get_json()
        user = User.objects.get(email=body.get('email'))
        authorized = user.check_password(body.get('password'))
        if not authorized:
            return {'error': 'Email or password invalid'}, 401

        expires = datetime.timedelta(days=7)
        access_token = create_access_token(identity=str(user.id), expires_delta=expires)
        return {'token': access_token}, 200

class UpdateUserApi(Resource):
    @jwt_required
    def put(self, id):
        user_id = get_jwt_identity()
        body = request.get_json()
        User.objects.get(id=id).update(**body)
        return '', 200

class AddSavedQuote(Resource):
    @jwt_required
    def put(self, id):
        user_id = get_jwt_identity()
        body = request.get_json()
        currUser = User.objects.get(id=id)
        currUser.savedQuotes.append(body)
        currUser.save()
        return '', 200

class GetUserApi(Resource):
    @jwt_required
    def get(self, id):
        user = User.objects.get(id=id).to_json()
        return Response(user, mimetype="application/json", status=200)
