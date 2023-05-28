import commonConstants from "../constants/CommonConstants";

const getAuthToken = () => {
  return localStorage.getItem(commonConstants.LOCAL_STORAGE_KEYS.AUTH_TOKEN);
};

const setAuthToken = (authToken) => {
  localStorage.setItem(
    commonConstants.LOCAL_STORAGE_KEYS.AUTH_TOKEN,
    authToken
  );
};

const removeAuthToken = () => {
  localStorage.removeItem(commonConstants.LOCAL_STORAGE_KEYS.AUTH_TOKEN);
};

const replaceRouteParams = (url, params) => {
  let newUrl = url;
  Object.keys(params).forEach((param) => {
    newUrl = newUrl.replace(`:${param}`, params[param]);
  });
  return newUrl;
};

const getAuthHeadersOrEmptyObject = () => {
  const authToken = getAuthToken();
  return authToken
    ? {
        Authorization: `Token ${authToken}`,
      }
    : {};
};

const commonUtils = {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  replaceRouteParams,
  getAuthHeadersOrEmptyObject,
};

export default commonUtils;
