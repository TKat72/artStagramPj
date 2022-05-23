from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length
import datetime
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(),Email(), user_exists, Length(min=4, message=" must be at least 4 characters")])
    password = StringField('password', validators=[DataRequired(), EqualTo("passwordRepeat", message="passwords mast match"), Length(min=5, message=" must be at least 5 characters")])
    passwordRepeat = StringField('passwordRepeat', validators=[DataRequired()])
    created_at = DateTimeField('created_at', validators=[DataRequired()], default=datetime.datetime.now)
    updated_at = DateTimeField('updated_at', validators=[DataRequired()], default=datetime.datetime.now)
