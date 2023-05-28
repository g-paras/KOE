const stateUrls = {
  HOME: "/",
  /**
   * Accounts related routes
   */
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  SET_FORGOT_PASSWORD: "/forgot-password/:token",
  EMAIL_VERIFICATION: "/email-verification/:token",
  RESEND_EMAIL_VERIFICATION: "/resend-email-verification",
  /**
   * Products related routes
   */
  PRODUCT_LIST_PAGE: "/",
  CREATE_PRODUCT: "/item/create",
  PRODUCT_DETAIL_PAGE: "/item/:slug",
  EDIT_PRODUCT: "/item/:slug/edit",
  PRODUCT_SEARCH_PAGE: "/search",
  BOOKMARKS: "/bookmarks",
  MY_ADS: "/my-ads",
  /**
   * Users related routes
   */
  MY_PROFILE: "/profile",
  SETTINGS: "/settings",
  // USER_PROFILE: "/user/:username",
  /**
   * Not Found or any other route
   */
  NOT_FOUND: "/not-found",
  REST: "*",
};

export default stateUrls;
