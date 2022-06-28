from flask import Blueprint, jsonify, render_template, redirect, request, session
from app.models import db, User, Photo, Post , Comment, Tag
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.create_post_form import PostForm
from app.forms.update_post_form import UpdatePostForm
from app.forms.remove_pt_form import RemovePhotoForm
from app.forms.add_photo_form import AddPhotoForm
from app.forms.add_tag_form import AddTagPostForm
from sqlalchemy import desc, asc
from app.awsfunc import (upload_file_to_s3, allowed_file, get_unique_filename)

posts_router = Blueprint("posts", __name__)


@posts_router.route("/all")
def post_all():
    posts = Post.query.order_by(desc(Post.id))

    print("==============>>>>>>>>>>>>>>>>>", posts)
    # print("---------------------->>>>>>>>>>>>>>>>>", posts2)
    return {"posts": [ post.to_dict() for post in posts ]}


@posts_router.route("/myposts")
def post_my():
    user_id = current_user.id
    posts = Post.query.filter(Post.user_id == user_id).all()

    print("==============>>>>>>>>>>>>>>>>>", posts)
    # print("---------------------->>>>>>>>>>>>>>>>>", posts2)
    return {"posts": [ post.to_dict() for post in posts ]}

@posts_router.route("/create-post", methods=["GET","POST"])
def create_post():

    user_id = current_user.id

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("im here 444444444444" ,form.data)
    if form.validate_on_submit():

        if "image" not in request.files:
            return {"errors": ["image required"]}, 400

        image = request.files["image"]

        if not allowed_file(image.filename):
            print('not allowed')
            return  {"errors": ["file must be one of falowing types pdf, png, jpg, jpeg, gif, mp4, 3gp, mov, m4a, m4v "]}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        print('uploading', upload)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400


        url = upload["url"]

        print("url%)-___________---------", url)
        new_post = Post(
            user_id= user_id,
            description = form.data["description"],
            created_at = form.data['created_at'],
            updated_at = form.data['updated_at']
        )
        db.session.add(new_post)
        db.session.commit()
        print("post id back end =========>", new_post.id)
        new_photo= Photo(
            user_id= user_id,
            post_id = new_post.id,
            photo_url = url,
        )

        if form.data['photo_url2'] and form.data['photo_url2'] != "null" and form.data['photo_url2'] !="undefined":
            if "photo_url2" not in request.files:
                return {"errors": ["image2 required"]}, 400

            image = request.files["photo_url2"]

            if not allowed_file(image.filename):
                print('not allowed')
                return  {"errors": ["file must be one of falowing types pdf, png, jpg, jpeg, gif, mp4, 3gp, mov, m4a, m4v "]}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            print('uploading', upload)

            if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
                return upload, 400


            url2 = upload["url"]
            if url2:
                new_photo2= Photo(
                user_id= user_id,
                post_id = new_post.id,
                photo_url = url2
                )
                db.session.add(new_photo2)
        if form.data['photo_url3'] and form.data['photo_url3'] != 'null' and form.data['photo_url2'] !='undefined':
            if "photo_url3" not in request.files:
                return {"errors": ["image3 required"]}, 400

            image = request.files["photo_url3"]

            if not allowed_file(image.filename):
                print('not allowed')
                return {"errors": ["file must be one of falowing types pdf, png, jpg, jpeg, gif, mp4, 3gp, mov, m4a, m4v "]}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            print('uploading', upload)

            if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
                return upload, 400


            url3 = upload["url"]
            if url3:
                new_photo3= Photo(
                user_id= user_id,
                post_id = new_post.id,
                photo_url = url3
                )
            db.session.add(new_photo3)

        db.session.add(new_photo)
        db.session.commit()
        return new_post.to_dict()

    print("Errosr", form.errors)
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

    return {"errors": validation_errors_to_error_messages(form.errors)},401

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
    # form = AddPhotoForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     new_photo= Photo(
    #         user_id= user_id,
    #         post_id = post.id,
    #         photo_url = form.data['photo_url']
    #     )
    #     db.session.add(new_photo)

    #     post.updated_at = form.data['updated_at']
    #     db.session.commit()
    #     return post.to_dict()
    print("F-----------", request.files['image'])
    if not  request.files['image']:
        print("in firts if ")
        return {"errors": ["image required"]},400
    image = request.files["image"]

    if not allowed_file(image.filename):
        print("in second  if ")
        return  {"errors": ["file must be  one of falowing types  pdf, png, jpg, jpeg, gif, mp4, 3gp, mov, m4a, m4v "]}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    print("---------", upload)
    if "url" not in upload:
        print("in therd  if ")
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    if url:
        new_photo= Photo(
            user_id= user_id,
            post_id = post.id,
            photo_url = url
        )
        db.session.add(new_photo)
        db.session.commit()
        return post.to_dict()
    print('did not hit last ')

    return {"errors": validation_errors_to_error_messages(form.errors)},401


@posts_router.route("/<int:id>/delete", methods=["DELETE"])
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return {"massage":"Secsees"}

@posts_router.route("/<int:id>/add_tag", methods=["GET","POST"])
def add_tag(id):
    post = Post.query.get(id)
    form = AddTagPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        tag = Tag.query.get(form.data['tag_id'])
        print(" Gett tag for post", tag.to_dict())
        post.tags.append(tag)
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return render_template("add_tag_post.html", form = form)

@posts_router.route("/<int:id>/remove_tag", methods =["POST", "GET"])
def remove_tag(id):
    post = Post.query.get(id)
    form = AddTagPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        tag = Tag.query.get(form.data['tag_id'])
        post.tags.remove(tag)
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return render_template("add_tag_post.html", form=form)



@posts_router.route("/<int:id>/likes", methods=["POST"])
def add_like(id):
    post = Post.query.get(id)
    current_user.like(post)
    return post.to_dict()

@posts_router.route("/<int:id>/likes", methods=["DELETE"])
def remove_like(id):
    post = Post.query.get(id)
    print("------------ api routs delete post", post)
    current_user.unlike(post)
    print("******************************afterr unblike")
    return post.to_dict()
