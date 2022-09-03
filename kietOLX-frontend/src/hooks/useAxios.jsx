import axios from "axios";

import { BASE_URL } from "../utils/constants";

const useAxios = ({ token }) => {
  const instance = axios.create({
    baseURL: BASE_URL,
  });

  if (token) {
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  return instance;
};

export default useAxios;
