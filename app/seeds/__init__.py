from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .photos import seed_photos, undo_photos
from .comments import seed_comments, undo_comments
from .tags import seed_tags, undo_tags
from .follows import seed_follows
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_posts()
    seed_photos()
    seed_comments()
    seed_tags()
    seed_follows()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_posts()
    undo_photos()
    undo_comments()
    undo_tags()
    # Add other undo functions here
