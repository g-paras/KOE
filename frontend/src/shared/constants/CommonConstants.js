const sharedCommonConstants = {
  KIET_EMAIL_DOMAIN: "@kiet.edu",
  PAGE_TITLES: {
    LOGIN: "Login",
    REGISTER: "Register",
    HOME: "Home",
    PRODUCT_DETAIL: "Detail Page",
    CREATE_PRODUCT: "Post Ad",
    PAGE_NOT_FOUND: "Page not found",
    EDIT_PRODUCT: "Edit Ad",
  },
  RESPONSE_STATUS: {
    HTTP_201_CREATED: 201,
    HTTP_200_OK: 200,
    HTTP_400_BAD_REQUEST: 400,
    HTTP_404_NOT_FOUND: 404,
    HTTP_204_NO_CONTENT: 204,
  },
  LOCAL_STORAGE_KEYS: {
    AUTH_TOKEN: "auth-token",
  },
};

export default sharedCommonConstants;
