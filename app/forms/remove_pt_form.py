from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField
from  wtforms.validators import DataRequired, ValidationError, Length
import  datetime

class RemovePhotoForm(FlaskForm):
    photo_id = IntegerField('photo_id', validators=[DataRequired()])
    updated_at = DateTimeField('updated_at', validators=[DataRequired()], default=datetime.datetime.now)
    submit = SubmitField('submit')
