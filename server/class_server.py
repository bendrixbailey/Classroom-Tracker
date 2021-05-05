import os
from flask import Flask
from flask_restful import Resource, Api

from server.api.classroomAPI import *
from server.api.swen_344_db_utils import *

app = Flask(__name__) #create Flask instance

api = Api(app) #api router

api.add_resource(AddClass, '/AddClass')
api.add_resource(Classes, '/Classes')
api.add_resource(UpdateClass, '/UpdateClass')
api.add_resource(RemoveClass, '/Delete')

if __name__ == '__main__':
    print("Loading db")
    exec_sql_file('classrooms.sql')
    print("Starting flask")
    app.run(debug=True), #starts Flask
