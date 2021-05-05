from flask_restful import Resource
import os
from flask_restful import request
from flask_restful import reqparse
import json
from server.src.classroom_db_functions import *
from .swen_344_db_utils import *

parser = reqparse.RequestParser()
parser.add_argument('normal')
parser.add_argument('yellow')
parser.add_argument('max')
parser.add_argument('current')
parser.add_argument('floor')
parser.add_argument('name')
parser.add_argument('building')
parser.add_argument('id')

class Classes(Resource):
    #returns data for all classes
    def get(self):
        result = exec_get_all("SELECT * FROM classrooms")
        return result   #server needs initial list of classes

class AddClass(Resource):
    #adds a single class to database
    def post(self):
        arguments = parser.parse_args()
        add_classroom(
            arguments['normal'],
            arguments['yellow'],
            arguments['max'],
            arguments['current'],
            arguments['name'],
            arguments['floor'],
            arguments['building'],
        )

class UpdateClass(Resource):
    #updates a class UNUSED AS OF NOW
    def post(self):
        arguments = parser.parse_args()
        update_class(
            arguments['id'],
            arguments['current']
        )

class RemoveClass(Resource):
    #removes a classroom
    def post(self):
        arguments = parser.parse_args()
        remove_class(arguments['id'])

