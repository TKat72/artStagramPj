from flask import Blueprint, jsonify, render_template, redirect, request, session
from app.models import db, User, Photo, Post , Comment
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.create_post_form import PostForm

posts_router = Blueprint("posts", __name__)


@posts_router.route("/all")
def post_all():
    posts = Post.query.all()
    # print({"posts": [ podt.to_dict() for podt in posts]})

    return {"posts": [ podt.to_dict() for podt in posts]}

@posts_router.route("/create-post", methods=["GET","POST"])
def create_post():
    print("...............-----------",)
    user_id = current_user.id
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            user_id= user_id,
            description = form.data['description'],
            created_at = form.data['created_at'],
            updated_at = form.data['updated_at']
        )
        db.session.add(new_post)
        db.session.commit()
        new_photo= Photo(
            user_id= user_id,
            post_id = new_post.id,
            photo_url = form.data['photo_url']
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


    return render_template("new_post.html", form=form)


@posts_router.route("/<int:id>")
def single_post(id):
    post = Post.query.get(id)
    return post.to_dict()
