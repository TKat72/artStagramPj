from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField
from  wtforms.validators import DataRequired, ValidationError, Length
import  datetime

class UpdatePostForm(FlaskForm):
    description = StringField('description', validators=[Length(max=1000)])
    photo_url = StringField('photo_url',)
    photo_url2 = StringField('photo_url2',)
    photo_url3 = StringField('photo_url3',)
    updated_at = DateTimeField('updated_at', validators=[DataRequired()], default=datetime.datetime.now)
    submit = SubmitField('submit')
