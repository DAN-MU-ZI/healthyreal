import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

const axiosApi = (options?: AxiosRequestConfig): AxiosInstance => {
  const token = localStorage.getItem("token");
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { Authorization: "Bearer " + token },
    ...options,
  });
  return instance;
};

export const defaultInstance = axiosApi();
