import axios from "axios";

const BASE_URL = "https://824ed3db-aed5-41ab-809d-f74a20799b36.mock.pstmn.io";

// 인증값 필요 없는 경우
const axiosApi = (url, options) => {
  const instance = axios.create({
    baseURL: url,
    ...options,
  });
  return instance;
};

// 인증값이 필요한 경우
const axiosAuthApi = (url, options) => {
  const token = localStorage.getItem("token");
  const instance = axios.create({
    baseURL: url,
    headers: {Authorization: "Bearer" + token},
    ...options,
  });
  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
