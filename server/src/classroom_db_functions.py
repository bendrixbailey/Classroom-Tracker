import os
from server.api.swen_344_db_utils import *

def add_classroom(normal, yellow, max, current, name, floor, building):
    #database function to add a classroom
    sql = """
        INSERT INTO classrooms(normal, yellow, max, current, name, floor, building)
        VALUES(%(normal)s, %(yellow)s, %(max)s, %(current)s, %(name)s, %(floor)s, %(building)s)
    """
    exec_commit(sql, {
        'normal' : normal,
        'yellow' : yellow,
        'max' : max,
        'current' : current,
        'name' : name,
        'floor' : floor,
        'building' : building
    })

def update_class(id, newcount):
    #database function to update a classroom's count
    newcount = int(newcount)

    sql = """
        UPDATE classrooms
        SET current = %(newcount)s
        WHERE id = %(id)s
    """

    exec_commit(sql, {'newcount' : newcount, 'id' : id})

def remove_class(id):
    #database function to remove classroom
    sql = """
        DELETE FROM classrooms
        WHERE id = %(id)s
    """

    exec_commit(sql, {'id' : id})