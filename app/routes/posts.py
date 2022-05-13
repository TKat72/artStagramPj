from flask import Blueprint, jsonify, render_template, redirect, request, session
from app.models import db, User, Photo, Post , Comment
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.create_post_form import PostForm
from app.forms.update_post_form import UpdatePostForm
from app.forms.remove_pt_form import RemovePhotoForm
from app.forms.add_photo_form import AddPhotoForm
from app.awsfunc import (upload_file_to_s3, allowed_file, get_unique_filename)

posts_router = Blueprint("posts", __name__)


@posts_router.route("/all")
def post_all():
    posts = Post.query.all()
    # print({"posts": [ podt.to_dict() for podt in posts]})

    return {"posts": [ podt.to_dict() for podt in posts]}

@posts_router.route("/create-post", methods=["GET","POST"])
def create_post():

    user_id = current_user.id

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("..............", form.data)
    if form.validate_on_submit():
        print("im here 444444444444")
        new_post = Post(
            user_id= user_id,
            description = form.data["description"],
            created_at = form.data['created_at'],
            updated_at = form.data['updated_at']
        )
        db.session.add(new_post)
        db.session.commit()
        new_photo= Photo(
            user_id= user_id,
            post_id = new_post.id,
            photo_url = form.data['photo_url'],
        )


        if form.data['photo_url2']:
            new_photo2= Photo(
            user_id= user_id,
            post_id = new_post.id,
            photo_url = form.data['photo_url2']
            )
            db.session.add(new_photo2)
        if form.data['photo_url3']:
            new_photo3= Photo(
            user_id= user_id,
            post_id = new_post.id,
            photo_url = form.data['photo_url2']
            )
            db.session.add(new_photo3)

        db.session.add(new_photo)
        db.session.commit()
        return new_post.to_dict()

    print(form.errors)
    return  {"errors": validation_errors_to_error_messages(form.errors)},401


@posts_router.route("/<int:id>")
def single_post(id):
    post = Post.query.get(id)
    return post.to_dict()

@posts_router.route("/<int:id>/edit",methods=["GET","POST"])
def update_post(id):
    print("im here -------------------------")
    post = Post.query.get(id)
    form = UpdatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post.description = form.data['description']
        post.updated_at = form.data['updated_at']
        db.session.commit()
        return post.to_dict()

    return render_template("update_post_form.html", form= form)

@posts_router.route("/<int:id>/remove-photo", methods=["DELETE"])
def remove_photo(id):
    post = Post.query.get(id)
    form = RemovePhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        photo = Photo.query.get(form.data['photo_id'])
        post.updated_at = form.data['updated_at']
        db.session.delete(photo)
        db.session.commit()
        return post.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)},401

@posts_router.route("/<int:id>/add-photo", methods=["POST"])
def add_photo(id):
    post = Post.query.get(id)
    user_id = current_user.id
    form = AddPhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_photo= Photo(
            user_id= user_id,
            post_id = post.id,
            photo_url = form.data['photo_url']
        )
        db.session.add(new_photo)

        post.updated_at = form.data['updated_at']
        db.session.commit()
        return post.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)},401


@posts_router.route("/<int:id>/delete", methods=["DELETE"])
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return {"massage":"Secsees"}
