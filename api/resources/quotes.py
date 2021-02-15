from flask import Response, request
from flask_jwt_extended import create_access_token
from database.models import Quote
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
import datetime

class CreateQuote(Resource):
    def post(self):
        body = request.get_json()
        quote =  Quote(**body)
        quote.save()
        id = quote.id
        return {'id': str(id)}, 200

class GetQuote(Resource):
    def get(self, id):
        quote = Quote.objects.get(id=id).to_json()
        return Response(quote, mimetype="application/json", status=200)

class GetAllQuotes(Resource):
    def get(self):
        quotes = Quote.objects.to_json()
        return Response(quotes, mimetype="application/json", status=200)

class UpdateQuote(Resource):
    def put(self, id):
        body = request.get_json()
        Quote.objects.get(id=id).update(**body)
        return '', 200