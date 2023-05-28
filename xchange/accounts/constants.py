ABOUT_ME_MAX_LEN = 1000

AVATARS_FOLDER = "avatars"

DEFAULT_AVATARS = [
    f"{AVATARS_FOLDER}/bear.png",
    f"{AVATARS_FOLDER}/chicken.png",
    f"{AVATARS_FOLDER}/ganesha.png",
    f"{AVATARS_FOLDER}/rabbit.png",
    f"{AVATARS_FOLDER}/turtle.png",
    f"{AVATARS_FOLDER}/panda.png",
    f"{AVATARS_FOLDER}/cat.png",
]

PASSWORD_MAX_LEN = 128
PASSWORD_MIN_LEN = 6

ERROR_MESSAGES = {
    'INVALID_CONFIRM_PASSWORD': 'INVALID_CONFIRM_PASSWORD',
    'INVALID_RESET_PASSWORD': 'Password & Reset Password does not match',
    'INVALID_EMAIL_DOMAIN': 'Only email with domain @kiet.edu are allowed',
    'INVALID_USERNAME': 'Username does not match with email',
    'INVALID_TOKEN': 'Invalid or Expired verification link',
    'ACTION_NOT_ALLOWED': 'Action not allowed',
    'INACTIVE_ACCOUNT': 'Please enter correct email and password',
    'VERIFICATION_REQUIRED': 'Email Verification Pending, check your email for verification',
    'ACCOUNT_SUSPENDED': 'Your account has been suspended',
    'ALREADY_VERIFIED': 'You account is already verified',
    'ACCOUNT_NOT_FOUND': 'No account exists for the provided email',
    'INVALID_LINK': 'This link is either expired or invalid, please try again',
}

KIET_DOMAIN = '@kiet.edu'
