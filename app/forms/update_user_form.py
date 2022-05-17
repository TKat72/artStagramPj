from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField
from  wtforms.validators import DataRequired, ValidationError, Length, Email
import  datetime

class UpdateUserForm(FlaskForm):
    email = StringField('email', validators=[Email(),])
    username = StringField('username')
    password = StringField('password')
    updated_at = DateTimeField('updated_at', validators=[DataRequired()], default=datetime.datetime.now)
    submit = SubmitField('submit'),
