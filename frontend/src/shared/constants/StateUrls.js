const stateUrls = {
  HOME: "/",
  /**
   * Accounts related routes
   */
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  EMAIL_VERIFICATION: "/email-verification/:token",
  RESEND_EMAIL_VERIFICATION: "/resend-email-verification",
  /**
   * Products related routes
   */
  PRODUCT_LIST_PAGE: "/",
  CREATE_PRODUCT: "/item/create",
  PRODUCT_DETAIL_PAGE: "/item/:slug",
  EDIT_PRODUCT: "/item/:slug/edit",
  PRODUCT_SEARCH_PAGE: '/search',
  BOOKMARKS: "/bookmarks",
  MY_ADS: "/my-ads",
  // MY_ACTIVITY: "/activity",
  /**
   * Users related routes
   */
  MY_PROFILE: "/profile",
  // MY_ACCOUNT: "/settings",
  // USER_PROFILE: "/user/:username",
  /**
   * Not Found or any other route
   */
  NOT_FOUND: "/not-found",
  REST: "*",
};

export default stateUrls;
