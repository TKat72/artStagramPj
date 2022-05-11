from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField
from  wtforms.validators import DataRequired, ValidationError, Length
import  datetime

class AddCommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])
    post_id = IntegerField('post_id', validators=[DataRequired()])
    created_at = DateTimeField('created_at', validators=[DataRequired()], default=datetime.datetime.now)
    updated_at = DateTimeField('updated_at', validators=[DataRequired()], default=datetime.datetime.now)
    submit = SubmitField('submit')
