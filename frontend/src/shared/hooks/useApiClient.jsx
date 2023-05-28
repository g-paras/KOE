import { useState, useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import methodBasedConstants from "../constants/methodBasedConstants";
import commonUtils from "../utils/commonUtils";
import { useNavigate } from "react-router-dom";
import commonConstants from "../constants/CommonConstants";
import stateUrls from "../constants/StateUrls";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

const useApiClient = (props) => {
  const {
    isOpenUrl = false,
    requestFor = "",
    showToast = false,
    logoutOnUnautorized = true,
  } = props;

  /**
   * state and hooks
   */
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [status, setStatus] = useState(undefined);

  const navigate = useNavigate();

  /**
   * default headers for authenticated requests
   */
  const defaultHeaders = useMemo(() => {
    const authorization = commonUtils.getAuthToken();
    return isOpenUrl ? {} : { Authorization: `Token ${authorization}` };
  }, [isOpenUrl]);

  const action = useCallback(
    (props = {}) => {
      const {
        payload = {},
        headers = {},
        routeParams = {},
        queryParams = {},
      } = props;
      setLoading(true);
      setStatus(null);
      setData(undefined);
      setError(undefined);
      return instance
        .request({
          method: methodBasedConstants[requestFor].method,
          url: commonUtils.replaceRouteParams(
            methodBasedConstants[requestFor].apiUrl,
            routeParams
          ),
          data: payload,
          headers: { ...defaultHeaders, ...headers },
          params: queryParams,
        })
        .then((res) => {
          setLoading(false);
          setStatus(res.status);
          setData(res.data);
          return res;
        })
        .catch((err) => {
          setLoading(false);
          setError(err?.response?.data);
          if (showToast) {
            if (
              err?.response?.status ===
              commonConstants.RESPONSE_STATUS.HTTP_404_NOT_FOUND
            ) {
              navigate(stateUrls.NOT_FOUND);
            } else if (
              err?.response?.status ===
              commonConstants.RESPONSE_STATUS.HTTP_500_INTERNAL_SERVER_ERROR
            ) {
              toast.error("Something went wrong");
            } else if (
              err?.response?.status ===
              commonConstants.RESPONSE_STATUS.HTTP_400_BAD_REQUEST
            ) {
              toast.error("Please fill the correct details");
            }
          }
          // if 401 is returned from backend, then logout user & redirect to login
          if (
            err?.response?.status ===
              commonConstants.RESPONSE_STATUS.HTTP_401_UNAUTHORIZED &&
            logoutOnUnautorized
          ) {
            commonUtils.removeAuthToken();
            navigate(stateUrls.LOGIN);
            window.location.reload();
          }
          return err.response;
        });
    },
    [defaultHeaders, requestFor]
  );

  return {
    loading,
    data,
    error,
    status,
    action,
  };
};

export default useApiClient;
