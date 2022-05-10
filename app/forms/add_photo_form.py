from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField
from  wtforms.validators import DataRequired, ValidationError, Length
import  datetime

class AddPhotoForm(FlaskForm):

    photo_url = StringField('photo_url',)
    updated_at = DateTimeField('updated_at', validators=[DataRequired()], default=datetime.datetime.now)
    submit = SubmitField('submit')
