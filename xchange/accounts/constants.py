ABOUT_ME_MAX_LEN = 1000

AVATARS_FOLDER = "avatars"

DEFAULT_AVATARS = [
    f"{AVATARS_FOLDER}/bear.png",
    f"{AVATARS_FOLDER}/chicken.png",
    f"{AVATARS_FOLDER}/ganesha.png",
    f"{AVATARS_FOLDER}/rabbit.png",
    f"{AVATARS_FOLDER}/turtle.png",
]

PASSWORD_MAX_LEN = 128
PASSWORD_MIN_LEN = 8

ERROR_MESSAGES = {
    'INVALID_CONFIRM_PASSWORD': 'INVALID_CONFIRM_PASSWORD',
    'INVALID_RESET_PASSWORD': 'Password & Reset Password does not match',
    'INVALID_EMAIL_DOMAIN': 'Only email with domain @kiet.edu are allowed',
    'INVALID_USERNAME': 'Username does not match with email',
    'INVALID_TOKEN': 'Invalid/Expired token, Please try again',
    'ACTION_NOT_ALLOWED': 'Action not allowed',
    'INACTIVE_ACCOUNT': 'No active account exist with this email address',
    'VERIFICATION_REQUIRED': 'Please verify your account first',
    'ACCOUNT_SUSPENDED': 'Your account has been suspended',
}

KIET_DOMAIN = '@kiet.edu'
