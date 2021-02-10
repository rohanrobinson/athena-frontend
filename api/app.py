from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_restful import Api

from database.db import initialize_db
from resources.routes import initialize_routes

# instructions:
# `pipenv shell`
# `pipenv install flask flask-bcrypt flask-jwt-extended flask-restful`
# to set env file location on mac:
#   `export ENV_FILE_LOCATION=./.env`


app = Flask(__name__)
app.config.from_envvar('ENV_FILE_LOCATION')

api = Api(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/athena'
}

initialize_db(app)
initialize_routes(api)

app.run()
