from .auth import SignupApi, LoginApi, GetUserApi, UpdateUserApi, AddSavedQuote

def initialize_routes(api):
    # ------------ User  ------------#
    # sign up
    # email and password required
    # username, savedQuotes, surveyResults optional
    api.add_resource(SignupApi, '/api/auth/signup')

    # login
    # email and password required
    api.add_resource(LoginApi, '/api/auth/login')

    # get user document
    # need jwt
    api.add_resource(GetUserApi, '/api/auth/get/<id>')

    # update username or survey results
    # need jwt
    api.add_resource(UpdateUserApi, '/api/auth/update/<id>')

    # add a saved quote
    # need jwt
    api.add_resource(AddSavedQuote, '/api/auth/saveQuote/<id>')


    # ------------ Quotes  ------------#

