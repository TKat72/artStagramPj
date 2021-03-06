from flask import Blueprint, jsonify, render_template, redirect, request, session
from app.models import db, User, Photo, Post , Comment
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.add_comment_form import AddCommentForm
from app.forms.update_comment_form import UpdateCommentForm


comments_routes = Blueprint('comments', __name__)

@comments_routes.route("/<int:id>/all")
def getAllcoments(id):
    comments = Comment.query.filter(Comment.post_id == id).all()
    test = [comment.to_dict() for comment in comments]
    print(test)
    return {"comments": [ comment.to_dict() for comment in comments]}

@comments_routes.route("/mycoments")
def getAllUsercoments():
    user_id = current_user.id
    comments = Comment.query.filter(Comment.user_id == user_id).all()
    test = [comment.to_dict() for comment in comments]
    print(test)
    return {"comments": [ comment.to_dict() for comment in comments]}

@comments_routes.route("/create-comment", methods=['POST'])
def create_comment():
    user_id= current_user.id
    form = AddCommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    print("<<<<<<<<>>>>>>>>>",form.data)
    if form.validate_on_submit():
        print(" in create comment route ********************************** if sts")
        new_comment = Comment(
            user_id = user_id,
            post_id = int(form.data['post_id']),
            comment = form.data['comment'],
            created_at = form.data['created_at'],
            updated_at = form.data['updated_at']
        )
        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()
    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)},401


@comments_routes.route("/<int:id>", methods=["PATCH"])
def update_comment(id):
    comment = Comment.query.get(id)
    form = UpdateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("in edit =>>>>>", form.data)
    if form.validate_on_submit():

        comment.comment = form.data['comment']
        comment.updated_at = form.data['updated_at']
        db.session.commit()
        return comment.to_dict()
    print("in edit =>>>>>", form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@comments_routes.route("/<int:id>", methods=["DELETE"])
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return {"massage": "deleted"}
    return {"errors": validation_errors_to_error_messages(form.errors)}
