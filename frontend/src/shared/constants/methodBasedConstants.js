import apiUrls from "./apiUrls";

const methodBasedConstants = {
  LOGIN: {
    method: "POST",
    apiUrl: apiUrls.LOGIN,
  },
  REGISTER: {
    method: "POST",
    apiUrl: apiUrls.REGISTER,
  },
  EMAIL_VERIFICATION: {
    method: "POST",
    apiUrl: apiUrls.EMAIL_VERIFICATION,
  },
  RESEND_VERIFICATION_EMAIL: {
    method: "POST",
    apiUrl: apiUrls.RESEND_VERIFICATION_EMAIL,
  },
  EDIT_PROFILE: {
    method: "POST",
    apiUrl: apiUrls.EDIT_PROFILE,
  },
  CREATE_PRODUCT: {
    method: "POST",
    apiUrl: apiUrls.CREATE_PRODUCT,
  },
  BASE_API: {
    method: "GET",
    apiUrl: apiUrls.BASE_API,
  },
  PRODUCTS_LIST: {
    method: "GET",
    apiUrl: apiUrls.GET_PRODUCTS,
  },
  GET_PRODUCT: {
    method: "GET",
    apiUrl: apiUrls.GET_PRODUCT,
  },
  DELETE_PRODUCT: {
    method: "DELETE",
    apiUrl: apiUrls.DELETE_PRODUCT,
  },
  MARK_SOLD: {
    method: "POST",
    apiUrl: apiUrls.MARK_SOLD,
  },
  EDIT_PRODUCT: {
    method: "PATCH",
    apiUrl: apiUrls.EDIT_PRODUCT,
  },
  ADD_REMOVE_BOOKMARK: {
    method: "POST",
    apiUrl: apiUrls.ADD_REMOVE_BOOKMARK,
  },
  GET_OFFERS: {
    method: "GET",
    apiUrl: apiUrls.GET_OFFERS,
  },
  MAKE_OFFER: {
    method: "POST",
    apiUrl: apiUrls.MAKE_OFFER,
  },
  ACCEPT_REJECT_OFFER: {
    method: "POST",
    apiUrl: apiUrls.ACCEPT_REJECT_OFFER,
  },
  MY_ADS: {
    method: "GET",
    apiUrl: apiUrls.MY_ADS,
  },
  BOOKMARKS: {
    method: "GET",
    apiUrl: apiUrls.BOOKMARKS,
  },
};

export default methodBasedConstants;
