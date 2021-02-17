from .auth import SignupApi, LoginApi, GetUserApi, UpdateUserApi, AddSavedQuote
from .quotes import CreateQuote, GetQuote, UpdateQuote, GetAllQuotes
from .sentiments import CreateSentiment, GetSentiment, GetAllSentiments, UpdateSentiment
from .philosophies import CreatePhilosophy, GetPhilosophy, GetAllPhilosophies, UpdatePhilosophy

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
    # create a quote in database
    # quote required
    api.add_resource(CreateQuote, '/api/quote')

    # get a quote from database
    api.add_resource(GetQuote, '/api/quote/<id>')

    # get all quotes from database
    api.add_resource(GetAllQuotes, '/api/allquotes')

    # update a quote from database
    api.add_resource(UpdateQuote, '/api/quote/update/<id>')
    
    
    # ------------ Sentiments  ------------#
    api.add_resource(CreateSentiment, '/api/sentiment')
    api.add_resource(GetSentiment, '/api/sentiment/<id>')
    api.add_resource(GetAllSentiments, '/api/allsentiments')
    api.add_resource(UpdateSentiment, '/api/sentiment/update/<id>')
    
    
    # ------------ Philosophies  ------------#
    api.add_resource(CreatePhilosophy, '/api/philosophy')
    api.add_resource(GetPhilosophy, '/api/philosophy/<id>')
    api.add_resource(GetAllPhilosophies, '/api/allphilosophies')
    api.add_resource(UpdatePhilosophy, '/api/philosophy/update/<id>')
    
    
    

    
    
    
