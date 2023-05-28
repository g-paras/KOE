const sharedCommonConstants = {
  KIET_EMAIL_DOMAIN: "@kiet.edu",
  PAGE_TITLES: {
    LOGIN: "Login",
    REGISTER: "Register",
    HOME: "KOE | Home",
    PRODUCT_DETAIL: "Advertisement Detail Page",
    CREATE_PRODUCT: "Post Ad",
    PAGE_NOT_FOUND: "Page not found",
    EDIT_PRODUCT: "Edit Ad",
    EMAIL_VERIFICATION: "KOE | Email Verification",
    RESEND_EMAIL_VERIFICATION: "KOE | Resend Verification Email",
    MY_ADS: "KOE | My Ads",
    BOOKMARKS: "KOE | Bookmarks",
    EDIT_PROFILE: "KOE | Edit Profile",
    SET_PASSWORD: "KOE | Set Password",
    FORGOT_PASSWORD: "KOE | Forgot Password",
    SET_FORGOT_PASSWORD: "KOE | Forgot Password",
  },
  RESPONSE_STATUS: {
    HTTP_201_CREATED: 201,
    HTTP_200_OK: 200,
    HTTP_400_BAD_REQUEST: 400,
    HTTP_404_NOT_FOUND: 404,
    HTTP_204_NO_CONTENT: 204,
    HTTP_500_INTERNAL_SERVER_ERROR: 500,
    HTTP_401_UNAUTHORIZED: 401,
  },
  LOCAL_STORAGE_KEYS: {
    AUTH_TOKEN: "auth-token",
  },
};

export default sharedCommonConstants;
