import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

const BASE_URL =
  "http://default-loadbalancer-ser-e983d-25608891-dc411cb92a75.kr.lb.naverncp.com:8080";

const axiosApi = (url: string, options?: AxiosRequestConfig): AxiosInstance => {
  const token = localStorage.getItem("token");
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: "Bearer " + token },
    ...options,
  });
  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
