from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField, FileField
from  wtforms.validators import DataRequired, ValidationError, Length
import  datetime
class PostForm(FlaskForm):
    description = StringField('description', validators=[Length(max=1000), DataRequired()])
    photo_url = StringField('photo_url', validators=[DataRequired()])
    photo_url2 = StringField('photo_url2',)
    photo_url3 = StringField('photo_url3',)
    created_at = DateTimeField('created_at', validators=[DataRequired()], default=datetime.datetime.now)
    updated_at = DateTimeField('updated_at', validators=[DataRequired()], default=datetime.datetime.now)
    submit = SubmitField('submit')
