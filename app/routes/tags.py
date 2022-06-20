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
    all_tags = Tag.query.all()
    tag = {'tag_id': [tag.id for tag in all_tags if tag.tag_name == test]}
    print("+++++++test for tag --------------- ", len(tag))
    if len(tag['tag_id']) > 0:
        return tag
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_tag = Tag(
            tag_name = form.data['tag_name']
        )
        db.session.add(new_tag)
        db.session.commit()
        return new_tag.to_dict()

    return render_template("new_tag.html", form=form)

@tags_routes.route('/<int:id>')
def get_tag(id):
    tag = Tag.query.get(id)
    return tag.to_dict()
