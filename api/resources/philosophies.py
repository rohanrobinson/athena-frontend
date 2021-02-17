from flask import Response, request
from flask_jwt_extended import create_access_token
from database.models import User
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
import datetime

class CreatePhilosophy(Resource):
    def post(self):
        body = request.get_json()
        philosophy = Philosophy(**body)
        philosophy.save()
        id = philosophy.id
        return{'id': str(id)}, 200

class GetPhilosophy(Resource):
    def get(self, id):
        philosophy = Philosophy.objects.get(id=id).to_json()
        return Response(philosophy, mimetype="application/json", status=200)

class GetAllPhilosophies(Resource):
    def get(self):
        philosophy = Philosophy.objects.to.json()
        return Response(philosophy, mimetype="application/json", status=200)

class UpdatePhilosophy(Resource):
    def put(self, id):
        body = request.get_json()
        Philosophy.objects.get(id=id).update(**body)
        return '', 200
