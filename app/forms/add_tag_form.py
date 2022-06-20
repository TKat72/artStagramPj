from flask_wtf import FlaskForm
from wtforms import IntegerField,SubmitField
from wtforms.validators import DataRequired

class AddTagPostForm(FlaskForm):
    tag_id = IntegerField("Tag ID", validators=[DataRequired()])
    submit = SubmitField("Submit")
