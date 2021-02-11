from .auth import SignupApi, LoginApi, GetUserApi

def initialize_routes(api):
    api.add_resource(SignupApi, '/api/auth/signup')
    api.add_resource(LoginApi, '/api/auth/login')
    api.add_resource(GetUserApi, '/api/auth/get/<id>')
