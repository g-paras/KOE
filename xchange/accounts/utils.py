import random

from accounts import constants as accounts_constants

def get_default_avatar():
    """
    Method to return a random avatar from the default avatars list
    """
    return random.choice(accounts_constants.DEFAULT_AVATARS)
