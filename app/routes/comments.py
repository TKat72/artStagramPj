from flask import Blueprint, jsonify, render_template, redirect, request, session
from app.models import db, User, Photo, Post , Comment
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.add_comment_form import AddCommentForm
from app.forms.update_comment_form import UpdateCommentForm


comments_routes = Blueprint('comments', __name__)


@comments_routes.route("/create-comment", methods=['POST'])
def create_comment():
    user_id= current_user.id
    form = AddCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            user_id = user_id,
            post_id = form.data['post_id'],
            comment = form.data['comment'],
            created_at = form.data['created_at'],
            updated_at = form.data['updated_at']
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)},401


@comments_routes.route("/<int:id>", methods=["PATCH"])
def update_comment(id):
    comment = Comment.query.get(id)
    form = UpdateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.comment = form.data['comment']
        comment.updated_at = form.data['updated_at']
        db.session.commit()
        return comment.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}

@comments_routes.route("/<int:id>", methods=["DELETE"])
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return {"massage": "deleted"}
    return {"errors": validation_errors_to_error_messages(form.errors)}



