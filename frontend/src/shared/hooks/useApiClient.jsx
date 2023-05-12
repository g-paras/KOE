import { useState, useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import methodBasedConstants from "../constants/methodBasedConstants";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

const useApiClient = (props) => {
  const { isOpenUrl, requestFor } = props;

  /**
   * state and hooks
   */
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [status, setStatus] = useState(undefined);

  /**
   * default headers for authenticated requests
   */
  const defaultHeaders = useMemo(() => {
    const authorization = localStorage.getItem("auth_token");
    return {
      Authorization: isOpenUrl ? undefined : `Token ${authorization}`,
    };
  }, [isOpenUrl]);

  const action = useCallback(
    ({ payload }) => {
      setLoading(true);
      return instance
        .request({
          method: methodBasedConstants[requestFor].method,
          url: methodBasedConstants[requestFor].apiUrl,
          data: payload,
          headers: defaultHeaders,
        })
        .then((res) => {
          setLoading(false);
          setStatus(res.status);
          setData(res.data);
        })
        .catch((err) => {
          toast.error('Something went wrong')
          setLoading(false);
          setError(err);
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
