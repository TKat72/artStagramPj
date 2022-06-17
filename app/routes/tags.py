from flask import Blueprint, render_template, request
from app.models.db import db
from app.models.tag import Tag
from app.models.post import Post
from app.forms.create_tag_form import CreateTagForm


tags_routes = Blueprint("tags",__name__)

#get all tags

@tags_routes.route('/all')
def get_tags():
    result = Tag.query.all()
    return {"tags": [tag.to_dict() for tag in result]}

@tags_routes.route('/create_tag', methods=['GET','POST'])
def create_tag():
    form = CreateTagForm()
    test = form.data['tag_name']
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_tag = Tag(
            tag_name = form.data['tag_name']
        )
        db.session.add(new_tag)
        db.session.commit()
        return new_tag.to_dict()

    return render_template("new_tag.html", form=form)


