import axios from "axios";


const useAxios = (token) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
  });

  if (token) {
    instance.defaults.headers.common["Authorization"] = "Token " + token;
  }

  return instance;
};

export default useAxios;
