const apiUrls = {
  LOGIN: "/accounts/login/",
  REGISTER: "/accounts/register/",
  EMAIL_VERIFICATION: "/accounts/email-verification/",
  RESEND_VERIFICATION_EMAIL: "/accounts/resend-verification-email/",
  CREATE_PRODUCT: "/products/",
  BASE_API: "/accounts/base/",
  GET_PRODUCTS: "/products/",
  GET_PRODUCT: "/products/:slug/",
  DELETE_PRODUCT: "/products/:slug",
  MARK_SOLD: "/products/:slug/mark-sold/",
  EDIT_PRODUCT: "/products/:slug/",
  ADD_REMOVE_BOOKMARK: "/products/:slug/add-remove-bookmark/",
  GET_OFFERS: "/products/:slug/offers/",
  MAKE_OFFER: "/products/:slug/make-offer/",
  ACCEPT_REJECT_OFFER: "/products/:slug/offers/:offerId/accept-reject/",
  MY_ADS: "/products/my-ads/",
  BOOKMARKS: "/products/bookmarks/",
  EDIT_PROFILE: "/accounts/profile/",
};

export default apiUrls;
