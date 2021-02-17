from flask import Response, request
from flask_jwt_extended import create_access_token
from database.models import User
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
import datetime

class CreateSentiment(Resource):
    def post(self):
        body = request.get_json()
        sentiment = Sentiment(**body)
        sentiment.save()
        id = sentiment.id
        return{'id': str(id)}, 200

class GetSentiment(Resource):
    def get(self, id):
        sentiment = Sentiment.objects.get(id=id).to_json()
        return Response(sentiment, mimetype="application/json", status=200)

class GetAllSentiments(Resource):
    def get(self):
        sentiments = Sentiment.objects.to.json()
        return Response(sentiments, mimetype="application/json", status=200)

class UpdateSentiment(Resource):
    def put(self, id):
        body = request.get_json()
        Sentiment.objects.get(id=id).update(**body)
        return '', 200
