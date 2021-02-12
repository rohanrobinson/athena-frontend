from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash

class User(db.Document):
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True, min_length=6)
    username = db.StringField(required=False)
    surveyResults = db.DictField(required=False)
    savedQuotes = db.ListField(required=False)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Quote(db.Document):
    quote = db.StringField(required=True)
    philosophyName = db.StringField(required=False)
    philosophyId = db.StringField(required=False)
    author = db.StringField(required=False)
    timesSaved = db.Intfield(required=False)


