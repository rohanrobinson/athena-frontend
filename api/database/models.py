from .db import db

class User(db.Document):
    name = db.StringField(required=True, unique=True)
    surveyResults = db.ListField(db.StringField(), required=True)
    savedQuotes = db.ListField(db.StringField(), required=True)