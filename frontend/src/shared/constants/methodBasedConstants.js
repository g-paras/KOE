import apiUrls from "./apiUrls";

const methodBasedConstants = {
  LOGIN: {
    method: "POST",
    apiUrl: apiUrls.LOGIN,
  },
  CREATE_PRODUCT: {
    method: "POST",
    apiUrl: apiUrls.CREATE_PRODUCT,
  }
};

export default methodBasedConstants;
