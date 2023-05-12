const stateUrls = {
    /**
     * Accounts related routes
     */
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    EMAIL_VERIFICATION: '/email-verification',
    /**
     * Products related routes
     */
    PRODUCT_LIST_PAGE: '/',
    PRODUCT_DETAIL_PAGE: '/item/:productId',
    CREATE_PRODUCT: '/item/create',
    // PRODUCT_SEARCH_PAGE: '/search',
    PRODUCT_OFFER_LIST_PAGE: '/item/:productId/offers',
    MY_BOOKMARKS: '/bookmarks',
    MY_PRODUCTS: '/my-items',
    MY_ACTIVITY: '/activity',
    /**
     * Users related routes
     */
    MY_ACCOUNT: '/settings',
    MY_PROFILE: '/profile',
    USER_PROFILE: '/user/:username',
    /**
     * Not Found or any other route
     */
    NOT_FOUND: '/not-found',
    REST: '*',
};

export default stateUrls;
