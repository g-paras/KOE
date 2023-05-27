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
};

export default methodBasedConstants;
