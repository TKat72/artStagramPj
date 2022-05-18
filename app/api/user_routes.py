from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
# from app.forms import UpdateUserForm
user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
# @user_routes.route('/<int:id>', methods=['PATCH'])
# @login_required
# def update_user(id):
#     user = User.query.get(id)
#     form = UpdateUserForm()

#     if form.validate_on_submit():
#         if user.email not = form.data['email'] and user.password not = form.data['password'] and user.username not = form.data['username']:
#             user.username = form.data['username']
#             user.password = form.data['password']
#             user.email = form.data['email']
#             db.session.commit()
#             return user.to_dict()
#         if user.email  = form.data['email'] and  user.password not = form.data['password'] and user.username not = form.data['username']:
#             user.username = form.data['username']
#             user.password = form.data['password']
#             db.session.commit()
#             return user.to_dict()
#         if user.email not  = form.data['email'] and  user.password  = form.data['password'] and user.username not = form.data['username']:
#             user.username = form.data['username']
#             user.email = form.data['email']
#             db.session.commit()
#             return user.to_dict()
#         if user.email not  = form.data['email'] and  user.password  not = form.data['password'] and user.username  = form.data['username']:
#             user.password = form.data['password']
#             user.email = form.data['email']
#             db.session.commit()
#             return user.to_dict()
#         if user.password == form.data['password'] and user.email == form.data['email'] and user.username not = form.data['username']:
#             user.username = form.data['username']
#             db.session.commit()
#             return user.to_dict()
#         if user.password  not = form.data['password'] and user.email  == form.data['email'] and user.username == form.data['username']:
#             user.username = form.data['username']
#             db.session.commit()
#             return user.to_dict()
#         if user.password   == form.data['password'] and user.email not  = form.data['email'] and user.username == form.data['username']:
#             user.email = form.data['email']
#             db.session.commit()
#             return user.to_dict()
#         if user.password   == form.data['password'] and user.email   == form.data['email'] and user.username not  === form.data['username']:
#             user.username = form.data['username']
#             db.session.commit()
#             return user.to_dict()
